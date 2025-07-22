import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import service from '../appwrite/config'
import { Input, Button, RTE, Container } from './index'

export default function Postform({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  })
  
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userdata)
  const [loading, setLoading] = useState(true)
  const [previewImage, setPreviewImage] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setPreviewImage(fileUrl)
    }
  }

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
        
        if (file) {
          service.deleteFile(post.image)
        }
        
        const dbPost = await service.updatePost(post.$id, {
          ...data,
          image: file ? file.$id : post.image
        })
        
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      } else {
        if (!data.image || !data.image[0]) {
          return
        }
        
        const file = await service.uploadFile(data.image[0])
        if (file) {
          const fileId = file.$id
          data.image = fileId
          
          const dbPost = await service.createPost({
            ...data,
            userid: userData.$id
          })
          
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
          }
        }
      }
    } catch (error) {
      console.error('Error in form submission:', error)
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
    }
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title || ''))
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue])

  useEffect(() => {
    if (userData) {
      setLoading(false)
    }
  }, [userData])

  if (loading || !userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="p-2 w-full">
            <h1 className="text-2xl">Loading...</h1>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title:"
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />
        <Input
          label="Slug:"
          placeholder="slug"
          className="mb-4"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), {
              shouldValidate: true
            })
          }}
        />
        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues('content')}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured image:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', { required: !post })}
          onChange={handleFileChange}
        />
        
        {previewImage && (
          <div className="w-full mb-4">
            <img
              src={previewImage}
              alt="Image preview"
              className="rounded-lg w-full h-auto max-h-[300px] object-contain"
            />
          </div>
        )}
        
        {!previewImage && post && post.image && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.image)}
              alt={post.title}
              className="rounded-lg w-full h-auto max-h-[300px] object-contain"
            />
          </div>
        )}
        
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Status:</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            {...register('status', { required: true })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        <Button
          type="submit"
          bgColor={post ? 'bg-green-500' : undefined}
          className="w-full"
        >
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}