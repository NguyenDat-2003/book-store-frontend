import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import LogIn from './pages/Auth/LogIn'
import Home from './pages/Home/Home'
import Register from './pages/Auth/Register'
import RequireLayout from './layout/RequireLayout'
import Cart from './pages/Cart/Cart'
import BookDetail from './components/BookDetail/BookDetail'
import Checkout from './pages/Cart/Checkout/Checkout'
import Order from './pages/User/Order/Order'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'login', element: <LogIn /> },
        { path: 'register', element: <Register /> },
        { path: 'chi-tiet-sach/:slug/:id', element: <BookDetail /> },
        { path: 'checkout', element: <Checkout /> },
        { path: 'user/order', element: <Order /> }
      ]
    },
    {
      path: '/',
      element: <RequireLayout />,
      children: [{ path: 'my-cart', element: <Cart /> }]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
