import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App.jsx'

import studentReducer from './reducers/studentReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    students: studentReducer,
    filter: filterReducer
  }
})

// console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
