import { useContext, useEffect, useState } from 'react'
import { faDollar, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContainerOutlined, BellOutlined, UserOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { Menu } from 'antd'
import { toast } from 'react-toastify'

import { formatPriceVND } from '~/utils/formatPriceVND'
import cartAPI from '~/api/cartAPI'
import { AuthContext } from '~/context/AuthContext'
// import { useNavigate } from 'react-router-dom'

function Order() {
  const items = [
    {
      key: 'sub1',
      label: 'Tài khoản của tôi',
      icon: <UserOutlined />,
      children: [
        {
          key: '4',
          label: 'Hồ sơ'
        },
        {
          key: '2',
          label: 'Ngân hàng'
        },
        {
          key: '3',
          label: 'Đổi mật khẩu'
        }
      ]
    },
    {
      key: '1',
      icon: <ContainerOutlined />,
      label: 'Đơn hàng'
    },

    {
      key: '5',
      icon: <BellOutlined />,
      label: 'Thông báo'
    }
  ]
  // const navigate = useNavigate()

  const { currentUser } = useContext(AuthContext)

  const [listOrder, setListOrder] = useState([])

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
      <div className='grid grid-cols-5 gap-4'>
        <div>
          <div className='bg-white rounded-lg'>
            <p className='font-medium py-2 text-center'>
              {currentUser.firstName} {currentUser.lastName}
            </p>
            <div>
              <Menu
                // onClick={(item) => {
                //   navigate(item.key)
                // }}
                defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                mode='inline'
                items={items}
              />
            </div>
          </div>
        </div>
        <div className='col-span-4 flex flex-col'>
          {listOrder &&
            listOrder.map((item) => {
              return (
                <>
                  <div className='bg-white rounded-lg p-4 mb-4'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm'>
                        Ngày đặt hàng: <span className='font-medium'>{format(item.createdAt, 'dd-MM-yyyy HH:mm:ss')}</span>
                      </span>

                      <div>
                        <span className='text-emerald-600 mb-1 pr-2 text-sm border-r-2'>
                          <FontAwesomeIcon icon={faTruck} className='mr-2' />
                          Đặt hàng thành công
                        </span>
                        <span className='text-red-600 ml-2'>HOÀN THÀNH</span>
                      </div>
                    </div>
                    {item.Books &&
                      item.Books.map((element) => {
                        const priceAfterDiscount = (element.price * (100 - element.discount)) / 100
                        return (
                          <>
                            <div className='mt-4 border-t border-gray-200'>
                              <div className='flex py-2 items-center'>
                                <img src={element.image} alt='' className='h-20 mr-4' />
                                <a href='' className='basis-2/3 text-lg text-gray-600'>
                                  {element.name}
                                </a>
                                <span className='basis-1/5'>x{element.Book_Order.quantity}</span>
                                <div>
                                  <span className='line-through text-gray-500 mr-2 text-sm'>{formatPriceVND(element.price)}</span>
                                  <span className='font-medium text-red-600'>{formatPriceVND(priceAfterDiscount)}</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      })}

                    <div className='mt-4 border-t border-gray-200'>
                      <div className='flex justify-end items-center mt-4'>
                        <span className='text-gray-500 pr-2'>
                          <FontAwesomeIcon icon={faDollar} className='mr-2 text-red-600 text-xl' />
                          Thành tiền:
                        </span>
                        <span className='text-red-600 ml-2 text-2xl font-medium'>{formatPriceVND(item.totalOrderPrice)}</span>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default Order
