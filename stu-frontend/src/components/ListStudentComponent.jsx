import React,{useEffect, useState} from 'react'
import { ListStudents, deleteStudent, getStudents } from '../services/StudentService'
import { useNavigate } from 'react-router-dom'

const ListStudentComponent = () => {
    const [students,setStudents]=useState([])
    const navigator = useNavigate();
    useEffect(() => {
      getAllStudents();
    },[students])

    function getAllStudents()
    {
      ListStudents().then((response) => {
        setStudents(response.data);
      }).catch(err=>console.error(error))
    }

    function addNewStudent()
    {
      navigator('/addStudent')
    }

    function updateStudent(id)
    {
      navigator(`/students/updateStudent/${id}`);
    }

    function removeStudent(id){
      //console.log(id);
      deleteStudent(id).then((res) => {
        getAllStudents();
      }).catch(e => {
        console.error(e);
      })
    }

    function viewStudent(id)
    {
      navigator(`/viewStudent/${id}`);
    }

  return (
    <div className='container'>
      <h2 className='text-center'>List of Students</h2>
      <button type="button" className="btn btn-primary mb-2" onClick={addNewStudent}>Add Student</button>
      <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Studennt ID</th>
                <th>Student's FirstName</th>
                <th>Student's LastName</th>
                <th>Student's EmailID</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                students.map(student => 
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                        <td>
                          <button className='btn btn-info' onClick={() => updateStudent(student.id)}>Update</button>
                          <button className='btn btn-danger' onClick={() => removeStudent(student.id)}
                            style={{marginLeft:'10px'}}>
                          Delete</button>
                          <button className='btn btn-primary' onClick={() => viewStudent(student.id)}
                            style={{marginLeft:'10px'}}
                          >View</button>
                        </td>
                    </tr>    
                    
                )
            }
        </tbody>
      </table>
    </div>
  )
}

export default ListStudentComponent
