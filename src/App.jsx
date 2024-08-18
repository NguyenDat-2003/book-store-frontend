import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import LogIn from './pages/Auth/LogIn'
import Home from './pages/Home/Home'
import Register from './pages/Auth/Register'
import PrivateLayout from './layout/PrivateLayout'
import Cart from './pages/Cart/Cart'
import BookDetail from './components/BookDetail/BookDetail'
import Checkout from './pages/Cart/Checkout/Checkout'
import ListUser from './pages/Admin/User/ListUser/ListUser'
import NotFound from './pages/NotFound'
import GroupRole from './pages/Admin/GroupRole/GroupRole'
import Book from './pages/Admin/Book'
import Order from './pages/Admin/User/Order/Order'
import Role from './pages/Admin/GroupRole/Role'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Home /> },
        { path: 'login', element: <LogIn /> },
        { path: 'register', element: <Register /> },
        { path: 'chi-tiet-sach/:slug/:id', element: <BookDetail /> },
        { path: 'checkout', element: <Checkout /> },
        { path: 'user/order', element: <Order /> },
        { path: 'my-cart', element: <Cart /> }
      ]
    },
    {
      path: '/',
      element: <PrivateLayout />,
      children: [
        { path: 'dash-board/book', element: <Book /> },
        { path: 'dash-board/user', element: <ListUser /> },
        { path: 'dash-board/role', element: <Role /> },
        { path: 'dash-board/permission', element: <GroupRole /> }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
