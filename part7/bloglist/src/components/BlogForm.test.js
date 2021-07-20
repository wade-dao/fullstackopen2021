import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createNewBlog = jest.fn()

  const component = render(
    <BlogForm createNewBlog={createNewBlog} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, { 
    target: { value: 'Go To Statement Considered Harmful' } 
  })
  fireEvent.change(inputAuthor, { 
    target: { value: 'Edsger W. Dijkstra' } 
  })
  fireEvent.change(inputUrl, { 
    target: { value: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html' } 
  })
  fireEvent.submit(form)
  expect(createNewBlog.mock.calls).toHaveLength(1)
  await waitFor(() => {
    expect(createNewBlog.mock.calls[0][0].title).toBe('Go To Statement Considered Harmful')
  })
  await waitFor(() => {
    expect(createNewBlog.mock.calls[0][0].author).toBe('Edsger W. Dijkstra')
  })
  await waitFor(() => {
    expect(createNewBlog.mock.calls[0][0].url).toBe('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
  })
})