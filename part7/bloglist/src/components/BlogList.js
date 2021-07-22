import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'

import { Link } from 'react-router-dom'

import Table from 'react-bootstrap/Table'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingBottom: 10,
  //   paddingLeft: 5,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  return (
    <div className="blogList">
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id} className="singleBlog">
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList