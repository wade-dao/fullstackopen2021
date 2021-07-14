const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('./api_helper')
let login = {}
const token = 'bearer ' + login.token

// beforeAll(async () => {
  
// })

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  helper.initialUsers[0].passwordHash = passwordHash
  await User.insertMany(helper.initialUsers)

  login = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'sekret'
    })

  const decodedToken = jwt.verify(login.body.token, process.env.SECRET)
  login.id = decodedToken.id

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
    const blogsAtStart = await helper.blogsInDb()
    const userBlogsAtStart = helper.initialUsers[0].blogs.length

    const newBlog = {
      'title': 'Hooked',
      'author': 'Nir Eyal',
      'url': 'https://www.nirandfar.com/hooked/',
      'likes': 1269
    }

    await api
      .post('/api/blogs')
      .auth(login.body.token, { type: 'bearer' })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.title)
    const ids = blogsAtEnd.map(b => b.id)

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(titles).toContain(
      'Hooked'
    )
    const addedBlog = await Blog.findById(ids[titles.indexOf('Hooked')])
    expect(addedBlog.user.toString()).toEqual('5a422b891b54a676234d17f6')

    const userAtEnd = await User.findById('5a422b891b54a676234d17f6')
    const blogIds = userAtEnd.blogs.map(b => b.toString())
    expect(blogIds).toContain(addedBlog._id.toString())

    const userBlogsAtEnd = userAtEnd.blogs.length
    expect(userBlogsAtEnd).toEqual(userBlogsAtStart + 1)
  })

  //401 if missing token
  test('401 if missing token', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      'title': 'Hooked',
      'author': 'Nir Eyal',
      'url': 'https://www.nirandfar.com/hooked/',
      'likes': 1269
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const title = blogsAtEnd.map(b => b.title)

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(title).not.toContain(
      'Hooked'
    )
  })

  //default like must be 0 if missing in creation request
  test('default like will be 0 if missing in creation request', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      'title': 'Indistractable',
      'author': 'Nir Eyal',
      'url': 'https://www.nirandfar.com/indistractable/',
    }

    await api
      .post('/api/blogs')
      .auth(login.body.token, { type: 'bearer' })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const likes = blogsAtEnd.map(b => b.likes)
    const title = blogsAtEnd.map(b => b.title)

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
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
      .auth(login.body.token, { type: 'bearer' })
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog post', () => {
  //successfully delete a blog post
  test('successfully delete a blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const userAtStart = await User.findById('5a422b891b54a676234d17f6')
    const userBlogsAtStart = userAtStart.blogs

    await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .auth(login.body.token, { type: 'bearer' })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const ids = blogsAtEnd.map(blog => blog.id)

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(ids).not.toContain('5a422a851b54a676234d17f7')

    const userAtEnd = await User.findById('5a422b891b54a676234d17f6')
    const blogIds = userAtEnd.blogs.map(b => b.toString())
    expect(blogIds).not.toContain('5a422a851b54a676234d17f7')
    expect(blogIds.length).toEqual(userBlogsAtStart.length - 1)
  })

  //response 400 if the id is not valid
  test('response 400 if the id is not valid', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete('/api/blogs/1')
      .auth(login.body.token, { type: 'bearer' })
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toEqual(blogsAtStart.length)
  })

  //response 400 if the id is not valid
  test('response 401 if the token is not provided or invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete('/api/blogs/5a422bc61b54a676234d17fc')
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toEqual(blogsAtStart.length)
  })

  //response 401 if the authorized user is not the creator of the blog post
  test('response 401 if the authorized user is not the creator of the blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete('/api/blogs/5a422bc61b54a676234d17fc')
      .auth(login.body.token, { type: 'bearer' })
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toEqual(blogsAtStart.length)

    const ids = blogsAtEnd.map(blog => blog.id)
    expect(ids).toContain('5a422bc61b54a676234d17fc')
  })
})

describe('update a blog post', () => {
  //successfully update the total likes of a blog post
  test('successfully update the total likes of a blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      'likes': 9999
    }

    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(blog => blog.likes)
    const ids = blogsAtEnd.map(blog => blog.id)

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(ids).toContain('5a422a851b54a676234d17f7')

    const index = ids.indexOf('5a422a851b54a676234d17f7')
    expect(likes[index]).toEqual(9999)
  })

  //response 400 if the id is not valid
  test('response 400 if the id is not valid', async () => {
    await api
      .put('/api/blogs/5a422a851b54a676234d17g8')
      .expect(400)
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

describe('when there is initially one user in db', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'luu',
      name: 'Loud Pi',
      password: '12345678',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('invalid username is not created, suitable status code and error message are returned', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'lu',
      name: 'Loud Pi',
      password: '12345678',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('invalid password is not created, suitable status code and error message are returned', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'luuu',
      name: 'Loud Pi',
      password: '12',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('existing username will result 400', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Loud Pi',
      password: '12345678',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})