import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
      all: 1,
      average: 1,
      positive: 100
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
      all: 1,
      average: 0,
      positive: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
      all: 1,
      average: -1,
      positive: 0
    })
  })

  test('should correctly calculate all, average and positive', () => {
    const good = {
      type: 'GOOD'
    }
    const bad = {
      type: 'BAD'
    }
    const ok = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    let newState
    for (let i = 0; i < 5; i++) {
      newState = counterReducer(newState, good)
      
      if (i === 2) {
        newState = counterReducer(newState, ok)
      }

      if (i === 4) {
        newState = counterReducer(newState, ok)
        newState = counterReducer(newState, bad)
      }
    }

    expect(newState).toEqual({
      good: 5,
      ok: 2,
      bad: 1,
      all: 8,
      average: 0.5,
      positive: 62.5
    })
  })
})