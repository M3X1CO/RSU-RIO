import React from 'react';

const Search = ({ oldPassportSearch, newPassportSearch, setOldPassportSearch, setNewPassportSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Old Passport Number"
        value={oldPassportSearch}
        onChange={(e) => setOldPassportSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search New Passport Number"
        value={newPassportSearch}
        onChange={(e) => setNewPassportSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;