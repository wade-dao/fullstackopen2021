import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, loggedInUser, deleteBlog }) => {
  const [visiblity, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetail = () => {
    setVisibility(!visiblity)
  }

  const handleClickLike = async () => {
    await likeBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1
    })
  }

  const handleClickRemove = async () => {
    const message = 'Remove blog ' + blog.title + ' by ' + blog.author
    if (window.confirm(message)) {
      await deleteBlog(blog.id)
    }
  }

  return (
    <div className="singleBlog" style={blogStyle}>
      <div className="titleAuthor">
        {blog.title} {blog.author} <button className="viewButton" onClick={toggleDetail}> {visiblity === false ? 'view' : 'hide'} </button>
      </div>
      {visiblity === true &&
        <div className="urlLikesUser">
          <div>{blog.url}</div>
          {/* <div>likes {blog.likes} <button className="likeButton" onClick={handleClickLike}>like</button></div> */}
          <table>
            <tbody>
              <tr>
                <td>likes</td>
                <td className="likeNumber">{blog.likes}</td>
                <td><button className="likeButton" onClick={handleClickLike}>like</button></td>
              </tr>
            </tbody>
          </table>
          <div>{blog.user.name}</div>
          {loggedInUser.username === blog.user.username ? <button className="removeButton" onClick={handleClickRemove}>remove</button> : null}
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog