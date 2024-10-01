import { Button, Dropdown, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

import userAPI from '~/api/userAPI'
import { formatPriceVND } from '~/utils/formatPriceVND'

function Order() {
  const items = [
    {
      key: '1',
      label: (
        <>
          <span onClick={() => updateStatusOrder(2, myOrderId)} className='text-blue-600'>
            Xác nhận đơn hàng
          </span>
        </>
      )
    },
    {
      key: '3',
      label: (
        <>
          <span onClick={() => updateStatusOrder(3, myOrderId)} className='text-yellow-500'>
            Xác nhận giao hàng
          </span>
        </>
      )
    },
    {
      key: '5',
      label: (
        <>
          <span onClick={() => updateStatusOrder(5, myOrderId)} className='text-rose-600'>
            Hủy đơn hàng
          </span>
        </>
      )
    }
  ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Full name',
      dataIndex: 'fullName'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Address',
      dataIndex: 'address'
    },
    {
      title: 'Total price',
      dataIndex: 'totalOrderPrice',
      render: (value) => {
        return <b>{formatPriceVND(value)}</b>
      }
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      render: (value) => {
        return <span>{format(value, 'dd-MM-yyyy HH:mm:ss')}</span>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => {
        switch (value) {
          case 1:
            return (
              <>
                <Tag color='processing' className='text-sm'>
                  Chờ xác nhận
                </Tag>
              </>
            )
          case 2:
            return (
              <>
                <Tag color='warning' className='text-sm'>
                  Chờ lấy hàng
                </Tag>
              </>
            )
          case 3:
            return (
              <>
                <Tag color='warning' className='text-sm'>
                  Chờ giao hàng
                </Tag>
              </>
            )
          case 4:
            return (
              <>
                <Tag color='green' className='text-sm'>
                  Hoàn thành
                </Tag>
              </>
            )
          case 5:
            return (
              <>
                <Tag color='red' className='text-sm'>
                  Đã huỷ
                </Tag>
              </>
            )
        }
      }
    },
    {
      title: 'Action',
      render: (data) => {
        return (
          <>
            <Button type='primary' className='mr-2 !bg-cyan-500'>
              Xem chi tiết
            </Button>
            <Dropdown
              menu={{
                items
              }}
              placement='bottomRight'
              trigger={['click']}
            >
              <Button disabled={data.status == 4 && 'true'} onClick={() => setMyOrderId(data.id)}>
                Cập nhật trạng thái
              </Button>
            </Dropdown>
          </>
        )
      }
    }
  ]

  const [dataSource, setDataSource] = useState([])
  const [myOrderId, setMyOrderId] = useState('')

  const updateStatusOrder = async (status, orderId) => {
    try {
      await userAPI.updateStatusOrder({ status, id: orderId })
      fetchAllOrders()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const fetchAllOrders = async () => {
    try {
      const res = await userAPI.getAllOrders()
      setDataSource(res)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
    </>
  )
}

export default Order
