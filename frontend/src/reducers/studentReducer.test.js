import studentReducer from './studentReducer'
import deepFreeze from 'deep-freeze'

describe('studentReducer', () => {
  test('returns new state with action NEW_STUDENT', () => {
    const state = []
    const action = {
      type: 'students/createStudent',
      payload: {
        name: 'John',
        passport: '34543534',
        id: 1
      }
    }

    deepFreeze(state)
    const newState = studentReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.map(s => s.passport)).toContainEqual(action.payload.passport)
  })
})