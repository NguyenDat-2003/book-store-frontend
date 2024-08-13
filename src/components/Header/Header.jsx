import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import fahasa from '~/assets/fahasa-logo.webp'
import Notification from './DropDowns/Notification'
import Cart from './DropDowns/Cart'
import Profile from './DropDowns/Profile'
import { NavLink } from 'react-router-dom'

function Header() {
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
            <div className='flex-1 mx-6 w-full relative flex items-center'>
              <input
                className='w-full h-11 rounded-lg pl-8 pr-20 pb-1 text-gray-800 border-solid border-2 border-gray-200 outline-none'
                type='text'
                placeholder='Tìm kiếm sách...'
              />
              <button className=' w-20 h-8 bg-red-600 p-1 rounded-lg absolute right-1'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
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
