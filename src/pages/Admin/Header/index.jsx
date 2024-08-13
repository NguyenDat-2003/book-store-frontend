import { useContext } from 'react'
import { AuthContext } from '~/context/AuthContext'

function Header() {
  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <div className='h-20 flex justify-start items-center py-4 px-2'>
        <div className='basis-2/5'>
          <p>
            Welcom <b>{currentUser.email}</b>
          </p>
        </div>
        <p className='text-3xl font-medium'>DASH BOARD</p>
      </div>
    </>
  )
}

export default Header
