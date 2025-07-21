import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'
import { Container } from '../components'

export default function post() {
   const [post, setpost] = useState(null)
   const {slug} = useParams()
   const navigate = useNavigate()
   const userdata = useSelector((state)=> state.auth.userdata)
   const isauthor = post && userdata ? post.userid === userdata.$id : false
   useEffect(()=>{
      if(slug){
         service.getPost(slug).then((post)=>{
            if(post) setpost(post)
               else navigate('/')
         })
      } else navigate('/')
   }, [slug, navigate])
   const deletepost = () => {
      service.deletePost(post.$id).then((status)=>{
         if(status){
            service.deleteFile(post.image)
            navigate('/')
         }
      })
   } 
  return post ? (
    <div className='py'>
      <Container>
         <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
               <img 
                  src={service.getfilePreview(post.image)}
                  alt = {post.title}
                  className='rounded-xl'
               />
               {isauthor && (
                  <div className='absolute right-6 top-6'>
                     <Link to={`/edit-post/${post.$id}`}>
                        <Button 
                           bgcColor='bg-green-500'
                           className='mr-3'
                        >
                           Edit
                        </Button>
                     </Link>
                     <Button 
                        bgcColor='bg-red-500'
                        onClick={deletepost}
                     >
                           Delete
                     </Button>
                  </div>
               )}
         </div>
         <div className='w-full mb-6'>
               <h1 className='text-2xl font-bold'>
                     {post.title}
               </h1>
         </div>
         <div className='browser-css'>
               {parse(post.content)}
         </div>
      </Container>
    </div>
  ) : null
}
