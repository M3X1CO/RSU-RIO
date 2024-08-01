const initialState = [
  {
    name: 'John Henry',
    passport: '23423423',
    id: 1,
  },
  {
    name: 'Tabasco Sauce',
    passport: 'A5150',
    id: 2,
  },
]


const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_STUDENT':
      return [...state, action.payload]
    default:
      return state
  }
}


const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createStudent = (name, passport) => {
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