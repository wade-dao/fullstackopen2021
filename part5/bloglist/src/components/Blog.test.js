import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Logged in user is the creator of the blog', () => {
  const blog = {
    id: '1',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    user: {
      name: 'Loud Pi',
      username: 'luu'
    } ,
    likes: 199
  }
  
  const user = {
    username: 'luu',
    name: 'Loud Pi'
  }
  
  const mockLike = jest.fn()
  const mockDelete = jest.fn()
  
  let component
  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} likeBlog={mockLike} loggedInUser={user} deleteBlog={mockDelete}/>
    )
  })
  
  test('renders title and author', () => {
  
    const titleAuthordiv = component.container.querySelector('.titleAuthor')
    expect(titleAuthordiv).toHaveTextContent(
      'Go To Statement Considered Harmful'
    )
    expect(titleAuthordiv).toHaveTextContent(
      'Edsger W. Dijkstra'
    )
  
    const blogDiv = component.container.querySelector('.singleBlog')
    expect(blogDiv).not.toHaveTextContent(
      'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
    )
    expect(blogDiv).not.toHaveTextContent(
      'Loud Pi'
    )
    expect(blogDiv).not.toHaveTextContent(
      '199'
    )
  })
  
  test('clicking the view button shows URL, likes, creator and remove button', () => {
    const titleAuthordiv = component.container.querySelector('.titleAuthor')
    expect(titleAuthordiv).toHaveTextContent(
      'Go To Statement Considered Harmful'
    )
    expect(titleAuthordiv).toHaveTextContent(
      'Edsger W. Dijkstra'
    )
  
    const viewButton = component.container.querySelector('.viewButton')
    fireEvent.click(viewButton)
    
    const detailDiv = component.container.querySelector('.urlLikesUser')
    expect(detailDiv).toHaveTextContent(
      'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
    )
    expect(detailDiv).toHaveTextContent(
      'Loud Pi'
    )
    expect(detailDiv).toHaveTextContent(
      '199'
    )

    const likeButton = component.container.querySelector('.likeButton')
    expect(likeButton).toBeDefined()
    const removeButton = component.container.querySelector('.removeButton')
    expect(removeButton).toBeDefined()
  })
  
  test('clicking the like button twice fires the like function twice', () => {
  
    const viewButton = component.container.querySelector('.viewButton')
    fireEvent.click(viewButton)
  
    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockLike.mock.calls).toHaveLength(2)
  })
})

describe('Logged in user is not the creator of the blog', () => {
  const blog = {
    id: '1',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    user: {
      name: 'Loud Pi',
      username: 'luu'
    } ,
    likes: 199
  }
  
  const user = {
    username: 'test',
    name: 'Tester'
  }
  
  const mockLike = jest.fn()
  const mockDelete = jest.fn()
  
  let component
  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} likeBlog={mockLike} loggedInUser={user} deleteBlog={mockDelete}/>
    )
  })

  test('clicking the view button does not show remove button', () => {

    const removeButton = component.container.querySelector('.removeButton')
    expect(removeButton).toBeNull()
  })
})