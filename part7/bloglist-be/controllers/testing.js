const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/api_helper')
const bcrypt = require('bcrypt')

router.post('/reset', async (_request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  helper.initialUsers[0].passwordHash = passwordHash
  helper.initialUsers[1].passwordHash = passwordHash
  await User.insertMany(helper.initialUsers)
  await Blog.insertMany(helper.initialBlogs)

  response.status(204).end()
})

module.exports = router