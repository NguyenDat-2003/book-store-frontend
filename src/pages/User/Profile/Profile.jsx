import { Button, Input, Radio, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { toast } from 'react-toastify'

function Profile() {
  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      toast.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      toast.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [valueRadio, setValueRadio] = useState('Nam')

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none'
      }}
      type='button'
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Avatar
      </div>
    </button>
  )
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false)
      setImageUrl(url)
    })
  }

  return (
    <>
      <div className='bg-white rounded-lg p-6 mb-4'>
        <div className='pb-4 border-b px-4'>
          <p className='text-xl'>Hồ Sơ Của Tôi</p>
          <span className='text-sm text-gray-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
        </div>
        <div className='p-12 flex'>
          <div className='flex flex-col basis-1/2 mr-12'>
            <div className='flex mb-4'>
              <span className='basis-2/5 text-gray-600'>Họ:</span>
              <Input />
            </div>
            <div className='flex mb-4'>
              <span className='basis-2/5 text-gray-600'>Tên:</span>
              <Input />
            </div>
            <div className='flex mb-4'>
              <span className='basis-2/5 text-gray-600'>Email:</span>
              <Input />
            </div>
            <div className='flex mb-4'>
              <span className='basis-2/5 text-gray-600'>Số điện thoại:</span>
              <Input />
            </div>
            <div className='flex'>
              <span className='basis-2/5 text-gray-600'>Giới tính:</span>
              <div>
                <Radio.Group
                  value={valueRadio}
                  onChange={(e) => {
                    setValueRadio(e.target.value)
                  }}
                >
                  <Radio value='Nam'>Nam</Radio>
                  <Radio value='Nữ'>Nữ</Radio>
                  <Radio value='Khác'>Khác</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className='flex-1'>
            <div className='text-center'>
              <Upload
                name='avatar'
                listType='picture-circle'
                className='avatar-uploader'
                showUploadList={false}
                action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt='avatar'
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain',
                      borderRadius: '50px'
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
              <p className='text-sm text-gray-500 mt-4'>
                Dụng lượng ảnh tối đa 2 MB <br /> Định dạng:.JPEG, .PNG
              </p>
            </div>
          </div>
        </div>
        <p className='pl-24'>
          <Button danger type='primary' className='p-4 !bg-red-600'>
            LƯU
          </Button>
        </p>
      </div>
    </>
  )
}

export default Profile
