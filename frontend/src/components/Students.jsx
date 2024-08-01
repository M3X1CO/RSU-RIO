import { useSelector } from 'react-redux'

const Students = () => {
    const students = useSelector(state => state)

    return(
        <ul>
            {students.map(student =>
                <li 
                    key={student.id}
                >
                    {student.name} <br /> {student.passport}
                </li>
            )}
        </ul>
    )
}

export default Students