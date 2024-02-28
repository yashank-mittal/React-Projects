import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getStudents } from '../services/StudentService';


const ViewStudent = () => {
    const {id} = useParams();
    const [student,setStudent]=useState([])
    const navigator = useNavigate();

    useEffect(()=>{
        getStudents(id).then((res)=>{
            setStudent(res.data);
            //console.log(student);
        }).catch(e => {
            console.log(e);
        })
    },[])

    function AllStudent()
    {
      navigator('/students');
    }
  return (
    <div className='container'>
      <h2 className='text-center'>View Student</h2>
      <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Studennt ID</th>
                <th>Student's FirstName</th>
                <th>Student's LastName</th>
                <th>Student's EmailID</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
            </tr>
        </tbody>
      </table>
      <button className='btn btn-info' onClick={AllStudent}>All Students</button>
    </div>
  )
}

export default ViewStudent
