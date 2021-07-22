import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'

const BlogForm = () => {

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const { clearValue: clearValueTitle, ...titleInput } = title
  const { clearValue: clearValueAuthor, ...authorInput } = author
  const { clearValue: clearValueUrl, ...urlInput } = url

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    }))
    dispatch(setNotification({
      type: 1,
      content: 'a new blog ' + title.value + ' by ' + author.value + ' added',
      displayTime: 5
    }))

    clearValueTitle()
    clearValueAuthor()
    clearValueUrl()
  }

  const buttonStyle = {
    marginBottom: 5
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
                <input name="title" {...titleInput} />
              </td>
            </tr>
            <tr>
              <td>author:</td>
              <td>
                <input name="author" {...authorInput}/>
              </td>
            </tr>
            <tr>
              <td>url:</td>
              <td>
                <input name="url" {...urlInput}/>
              </td>
            </tr>
          </tbody>
        </table>
        <button style={buttonStyle} id="createNewButton" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm