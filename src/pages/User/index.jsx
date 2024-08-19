import { BellOutlined, ContainerOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { AuthContext } from '~/context/AuthContext'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'

function User() {
  const items = [
    {
      key: 'sub1',
      label: 'Tài khoản của tôi',
      icon: <UserOutlined />,
      children: [
        {
          key: '/user/profile',
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
      key: 'user/order',
      icon: <ContainerOutlined />,
      label: 'Đơn hàng'
    },

    {
      key: '5',
      icon: <BellOutlined />,
      label: 'Thông báo'
    }
  ]

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className='bg-gray-100 '>
        <div className='w-10/12 2xl:w-8/12 container mx-auto p-4'>
          <div className='grid grid-cols-5 gap-4'>
            <div>
              <div className='bg-white rounded-lg'>
                <p className='font-medium py-2 text-center'>
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <div>
                  <Menu
                    onClick={(item) => {
                      navigate(item.key)
                    }}
                    defaultSelectedKeys={['1']}
                    mode='inline'
                    items={items}
                  />
                </div>
              </div>
            </div>
            <div className='col-span-4'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default User
