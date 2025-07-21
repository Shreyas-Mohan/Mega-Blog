import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Service from '../appwrite/config'

export default function Postform(post) {
   const {register, handleSubmit, watch, setValue, control, getValues} = useForm({defaultValues:{
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status ||  'active'
   }})

   const navigate = useNavigate() // used to navigate to the given route
   const userData = useSelector(state => state.user.userdata) // extract data from redux store state
   // this redux state has a user slice, and within that slice, there is a userdata property
   const submit = async (data) => {
      if(post){
         data.image[0] ? Service.uploadFile(data.image[0]) :null
      if(file){
         Service.deleteFile(post.image)
      }
      const dbPost = await Service.updatePost(post.$id, {
         ...data, image: file ? file.$id : undefined       // if file exists use file.id as image
      })
      if(dbPost){
         navigate(`/post/${dbPost.$id}`)
      }
   }
      else{
          const file = await Service.uploadFile(data.image[0])
          if(file){
            const file_id = file.$id
            data.image = file_id
            const dbPost = await Service.createPost({
                  ...data,
                  userid: userData.$id
               })
               if(dbPost){
                  navigate(`/post/${dbPost.$id}`)
               }
            }
          }
      }

   const slugTransform = useCallback((value) => {
         if(value && typeof value === 'string'){
            return value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g, '-').replace(/\s/g, '-')
         }
   },[]) 

   React.useEffect(()=>{
      const subscription = watch((value,{name})=>{
         if(name === 'title'){
            setValue('slug', slugTransform(value.title, {shouldValidate:true}))
         }
      })
      return () => {
         subscription.unsubscribe() // stopping the listening to changes or updates that were set up in useEffect hook
      }
   },[watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
         <div className='w-2/3 px-2'>
               <Input
                  label='Title :'
                  placeholder='Title'
                  className='mb-4'
                  {...register('title',{required: true})}
               />
               <Input
                  label= 'slug'
                  placeholder='slug'
                  className='mb-4'
                  {...register ('slug',{required: true})}
                  onInput={(e)=>{
                     setValue('slug', slugTransform(e.currentTarget.value),{shouldValidate: true})
                  }}
               />
               <RTE
                  label='content'
                  name='content'
                  control={control}
                  defaultvalue={getValues('content')}
               />
         </div>
         <div className='w-1/3 px-2'>
               <Input
                  label='fetaured image'
                  type='file'
                  className='mb-4'
                  accept='image/png, image/jpg, image/jpeg, image/gif'
                  {...register('image',{required: !post})}
               />
               {post && (
               <div className='w-full mb-4'>
                     <Img
                        src={Service.getfilePreview(post.image)}
                        alt={post.title}
                        className='rounded-lg'
                     />
               </div>
            )}
            <Select
               options={['active','inactive']}
               label='status'
               className='mb-4'
               {...register('status', {required: true})}
            />
            <Button
               type='submit'
               bgColor={post ? "bg-green-500" : undefined} 
               className='w-full'
            >
               {post ? "Update" : "Submit"}
            </Button>
         </div>
    </form>
  )
}