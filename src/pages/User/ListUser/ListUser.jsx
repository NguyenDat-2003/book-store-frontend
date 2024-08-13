import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import userAPI from '~/api/userAPI'
import ModalDeleteUser from './ModalDeleteUser/ModalDeleteUser'
import ModalAddNewUser from './ModalAddNewUser/ModalAddNewUser'

function ListUser() {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      render: (id) => <a>{id}</a>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (email) => <a>{email}</a>
    },
    {
      title: 'First Name',
      dataIndex: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName'
    },
    {
      title: 'Group',
      render: (gr) => <a>{gr.Group.name}</a>
    },

    {
      title: 'Actions',
      render: (data) => {
        return (
          <>
            <FontAwesomeIcon icon={faPenToSquare} className='mr-4 text-lg text-yellow-400 cursor-pointer' />
            <FontAwesomeIcon icon={faTrash} className='text-lg text-red-500 cursor-pointer' onClick={() => handleDeleteUser(data)} />
          </>
        )
      }
    }
  ]

  const fetchAllUsers = async () => {
    try {
      const res = await userAPI.getAllUsers()
      setDataSource(res)
    } catch (error) {
      console.log(error)
    }
  }

  const [dataSource, setDataSource] = useState([])
  const [dataUser, setDataUser] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalAddNew, setIsModalAddNew] = useState(false)

  const handleDeleteUser = (user) => {
    setIsModalOpen(true)
    setDataUser(user)
  }
  const handleOk = async () => {
    const res = await userAPI.deleteUser(dataUser.id)
    if (res) {
      fetchAllUsers()
      setIsModalOpen(false)
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <>
      <Button className='mb-2' type='primary'>
        Create New User
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={{
          pageSize: 3
        }}
      />
      <ModalDeleteUser isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} dataUser={dataUser} />
      <ModalAddNewUser />
    </>
  )
}

export default ListUser
