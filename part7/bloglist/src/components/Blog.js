import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog }) => {
  const [visiblity, setVisibility] = useState(false)

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

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
    dispatch(likeBlog(blog))
    dispatch(setNotification({
      type: 1,
      content: `you liked '${blog.title}' by '${blog.author}'`,
      displayTime: 5
    }))
  }

  const handleClickRemove = async () => {
    const message = 'Remove blog ' + blog.title + ' by ' + blog.author
    if (window.confirm(message)) {
      dispatch(deleteBlog(blog))
      dispatch(setNotification({
        type: 0,
        content: `you deleted '${blog.title}' by '${blog.author}'`,
        displayTime: 5
      }))
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
  blog: PropTypes.object.isRequired
}

export default Blog