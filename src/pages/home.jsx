import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (!authStatus) {
      setLoading(false)
      return
    }

    service
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents || [])
        }
      })
      .catch((err) => {
        console.error('Error fetching posts:', err)
      })
      .finally(() => setLoading(false))
  }, [authStatus])

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="p-2 w-full">
            <h1 className="text-2xl">Loading posts...</h1>
          </div>
        </Container>
      </div>
    )
  }

  if (!authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
              <div className="mt-4">
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold">No posts available</h1>
              <p className="mt-2">Check back later or create your own post!</p>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
