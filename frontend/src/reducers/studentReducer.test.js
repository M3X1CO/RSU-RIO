import studentReducer from './studentReducer'
import deepFreeze from 'deep-freeze'

describe('studentReducer', () => {
  test('returns new state with action NEW_STUDENT', () => {
    const state = []
    const action = {
      type: 'NEW_STUDENT',
      payload: {
        name: 'John',
        passport: 34543534,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = studentReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.payload)
  })
})