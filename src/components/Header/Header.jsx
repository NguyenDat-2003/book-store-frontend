import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import fahasa from '~/assets/fahasa-logo.webp'
import Notification from './DropDowns/Notification'
import Cart from './DropDowns/Cart'
import Profile from './DropDowns/Profile'
import { NavLink } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { AppstoreOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '~/context/AuthContext'
import cartAPI from '~/api/cartAPI'
import bookAPI from '~/api/bookAPI'

function Header() {
  const { currentUser } = useContext(AuthContext)
  const [listBooksRecommend, setListBooksRecommend] = useState([])

  const fetchDataRecommendBook = async () => {
    try {
      const resRecommend = await cartAPI.getRecommend(currentUser?.id)
      const newResRecommend = []
      await Promise.all(
        resRecommend.map(async (id) => {
          const book = await bookAPI.getBook(id)
          newResRecommend.push(book)
        })
      )
      setListBooksRecommend(newResRecommend)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataRecommendBook()
  }, [])

  return (
    <>
      <header className='flex flex-col text-white w-screen'>
        <div className='flex justify-center  bg-red-600'>
          <img src='https://cdn0.fahasa.com/media/wysiwyg/Thang-07-2024/NCCPlus_T07_Header_1263x60.jpg' alt='none' />
        </div>
        <div className='h-20 p-2 bg-white'>
          <div className='w-10/12 2xl:w-8/12 mx-auto flex justify-between items-center h-full '>
            <div className='w-56 mb-1'>
              <NavLink to='/'>
                <img src={fahasa} alt='none' />
              </NavLink>
            </div>

            <div className='flex-1 mx-6 w-full'>
              <div className='flex items-center relative'>
                <Tippy
                  placement='bottom-start'
                  interactive={true}
                  render={(attrs) => (
                    <div tabIndex='-1' style={{ width: '700px' }} className='bg-white p-6 rounded-md shadow-2xl text-gray-700' {...attrs}>
                      <p className='text-lg font-medium'>
                        <AppstoreOutlined className='mr-2' />
                        Fahasa gợi ý cho bạn
                      </p>
                      <div className='grid grid-cols-3'>
                        {listBooksRecommend?.length > 0 &&
                          listBooksRecommend.map((book) => {
                            return (
                              <>
                                <NavLink to={`/chi-tiet-sach/${book.slug}/${book.id}`}>
                                  <div className='flex items-center mt-4 hover:shadow-md rounded p-2'>
                                    <img src={book.image} alt='' className='h-20 w-16 mr-4' />
                                    <p className='text-sm line-clamp-2'>{book.name}</p>
                                  </div>
                                </NavLink>
                              </>
                            )
                          })}
                      </div>
                    </div>
                  )}
                >
                  <input
                    className='w-full h-11 rounded-lg pl-8 pr-20 pb-1 text-gray-800 border-solid border-2 border-gray-200 outline-none'
                    type='text'
                    placeholder='Tìm kiếm sách...'
                  />
                </Tippy>

                <button className=' w-20 h-8 bg-red-600 p-1 rounded-lg absolute right-1'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
            <div className='flex justify-center'>
              <Notification />
              <Cart />
              <Profile />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
