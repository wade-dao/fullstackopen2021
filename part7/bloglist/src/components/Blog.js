import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { useField } from '../hooks'

import { likeBlog, deleteBlog, initializeBlogs, addBlogComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)
  const blogs = useSelector(state => state.blogs)
  const matchBlog = useRouteMatch('/blogs/:id')

  const comment = useField('text')
  const { clearValue: clearValueComment, ...commentInput } = comment

  useEffect(() => {
    if (blog === null || typeof blog === 'undefined') {
      dispatch(initializeBlogs())
    }
  }, [])

  useEffect(() => {
    blog = matchBlog
      ? blogs.find(blog => blog.id === matchBlog.params.id)
      : null
  }, [blogs, matchBlog])


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

  const handleAddComment = async () => {
    if (comment.value !== '')
    {
      dispatch(addBlogComment(blog, comment.value))
      clearValueComment()
    }
  }

  if (blog !== null && typeof blog !== 'undefined') {
    return (
      <div>
        <h2>{blog.title} {blog.author}</h2>
        <div className="urlLikesUser">
          <a href="#">{blog.url}</a>
          <table>
            <tbody>
              <tr>
                <td className="likeNumber">{blog.likes}</td>
                <td>likes</td>
                <td><button className="likeButton" onClick={handleClickLike}>like</button></td>
              </tr>
            </tbody>
          </table>
          <div>{blog.user.name}</div>
          {loggedInUser.username === blog.user.username ? <button className="removeButton" onClick={handleClickRemove}>remove</button> : null}
          <h3>comments</h3>
          <input name="comment" {...commentInput} />
          <button onClick={handleAddComment} id="addCommentButton" type="submit">add comment</button>
          <ul>
            {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h2>waiting for data</h2>
      </div>
    )
  }
}
export default Blog