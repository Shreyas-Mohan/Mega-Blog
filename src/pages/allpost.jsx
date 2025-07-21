import React, { useEffect, useState } from 'react'
import { Container, Postcard } from '../components'
import Service from '../appwrite/config'
export default function Allpost() { 
  const [posts, setposts] = useState([])
  useEffect(()=>{} ,[])
  Service.getPosts([]).then((posts) => {
   if(posts) {
      setposts(posts.documents)
    }})
  return (
    <div className='w-full py-8'>
      <Container>
            <div className='flex flex-wrap'>
                  {posts.map((post) => (
                     <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard post={post }/>
                     </div>))}
            </div>
     </Container>
    </div>
  )
}
