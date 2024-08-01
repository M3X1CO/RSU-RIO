const studentReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_STUDENT':
      return [...state, action.payload]
    default:
      return state
  }
}


const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const addStudent = (name, passport) => {
  return {
      type: 'NEW_STUDENT',
      payload: {
          name,
          passport,
          id: generateId()
      }
  }
}

export default studentReducer