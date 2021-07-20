const initialState = {
  type: 1,
  content: '',
  endTime: new Date().getTime()
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export const setNotification = (notification) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        type: notification.type,
        content: notification.content,
        endTime: new Date().getTime() + notification.displayTime*1000
      }
    })
    setTimeout(() => {
      dispatch(removeNotification())
    }, notification.displayTime*1000)
  }
}

const reducer = (state = initialState, action) => {

  let currentTime

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      currentTime = new Date().getTime()
      if (currentTime >= state.endTime)
        return {
          type: 1,
          content: '',
          endTime: new Date().getTime()
        }
      return state
    default:
      return state
  }
}

export default reducer