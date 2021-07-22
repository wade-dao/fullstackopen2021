import blogService from '../services/blogs'

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.createNew(blog)
    dispatch({
      type: 'BLOG_NEW',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      id: blog.id,
    }

    await blogService.updateInformation(newBlog)
    dispatch({
      type: 'BLOG_LIKE',
      data: newBlog
    })
  }
}

export const addBlogComment = (blog, comment) => {
  return async dispatch => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url,
      id: blog.id,
      comments: blog.comments.concat(comment)
    }

    const updatedBlog = await blogService.addComment(newBlog)
    dispatch({
      type: 'BLOG_ADD_COMMENT',
      data: updatedBlog
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
    dispatch({
      type: 'BLOG_INITIALIZE',
      data: blogs
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog.id)
    dispatch({
      type: 'BLOG_DELETE',
      data: blog
    })
  }
}

const reducer = (state = [], action) => {

  let newState, idx

  switch (action.type) {
    case 'BLOG_NEW':
      return [...state, action.data]
    case 'BLOG_LIKE':
      idx = state.findIndex((blog) => blog.id === action.data.id)
      newState = [...state]
      newState[idx].likes += 1
      newState.sort((a, b) => {
        if (a.likes > b.likes)
          return -1
        if (a.likes < b.likes)
          return 1
        return 0
      })
      return newState
    case 'BLOG_DELETE':
      idx = state.findIndex((blog) => blog.id === action.data.id)
      newState = [...state]
      newState.splice(idx, 1)
      return newState
    case 'BLOG_ADD_COMMENT':
      idx = state.findIndex((blog) => blog.id === action.data.id)
      newState = [...state]
      newState[idx].comments = action.data.comments
      return newState
    case 'BLOG_INITIALIZE':
      return action.data
    default:
      return state
  }
}

export default reducer