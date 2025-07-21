import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

export default function Postcard({ $id, title, image }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(image)}
            alt={title}
            className="rounded-xl"
            onError={(e) => {
              e.target.src = 'https://placehold.co/600x400?text=Image+Not+Available'
            }}
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  )
}