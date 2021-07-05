const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const helper = require('./api_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

//blogs are returned as json
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

//there are six blogs
test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

//unique identifier property of the blog posts is named id
test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  
  for (let blog of response.body) {
    expect(blog.id).toBeDefined();
  }
})

//a valid blog post can be added
test('a valid blog post can be added', async () => {
  const newBlog = {
    'title': 'Hooked',
    'author': 'Nir Eyal',
    'url': 'https://www.nirandfar.com/hooked/',
    'likes': 1269
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain(
    'Hooked'
  )
})

//default like must be 0 if missing in creation request
test('default like will be 0 if missing in creation request', async () => {
  const newBlog = {
    'title': 'Indistractable',
    'author': 'Nir Eyal',
    'url': 'https://www.nirandfar.com/indistractable/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const likes = response.body.map(r => r.likes)
  const title = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(title).toContain(
    'Indistractable'
  )

  const index = title.indexOf('Indistractable')
  expect(likes[index]).toEqual(0)
})

//respond 400 if the creation object missing title and url
test('respond 400 if the creation object missing title and url', async () => {
  const newBlog = {
    'author': 'Nir Eyal',
    likes: 19
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})