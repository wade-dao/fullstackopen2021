import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = null

export const userLogin = (credentials) => {
  return async dispatch => {
    try {
      const loggedInUser = await loginService.login(credentials)
      dispatch({
        type: 'USER_LOGGED_IN',
        data: loggedInUser
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(loggedInUser)
      )
      blogService.setToken(loggedInUser.token)

    } catch (exception) {
      dispatch(setNotification({
        type: 0,
        content: 'wrong username or password',
        displayTime: 5
      }))
    }
  }
}

export const userInit = (user) => {
  return async dispatch => {
    dispatch({
      type: 'USER_INITIALIZE',
      data: user
    })
  }
}

export const userLogout = () => {
  return async dispatch => {
    dispatch({
      type: 'USER_LOGGED_OUT'
    })
    window.localStorage.removeItem('loggedBloglistUser')
  }
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'USER_LOGGED_IN':
      return action.data
    case 'USER_LOGGED_OUT':
      return initialState
    case 'USER_INITIALIZE':
      return action.data
    default:
      return state
  }
}

export default reducer