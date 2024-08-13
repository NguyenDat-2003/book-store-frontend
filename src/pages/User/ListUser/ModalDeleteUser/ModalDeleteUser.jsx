import { Modal } from 'antd'

function ModalDeleteUser({ isModalOpen, handleOk, handleCancel, dataUser }) {
  return (
    <>
      <Modal title='Confirm Delete User' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>
          Are you sure you want to delete this user : <span className='font-medium'>{dataUser.email}</span>
        </p>
      </Modal>
    </>
  )
}

export default ModalDeleteUser
