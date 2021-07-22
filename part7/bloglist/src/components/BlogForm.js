import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
      <h3>Create new blog</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" placeholder="Blog title" {...titleInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control name="author" placeholder="Author of the blog" {...authorInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control name="url" placeholder="URL of the blog" {...urlInput} />
        </Form.Group>
        <Button style={buttonStyle} id="createNewButton" variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm