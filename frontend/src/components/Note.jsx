const Names=( {person, deleteName} ) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid lightgray'}}>
        {person.name} {person.number} 
        <button style={{ marginRight: '4em'}} onClick={()=>deleteName(person.id)}>delete</button>
      </div>
    )
}

const Filter = ({ searchName, handleSearchName }) => {
return (
    <div>
    SEARCH: {''}
    <input value={searchName} onChange={handleSearchName} />
    </div>
    )
}
  
const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
return (
    <div>
    <form onSubmit={addName}>
        <div>
        Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
        Passport Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
        <button type="submit">Submit</button>
        </div>
    </form>
    </div>
    )
}
  
const Persons = ({ persons, deleteName }) => {
return (
    <div>
    {persons.map((person) => {
        return (
        <Names key={person.name} person={person} deleteName={deleteName} />
        )
    })}
    </div>
    )
}

export { Names, Filter, PersonForm, Persons };