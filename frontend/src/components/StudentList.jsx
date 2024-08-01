import { useSelector } from 'react-redux';

const Students = () => {
  const students = useSelector((state) => state.students)
  const filter = useSelector((state) => state.filter)

  const filteredStudents = students.filter((student) =>
    student.passport.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <ul>
      {filteredStudents.map((student) => (
        <li key={student.id}>
          Name: {student.name} <br /> Passport: {student.passport}
        </li>
      ))}
    </ul>
  );
};

export default Students;