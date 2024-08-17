import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBug, faCodeCompare, faHome, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

function SideMenu() {
  const navigate = useNavigate()
  const items = [
    {
      key: '/',
      icon: <FontAwesomeIcon icon={faHome} />,
      label: 'Home'
    },
    {
      key: 'dash-board/books',
      icon: <FontAwesomeIcon icon={faBook} />,
      label: 'Book'
    },
    {
      key: 'dash-board/users',
      icon: <FontAwesomeIcon icon={faUser} />,
      label: 'User'
    },
    {
      key: 'dash-board/roles',
      icon: <FontAwesomeIcon icon={faUserSecret} />,
      label: 'Role'
    },
    {
      key: 'dash-board/permission',
      icon: <FontAwesomeIcon icon={faCodeCompare} />,
      label: 'Permission'
    }
  ]
  return (
    <>
      <p className='text-lg text-center py-4'>
        <FontAwesomeIcon icon={faBug} className='mr-2' />
        ADMIN
      </p>
      <Menu
        items={items}
        onClick={(item) => {
          navigate(item.key)
        }}
      ></Menu>
    </>
  )
}

export default SideMenu
