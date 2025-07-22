import React from 'react'
import appwriteService from '../appwrite/config'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Postcard({ $id, title, image }) {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const handlePostClick = (e) => {
    if (!authStatus) {
      e.preventDefault()
      navigate('/login')
    }
  }

  const imageUrl = image ? appwriteService.getFilePreview(image) : null

  return (
    <Link to={`/post/${$id}`} onClick={handlePostClick}>
      <div className="w-full bg-gray-100 rounded-xl p-4 cursor-pointer hover:bg-gray-200 transition-colors">
        <div className="w-full justify-center mb-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="rounded-xl w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x400?text=Image+Not+Available'
              }}
            />
          ) : (
            <div className="w-full h-48 bg-gray-300 rounded-xl flex items-center justify-center">
              <span className="text-gray-600">No Image Available</span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        {!authStatus && (
          <p className="text-sm text-gray-600 mt-2">
            Click to login and read this post
          </p>
        )}
      </div>
    </Link>
  )
}