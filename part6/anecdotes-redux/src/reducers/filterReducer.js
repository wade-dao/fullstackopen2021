export const newFilter = (content) => {
  return {
    type: 'NEW_FILTER',
    data: content
  }
}

const reducer = (state = '', action) => {

  switch (action.type) {
    case 'NEW_FILTER':
      return action.data
    default:
      return state
  }
}

export default reducer