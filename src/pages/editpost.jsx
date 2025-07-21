import React, { useEffect, useState } from 'react'
import { Container, Postform } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import service, { Service } from '../appwrite/config'
export default function editpost() {
   const [post, setEditPost] = useState(null)
   const {} = useParams()
   const navigate = useNavigate()
   useEffect((slug)=>{
         service.getPost(slug).then((post)=>{
            if(post){
               setEditPost(post)
            }
            else{
               navigate('/')
            }
         })
   },[slug, navigate]) 
  return post ?  (
    <div className='py-8'>
      <Container>
         <Postform post={post} />
      </Container>
      </div>
  ) : null
}
