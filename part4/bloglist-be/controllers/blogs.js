const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')

blogsRouter.get('/', async (_request, response) => {
  // connectMongo()
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  // connectMongo()

  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.json(savedBlog)
})

module.exports = blogsRouter