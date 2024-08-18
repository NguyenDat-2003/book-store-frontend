import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Image, Rate, Table } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import bookAPI from '~/api/bookAPI'
import { formatPriceVND } from '~/utils/formatPriceVND'
import ModalDeleteBook from './ModalDeleteBook/ModalDeleteBook'

function Book() {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'Thumbnail',
      dataIndex: 'image',
      render: (data) => {
        return <Image width={80} src={data} />
      }
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Category',
      render: (data) => {
        return <span>{data.Category.name}</span>
      }
    },
    {
      title: 'Supplier',
      render: (data) => {
        return <span>{data.Supplier.name}</span>
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      render: (value) => {
        return <b>{formatPriceVND(value)}</b>
      }
    },
    {
      title: 'Stock',
      dataIndex: 'stock'
    },
    {
      title: 'Page Number',
      dataIndex: 'pageNumber'
    },
    {
      title: 'Publish Year',
      dataIndex: 'publishingYear'
    },
    {
      title: 'Rating',
      dataIndex: 'ratingsAverage',
      render: (rating) => {
        return <Rate className='w-36 ' disabled value={rating} allowHalf />
      }
    },
    {
      title: 'Actions',
      render: (data) => {
        return (
          <div className='flex'>
            <FontAwesomeIcon icon={faPenToSquare} className='mr-4 text-lg text-yellow-400 cursor-pointer' />
            <FontAwesomeIcon icon={faTrash} className='text-lg text-red-500 cursor-pointer' onClick={() => handleDeleteBook(data)} />
          </div>
        )
      }
    }
  ]

  const [dataSource, setDataSource] = useState([])
  //------- Modal Delete Book
  const [dataBookDelete, setDataBookDelete] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDeleteBook = (data) => {
    setIsModalOpen(true)
    setDataBookDelete(data)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOk = async () => {
    try {
      await bookAPI.deleteBook(dataBookDelete.id)
      setIsModalOpen(false)
      fetchAllBook()
      toast.success('Successfully deleted book')
    } catch (error) {
      toast.err(error.response.data.message)
    }
  }

  const fetchAllBook = async () => {
    try {
      const res = await bookAPI.getAllBook()
      setDataSource(res)
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => {
    fetchAllBook()
  }, [])

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 10
        }}
      />
      <ModalDeleteBook isModalOpen={isModalOpen} dataBookDelete={dataBookDelete} handleCancel={handleCancel} handleOk={handleOk} />
    </>
  )
}

export default Book
