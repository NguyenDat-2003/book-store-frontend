import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faHome } from '@fortawesome/free-solid-svg-icons'
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
      label: 'Books'
    },
    {
      key: 'dash-board/users',
      icon: <FontAwesomeIcon icon={faUser} />,
      label: 'Users'
    }
  ]
  return (
    <>
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
