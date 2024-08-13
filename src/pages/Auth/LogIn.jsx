import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Spin } from 'antd'
import { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authAPI from '~/api/authAPI'
import { AuthContext } from '~/context/AuthContext'

function LogIn() {
  const { updateUser } = useContext(AuthContext)

  const [isLoading, setisLoading] = useState(false)

  const navigate = useNavigate()

  const onFinish = async (data) => {
    setisLoading(true)

    try {
      const res = await authAPI.logIn(data)
      updateUser(res)
      toast.success('Đăng nhập thành công !')
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setisLoading(false)
    }
  }
  return (
    <>
      <div className='flex justify-center items-center py-22'>
        <div className='w-80'>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <p className='text-3xl text-center py-6'>Đăng Nhập</p>
            <Form.Item
              className='mb-8'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!'
                }
              ]}
            >
              <Input prefix={<UserOutlined className='site-form-item-icon py-2' />} placeholder='Username' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!'
                }
              ]}
            >
              <Input prefix={<LockOutlined className='site-form-item-icon py-2' />} type='password' placeholder='Password' />
            </Form.Item>
            <Form.Item>
              <div className='flex justify-between items-center'>
                <NavLink to='/register'>Đăng ký ngay !</NavLink>
                <a href='' className='text-rose-500 hover:text-rose-500'>
                  Quên mật khẩu?
                </a>
              </div>
            </Form.Item>

            <Form.Item className='text-center'>
              {isLoading ? (
                <Button disabled className='login-form-button px-6 bg-red-600 text-white'>
                  <Spin size='small' />
                  Đăng nhập
                </Button>
              ) : (
                <Button type='danger' htmlType='submit' className='login-form-button px-6 bg-red-600 text-white'>
                  Đăng nhập
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default LogIn
