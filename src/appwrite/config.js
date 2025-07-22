import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
  client = new Client()
  databases
  bucket

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createPost({ title, slug, content, image, status, userid }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
          userid,
        }
      )
    } catch (error) {
      console.error('Appwrite service :: createPost :: error', error)
      return false
    }
  }

  async updatePost(slug, { title, content, image, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
        }
      )
    } catch (error) {
      console.error('Appwrite service :: updatePost :: error', error)
      return false
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
    } catch (error) {
      console.error('Appwrite service :: deletePost :: error', error)
      return false
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.error('Appwrite service :: getPost :: error', error)
      return false
    }
  }

  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
    } catch (error) {
      console.error('Appwrite service :: getPosts :: error', error)
      return { documents: [] }
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.error('Appwrite service :: uploadFile :: error', error)
      return false
    }
  }

  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileID
      )
      return true
    } catch (error) {
      console.error('Appwrite service :: deleteFile :: error', error)
      return false
    }
  }

  getFilePreview(fileID) {
    try {
      if (!fileID) {
        return null
      }
      
      const fileUrl = this.bucket.getFileView(
        conf.appwriteBucketId,
        fileID
      )
      
      return fileUrl.toString()
    } catch (error) {
      console.error('Appwrite service :: getFilePreview :: error', error)
      return null
    }
  }
}

const service = new Service()
export default service
