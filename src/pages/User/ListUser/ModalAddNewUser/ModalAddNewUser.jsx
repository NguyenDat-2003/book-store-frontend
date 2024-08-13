import { useEffect, useState } from 'react'
import { Input, Modal, Select } from 'antd'
import groupAPI from '~/api/groupAPI'

const ModalAddNewUser = ({ isModalAddNew }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [listGroup, setListGroup] = useState([])

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        const res = await groupAPI.gettAllGroups()
        setListGroup(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllGroups()
  }, [])

  return (
    <>
      <Modal title='Create New user' open={true} width={800}>
        <div className='grid grid-cols-2 gap-4'>
          <Input placeholder='First Name' />
          <Input placeholder='Last Name' />
          <Input placeholder='Email' />
          <Input placeholder='Phone' />
          <Input placeholder='Password' />
          <Select
            defaultValue='Nam'
            onChange={handleChange}
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
            defaultValue='1'
            onChange={handleChange}
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
