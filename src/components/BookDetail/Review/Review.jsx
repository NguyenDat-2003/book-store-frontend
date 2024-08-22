import { Button, Progress, Rate } from 'antd'
import { useContext } from 'react'
import { Input } from 'antd'
const { TextArea } = Input

import { AuthContext } from '~/context/AuthContext'
import { CommentOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

function Review() {
  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <div className='bg-white p-4 mt-4 rounded-l-lg'>
        <p className='text-lg font-medium rounded-t-lg'>
          <CommentOutlined className='mr-2' />
          Đánh giá sản phẩm
        </p>
        <div className='flex mt-4'>
          <div className='basis-1/2  mr-8'>
            <div className='flex'>
              <div className='w-1/4 flex flex-col items-center justify-evenly mr-4'>
                <p>
                  <span className='text-4xl font-medium'>3.5</span>/5
                </p>
                <Rate allowHalf defaultValue={3.5} disabled className='text-lg' />
                <p className='text-gray-500 text-sm'>(0 đánh giá)</p>
              </div>
              <div className='flex-1'>
                <div className='flex'>
                  <span className='w-12 mr-2'>5 sao</span>
                  <Progress percent={50} strokeColor='red' />
                </div>
                <div className='flex'>
                  <span className='w-12 mr-2'>4 sao</span>
                  <Progress percent={50} strokeColor='red' />
                </div>
                <div className='flex'>
                  <span className='w-12 mr-2'>3 sao</span>
                  <Progress percent={50} strokeColor='red' />
                </div>
                <div className='flex'>
                  <span className='w-12 mr-2'>2 sao</span>
                  <Progress percent={50} strokeColor='red' />
                </div>
                <div className='flex'>
                  <span className='w-12 mr-2'>1 sao</span>
                  <Progress percent={50} strokeColor='red' />
                </div>
              </div>
            </div>

            {currentUser ? (
              <>
                <div className='mt-4'>
                  <p className='mb-2'>
                    <span>Số sao:</span>
                    <Rate defaultValue={5} className='text-2xl' />
                  </p>
                  <TextArea
                    allowClear
                    placeholder='Nhận xét của bạn về sản phẩm'
                    autoSize={{
                      minRows: 3,
                      maxRows: 5
                    }}
                  />
                  <div className='mt-2 float-right'>
                    <Button danger type='primary' className='!bg-red-600 font-medium ml-2'>
                      Gửi nhận xét
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <p className='text-sm text-center mt-6'>
                Chỉ có thành viên mới có thể viết nhận xét. Vui lòng&nbsp;
                <NavLink className='text-blue-500 hover:text-red-600 font-medium' to='/login'>
                  đăng nhập&nbsp;
                </NavLink>
                hoặc&nbsp;
                <NavLink className='text-blue-500 hover:text-red-600 font-medium' to='/register'>
                  đăng ký.
                </NavLink>
              </p>
            )}
          </div>

          <div className='flex-1'>
            <div className='flex flex-col mb-4'>
              <div className='flex items-center mb-2'>
                <img src='/vector-4k.jpg' className='h-10 w-10 rounded-full object-cover mr-2' />
                <div className='flex flex-col text-xs text-gray-500'>
                  <span className='font-medium text-sm text-gray-700'>dat@gmail.com</span>
                  <Rate allowHalf defaultValue={3.5} disabled className='text-xs' />
                  <span>22/8/2024</span>
                </div>
              </div>
              <div className='bg-gray-100 p-2 rounded-lg'>
                <span>Phản Hồi Của Người Bán</span> <br />
                <p className='text-gray-500 mt-2'>
                  comment asdhjasldhjaslhjdlsahjdklashdk asdhjasldhjaslhjdlsahjdklashdk asdhjasldhjaslhjdlsahjdklashdkasdhjasldhjaslhjdlsahjdklashdk
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Review
