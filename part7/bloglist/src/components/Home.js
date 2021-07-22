import { React, useRef } from 'react'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Home = () => {
  const blogFormRef = useRef()

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}
export default Home