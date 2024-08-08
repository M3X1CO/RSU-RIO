import React, { useState } from 'react'

const SearchComponent = ({ onSearch }) => {
  const [oldPassportNumber, setOldPassportNumber] = useState('')
  const [newPassportNumber, setNewPassportNumber] = useState('')

  const handleSearch = () => {
    onSearch({ oldPassportNumber, newPassportNumber })
  }

  return (
    <div className="search-container">
      <div className="search-field">
        <label htmlFor="old-passport-number">Old Passport Number:</label>
        <input
          type="text"
          id="old-passport-number"
          value={oldPassportNumber}
          onChange={(e) => setOldPassportNumber(e.target.value)}
        />
      </div>
      <div className="search-field">
        <label htmlFor="new-passport-number">New Passport Number:</label>
        <input
          type="text"
          id="new-passport-number"
          value={newPassportNumber}
          onChange={(e) => setNewPassportNumber(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchComponent
