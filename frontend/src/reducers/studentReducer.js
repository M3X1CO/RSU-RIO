import { createSlice, current } from '@reduxjs/toolkit'

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

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    createStudent: {
      reducer(state, action) {
        state.push(action.payload)
        // console.log(current(state))
      },
      prepare(name, passport) {
        return {
          payload: {
            name,
            passport,
            id: generateId(),
          },
        }
      },
    },
  },
})

export const { createStudent } = studentSlice.actions

export default studentSlice.reducer