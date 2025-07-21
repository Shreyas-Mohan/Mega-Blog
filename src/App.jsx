import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      setLoading(false)
      dispatch(logout())
    }, 3000)

    authService.getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login({ userdata }))
        } else {
          dispatch(logout())
        }
      })
      .catch(() => {
        dispatch(logout())
      })
      .finally(() => {
        clearTimeout(safetyTimeout)
        setLoading(false)
      })
  }, [dispatch])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl">Loading...</div>
    </div>
  )
}

export default App