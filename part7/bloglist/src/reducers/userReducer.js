import userService from '../services/users'

// export const createBlog = (blog) => {
//   return async dispatch => {
//     const newBlog = await blogService.createNew(blog)
//     dispatch({
//       type: 'USER_NEW',
//       data: newBlog
//     })
//   }
// }

// export const likeBlog = (blog) => {
//   return async dispatch => {
//     const newBlog = {
//       title: blog.content,
//       author: blog.author,
//       likes: blog.likes + 1,
//       url: blog.url,
//       id: blog.id,
//     }

//     await blogService.updateInformation(newBlog)
//     dispatch({
//       type: 'BLOG_LIKE',
//       data: newBlog
//     })
//   }
// }

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'USERS_INITIALIZE',
      data: users
    })
  }
}

// export const deleteBlog = (blog) => {
//   return async dispatch => {
//     await blogService.deleteBlog(blog.id)
//     dispatch({
//       type: 'BLOG_DELETE',
//       data: blog
//     })
//   }
// }

const reducer = (state = [], action) => {

  switch (action.type) {
    // case 'BLOG_NEW':
    //   return [...state, action.data]
    // case 'BLOG_LIKE':
    //   idx = state.findIndex((blog) => blog.id === action.data.id)
    //   newState = [...state]
    //   newState[idx].votes += 1
    //   newState.sort((a, b) => {
    //     if (a.likes > b.likes)
    //       return -1
    //     if (a.likes < b.likes)
    //       return 1
    //     return 0
    //   })
    //   return newState
    // case 'BLOG_DELETE':
    //   idx = state.findIndex((blog) => blog.id === action.data.id)
    //   newState = [...state]
    //   newState.splice(idx, 1)
    //   return newState
    case 'USERS_INITIALIZE':
      return action.data
    default:
      return state
  }
}

export default reducer