import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  return (
    <div>
      <input
        name="filter"
        placeholder="Search Passport Number"
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default VisibilityFilter