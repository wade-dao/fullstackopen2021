const initialState = [
  {
    id: 1,
    content: 'If it hurts, do it more often',
    votes: 0
  },
  {
    id: 2,
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0
  },
  {
    id: 3,
    content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0
  },
  {
    id: 4,
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0
  },
  {
    id: 5,
    content: 'Premature optimization is the root of all evil.',
    votes: 0
  },
  {
    id: 6,
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
  }
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (content) => {
  return {
    type: 'NEW',
    data: {
      id: getId(),
      content: content,
      votes: 0
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

const reducer = (state = initialState, action) => {

  let newState

  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'VOTE':
      const idx = state.findIndex((anecdote) => anecdote.id === action.data.id)
      newState = [...state]
      newState[idx].votes += 1
      newState.sort((a, b) => {
        if (a.votes > b.votes)
          return -1
        if (a.votes < b.votes)
          return 1
        return 0
      })
      return newState
    default:
      return state
  }
}

export default reducer