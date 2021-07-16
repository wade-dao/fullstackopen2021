const initialState = {
  content: '',
  endTime: new Date().getTime()
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export const setNotification = (message, displayTime) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content: message,
        endTime: new Date().getTime() + displayTime*1000
      }
    })
    setTimeout(() => {
      dispatch(removeNotification())
    }, displayTime*1000)
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
          content: '',
          endTime: new Date().getTime()
        }
      return state
    default:
      return state
  }
}

export default reducer