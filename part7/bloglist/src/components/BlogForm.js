import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: title,
      author: author,
      url: url
    }))
    dispatch(setNotification({
      type: 1,
      content: 'a new blog ' + title + ' by ' + author + ' added',
      displayTime: 5
    }))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>title:</td>
              <td>
                <input id="title"
                  type="text"
                  value={title}
                  name="Title"
                  onChange={({ target }) => setTitle(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>author:</td>
              <td>
                <input id="author"
                  type="text"
                  value={author}
                  name="Password"
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>url:</td>
              <td>
                <input id="url"
                  type="text"
                  value={url}
                  name="URL"
                  onChange={({ target }) => setUrl(target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button id="createNewButton" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm