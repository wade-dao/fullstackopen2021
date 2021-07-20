import blogService from '../services/blogs'

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.createNew(blog)
    dispatch({
      type: 'NEW',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlog = {
      title: blog.content,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      id: blog.id,
    }

    await blogService.updateInformation(newBlog)
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => {
      if (a.likes > b.likes)
        return -1
      if (a.likes < b.likes)
        return 1
      return 0
    })
    // console.log('INITIALIZE')
    dispatch({
      type: 'INITIALIZE',
      data: blogs
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog.id)
    dispatch({
      type: 'DELETE',
      data: blog
    })
  }
}

const reducer = (state = [], action) => {

  let newState, idx

  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'VOTE':
      idx = state.findIndex((blog) => blog.id === action.data.id)
      newState = [...state]
      newState[idx].votes += 1
      newState.sort((a, b) => {
        if (a.likes > b.likes)
          return -1
        if (a.likes < b.likes)
          return 1
        return 0
      })
      return newState
    case 'DELETE':
      idx = state.findIndex((blog) => blog.id === action.data.id)
      newState = [...state]
      newState.splice(idx, 1)
      return newState
    case 'INITIALIZE':
      return action.data
    default:
      return state
  }
}

export default reducer