import { message, Modal, Select, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { toast } from 'react-toastify'

import { categoryAPI } from '~/api/categoryAPI'
import { supplierAPI } from '~/api/supplierAPI'
import InputModalBook from './InputModalBook/InputModalBook'
import bookAPI from '~/api/bookAPI'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
function ModalBook({ isModalBook, setIsModalBook, fetchAllBook }) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [listCate, setListCate] = useState([])
  const [listSuppier, setListSuppier] = useState([])

  const dataBookDefault = {
    name: '',
    price: '',
    discount: '' || null,
    stock: '',
    author: '',
    pageNumber: '',
    publishingYear: '',
    image: '',
    supplierId: '',
    categoryId: ''
  }
  const [dataBook, setDataBook] = useState(dataBookDefault)

  const validInputDefault = {
    image: true,
    name: true,
    author: true,
    price: true,
    stock: true,
    pageNumber: true,
    publishingYear: true,
    supplierId: true,
    categoryId: true
  }
  const [validInput, setValidInput] = useState(validInputDefault)

  const handleUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'book_store_web')

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/datdev/image/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      setImageUrl(data.secure_url)
      setDataBook({ ...dataBook, image: data.secure_url })
    } catch (error) {
      toast.error('Upload failed')
    }
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    getBase64(info.file.originFileObj, async (base64Image) => {
      setLoading(false)
      await handleUpload(base64Image)
    })
  }

  const handleChangeInput = (name, value) => {
    const _dataBook = _.cloneDeep(dataBook)
    _dataBook[name] = value
    setDataBook(_dataBook)
  }

  const checkValidInput = () => {
    let arr = ['image', 'name', 'author', 'price', 'stock', 'pageNumber', 'publishingYear', 'categoryId', 'supplierId']
    let check = true
    for (let i = 0; i < arr.length; i++) {
      if (!dataBook[arr[i]]) {
        let _validInput = _.cloneDeep(validInputDefault)
        _validInput[arr[i]] = false
        setValidInput(_validInput)
        toast.error(`${arr[i]} not to be empty!!!`)
        check = false
        break
      }
    }
    return check
  }

  const handleOk = async () => {
    try {
      if (checkValidInput()) {
        const res = await bookAPI.createBook(dataBook)
        if (res) {
          setDataBook(dataBookDefault)
          setIsModalBook(false)
          fetchAllBook()
          toast.success('Book has successfully created')
        }
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleCancel = () => {
    setIsModalBook(false)
  }

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
        Upload
      </div>
    </button>
  )

  const fetchAllCateAndSup = async () => {
    try {
      const resCate = await categoryAPI.getAllCategories()
      const resSup = await supplierAPI.getAllSupplier()
      setListCate(resCate)
      setListSuppier(resSup)
    } catch (error) {
      toast(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchAllCateAndSup()
  }, [])

  return (
    <>
      <Modal title='Create New Book' open={isModalBook} width={800} onOk={handleOk} onCancel={handleCancel}>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Upload
              name='avatar'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
              beforeUpload={beforeUpload}
              onChange={handleChange}
              status='error'
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt='avatar'
                  style={{
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <InputModalBook labelName='Name' name='name' validInput={validInput.name} isRequireInput handleChangeInput={handleChangeInput} />
          <InputModalBook labelName='Author' name='author' validInput={validInput.author} isRequireInput handleChangeInput={handleChangeInput} />
          <InputModalBook labelName='Price' name='price' validInput={validInput.price} isRequireInput handleChangeInput={handleChangeInput} />
          <InputModalBook labelName='Stock' name='stock' validInput={validInput.stock} isRequireInput handleChangeInput={handleChangeInput} />
          <InputModalBook labelName='Page Number' name='pageNumber' validInput={validInput.pageNumber} isRequireInput handleChangeInput={handleChangeInput} />
          <InputModalBook labelName='Publishing Year' name='publishingYear' validInput={validInput.publishingYear} isRequireInput handleChangeInput={handleChangeInput} />
          <InputModalBook labelName='Discount' validInput name='discount' handleChangeInput={handleChangeInput} />
          <Select
            placeholder='Please select Category'
            // value={dataUser.groupId || undefined}
            status={validInput.categoryId ? '' : 'error'}
            onChange={(value) => {
              handleChangeInput('categoryId', value)
            }}
            options={listCate.map((item) => {
              return {
                value: item.id,
                label: item.name
              }
            })}
            className='mt-2'
          />
          <Select
            placeholder='Please select Supplier'
            // value={dataUser.groupId || undefined}
            status={validInput.supplierId ? '' : 'error'}
            onChange={(value) => {
              handleChangeInput('supplierId', value)
            }}
            options={listSuppier.map((item) => {
              return {
                value: item.id,
                label: item.name
              }
            })}
            className='mt-2'
          />
        </div>
      </Modal>
    </>
  )
}

export default ModalBook
