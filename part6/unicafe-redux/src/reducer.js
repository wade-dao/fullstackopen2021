const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  all: 0,
  average: 0,
  positive: 0
}

const goodScore = 1
const okScore = 0
const badScore = -1

const counterReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'GOOD':
      return {
        ...state,
        good: state.good + 1,
        all: state.all + 1,
        average: ((state.good + 1)*goodScore + state.ok*okScore + state.bad*badScore) / (state.all + 1),
        positive: (state.good + 1) / (state.all + 1) * 100
      }
    case 'OK':
      return {
        ...state,
        ok: state.ok + 1,
        all: state.all + 1,
        average: ((state.ok + 1)*okScore + state.good*goodScore + state.bad*badScore) / (state.all + 1),
        positive: state.good / (state.all + 1) * 100
      }
    case 'BAD':
      return {
        ...state,
        bad: state.bad + 1,
        all: state.all + 1,
        average: ((state.bad + 1)*badScore + state.good*goodScore + state.ok*okScore) / (state.all + 1),
        positive: state.good / (state.all + 1) * 100
      }
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer