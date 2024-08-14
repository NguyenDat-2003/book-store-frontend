import { useEffect, useState } from 'react'
import { Input, Modal, Select } from 'antd'
import groupAPI from '~/api/groupAPI'
import _ from 'lodash'
import { toast } from 'react-toastify'
import InputModalUser from './InputModalUser/InputModalUser'
import userAPI from '~/api/userAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'

const ModalAddNewUser = ({ isModalAddNew, setIsModalAddNew, fetchAllUsers }) => {
  const [listGroup, setListGroup] = useState([])

  const dataUserDefault = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    sex: '',
    groupId: ''
  }
  const [dataUser, setDataUser] = useState(dataUserDefault)

  const validInputDefault = {
    firstName: true,
    lastName: true,
    phone: true,
    email: true,
    password: true,
    sex: true,
    groupId: true
  }
  const [validInput, setValidInput] = useState(validInputDefault)

  const handleOk = async () => {
    if (checkValidateInput()) {
      const res = await userAPI.createUser(dataUser)
      if (res) {
        setIsModalAddNew(false)

        setDataUser({
          ...dataUserDefault,
          sex: 'Nam',
          groupId: listGroup.length > 0 ? listGroup[0].id : ''
        })

        fetchAllUsers()
        toast.success('Create User Successfully')
      }
    }
  }
  const handleCancel = () => {
    setIsModalAddNew(false)
  }

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(dataUser)
    _userData[name] = value
    setDataUser(_userData)
  }

  const checkValidateInput = () => {
    let check = true
    let arr = ['firstName', 'lastName', 'email', 'phone', 'password']
    for (let i = 0; i < arr.length; i++) {
      if (!dataUser[arr[i]]) {
        let _validInput = _.cloneDeep(validInputDefault)
        _validInput[arr[i]] = false
        setValidInput(_validInput)
        toast.error(`Empty input ${arr[i]}`)
        check = false
        break
      }
    }
    return check
  }

  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        const res = await groupAPI.gettAllGroups()
        if (res && res.length > 0) {
          setListGroup(res)
          setDataUser({ ...dataUser, sex: 'Nam', groupId: res[0].id })
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllGroups()
  }, [])

  return (
    <>
      <Modal title='Create New user' open={isModalAddNew} width={800} onOk={handleOk} onCancel={handleCancel}>
        <div className='grid grid-cols-2 gap-4'>
          <InputModalUser value={dataUser.firstName} validInput={validInput.firstName} placeholder='First Name' handleOnChangeInput={handleOnChangeInput} inputName='firstName' />
          <InputModalUser value={dataUser.lastName} validInput={validInput.lastName} placeholder='Last Name' handleOnChangeInput={handleOnChangeInput} inputName='lastName' />
          <InputModalUser value={dataUser.email} validInput={validInput.email} placeholder='Email' handleOnChangeInput={handleOnChangeInput} inputName='email' />
          <InputModalUser value={dataUser.phone} validInput={validInput.phone} placeholder='Phone' handleOnChangeInput={handleOnChangeInput} inputName='phone' />
          <Input.Password
            value={dataUser.password}
            status={validInput.password ? '' : 'error'}
            suffix={!validInput.password && <FontAwesomeIcon icon={faExclamation} />}
            placeholder='Password'
            onChange={(e) => handleOnChangeInput(e.target.value, 'password')}
          />

          <Select
            defaultValue='Nam'
            onChange={(value) => {
              handleOnChangeInput(value, 'sex')
            }}
            options={[
              {
                value: 'Nam',
                label: 'Nam'
              },
              {
                value: 'Nữ',
                label: 'Nữ'
              },
              {
                value: 'Khác',
                label: 'Khác'
              }
            ]}
          />
          <Select
            defaultValue='Customer'
            onChange={(value) => {
              handleOnChangeInput(value, 'groupId')
            }}
            options={listGroup.map((item) => {
              return {
                value: `${item.id}`,
                label: `${item.name}`
              }
            })}
          />
        </div>
      </Modal>
    </>
  )
}
export default ModalAddNewUser
