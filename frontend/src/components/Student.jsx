import React from 'react';

const Student = ({ name, passport }) => {
  return (
    <div>
      <p>{name} {passport}</p>
    </div>
  );
}

export default Student;
