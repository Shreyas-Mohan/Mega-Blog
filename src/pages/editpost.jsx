import React, { useEffect, useState } from 'react'
import { Container, Postform } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config' 

export default function Editpost() { 
  const [post, setEditPost] = useState(null)
  const { slug } = useParams() 
  const navigate = useNavigate()
   
  useEffect(() => { 
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setEditPost(post)
        } else {
          navigate('/')
        }
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate]) 
   
  return post ? (
    <div className="py-8">
      <Container>
        <Postform post={post} />
      </Container>
    </div>
  ) : null
}
