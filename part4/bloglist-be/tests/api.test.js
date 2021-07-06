const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const helper = require('./api_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('some blogs exist', () => {
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
      expect(blog.id).toBeDefined()
    }
  })
})

describe('addition of a blog', () => {
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
      'likes': 19
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog post', () => {
  //successfully delete a blog post
  test('successfully delete a blog post', async () => {
    await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .expect(204)

    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)

    expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
    expect(ids).not.toContain('5a422a851b54a676234d17f7')
  })

  //response 400 if the id is not valid
  test('response 400 if the id is not valid', async () => {
    await api
      .delete('/api/blogs/1')
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('update a blog post', () => {
  //successfully update the total likes of a blog post
  test('successfully update the total likes of a blog post', async () => {
    const newBlog = {
      'likes': 9999
    }

    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map(r => r.likes)
    const ids = response.body.map(r => r.id)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
    expect(ids).toContain('5a422a851b54a676234d17f7')

    const index = ids.indexOf('5a422a851b54a676234d17f7')
    expect(likes[index]).toEqual(9999)
  })

  //response 400 if the id is not valid
  test('response 400 if the id is not valid', async () => {
    await api
      .put('/api/blogs/5a422a851b54a676234d17g8')
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  //response 400 if the request body does not contain likes
  test('response 400 if the request body does not contain likes', async () => {
    const newBlog = {
      'likesss': 9999
    }

    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .send(newBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})