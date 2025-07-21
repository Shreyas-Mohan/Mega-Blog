import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Protected from './components/Authlayout.jsx'
import Signup from './pages/signup.jsx'
const root = createBrowserRouter([
  {
    path : '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (<Protected authentication={false}>
            <Login/>
        </Protected>)
      },
      {
        path: '/signup',
        element: (<Protected authentication={false}>
            <Signup/>
        </Protected>)
      },
      {
        path: '/all-posts',
        element: (<Protected authentication>
          {' '}
            <Allpost/>
        </Protected>)
      },
      {
        path: '/edit-post/:slug',
        element: (<Protected authentication>
          {' '}
            <Editpost/>
        </Protected>)
      },
      {
        path: '/post/:slug',
        element: <Post/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
        <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
