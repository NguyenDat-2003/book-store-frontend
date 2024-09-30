import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import cartAPI from '~/api/cartAPI'
import { AuthContext } from '~/context/AuthContext'
import { ConfigProvider, Tabs } from 'antd'
import ListOrder from './ListOrder/ListOrder'

function Order() {
  const { currentUser } = useContext(AuthContext)
  const [listOrder, setListOrder] = useState([])

  const items = [
    {
      key: '1',
      label: 'Tất cả',
      children: <ListOrder listOrder={listOrder} />
    },
    {
      key: '2',
      label: 'Chờ xác nhận',
      children: 'Content of Tab Pane 2'
    },
    {
      key: '3',
      label: 'Chờ lấy hàng',
      children: 'Content of Tab Pane 3'
    },
    {
      key: '4',
      label: 'Chờ giao hàng',
      children: 'Content of Tab Pane 3'
    },
    {
      key: '5',
      label: 'Đã giao',
      children: 'Content of Tab Pane 3'
    },
    {
      key: '6',
      label: 'Đã hủy',
      children: 'Content of Tab Pane 3'
    }
  ]
  const onChange = (key) => {
    console.log(key)
  }

  useEffect(() => {
    const fetchDataListOrder = async () => {
      try {
        const res = await cartAPI.getMyOrder(currentUser.id)
        setListOrder(res)
      } catch (error) {
        toast(error.response?.data?.message)
      }
    }
    fetchDataListOrder()
  }, [])

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              colorPrimary: '#d22826',
              algorithm: true
            }
          }
        }}
      >
        <div className='bg-white px-4 mb-4 rounded-lg'>
          <Tabs defaultActiveKey='1' size='large' items={items} onChange={onChange} />
        </div>
      </ConfigProvider>
    </>
  )
}

export default Order
