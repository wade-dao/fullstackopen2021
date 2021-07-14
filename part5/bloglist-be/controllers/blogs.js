const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)
  const user = request.user
  blog.user = user._id

  //save blog and user
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  if (!request.body.likes)
    response.status(400).end()

  const blog =  {
    likes: request.body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const deletedBlog = await Blog.findById(request.params.id)

  if (deletedBlog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'cannot delete blog post of others' })
  }

  await Blog.findByIdAndDelete(request.params.id)  
  user.blogs = user.blogs.filter(blog => blog.toString() !== deletedBlog._id.toString())
  await user.save()

  response.status(204).end()
})

module.exports = blogsRouter