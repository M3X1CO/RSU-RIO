import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Pages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/${id}`);
        if (response.ok) {
          const data = await response.json();
          setStudent(data);
        } else {
          console.error('Failed to fetch student');
        }
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <button
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1rem',
        }}
        onClick={() => navigate('/')}
      >
        Return Home
      </button>
      <h2>{student.name}</h2>
      <p>Passport: {student.passport}</p>
      {/* Add more student details here */}
    </div>
  );
};

export default Pages;
