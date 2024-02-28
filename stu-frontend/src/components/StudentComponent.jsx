import React, { useEffect, useState } from 'react'
import { createStudent, getStudents, updateStudent } from '../services/StudentService';
import { useNavigate, useParams } from 'react-router-dom';

const StudentComponent = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const navigator = useNavigate();
    const {id} =useParams();
    const [errors,setErrors] = useState({
        firstName:'',
        lastName:'',
        email:''
    })

    useEffect(()=>{
        if(id){
            getStudents(id).then((res)=>{
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
            }).catch(e => {
                console.log("Error", e);
            })
        }
    },[id])

    function handleFirstName(e)
    {
        setFirstName(e.target.value);
    }
    function handleLastName(e)
    {
        setLastName(e.target.value);
    }
    function handleEmail(e)
    {
        setEmail(e.target.value);
    }
    function saveorUpdateStudent(e)
    {
        e.preventDefault();
        //console.log(student);
        if(validateForm())
        {
            const student = {firstName,lastName,email};
            if(id)
            {
                updateStudent(id,student).then((response)=>{
                    console.log(response.data);
                    navigator('/students');
                }).catch(e => {
                    console.error(e);
                })
            }else{
                createStudent(student).then((res) => {
                    console.log(res.data);
                    navigator('/students')
                }).catch(e => {
                    console.error(e);
                })
            }
        }
    }

    function validateForm()
    {
        let valid = true;
        const errorCopy = {... errors}//spread operator : Used to copy data from one object to another
        if(firstName.trim())
        {
            errorCopy.firstName = '';
        }else{
            errorCopy.firstName = 'Please Enter your First Name';
            valid = false;
        }
        if(lastName.trim())
        {
            errorCopy.lastName = '';
        }else{
            errorCopy.lastName = 'Please Enter your Last Name';
            valid = false;
        }
        if(email.trim())
        {
            errorCopy.email = '';
        }else{
            errorCopy.email = 'Please Enter your Email';
            valid = false;
        }

        setErrors(errorCopy);
        return valid;
    }

    function pageTitle()
    {
      if(id)
      {
        return <h2 className='text-center'>Update Student</h2>
      }
      else
      {
        return <h2 className='text-center'>Add Student</h2>
      }
    }

  return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name</label>
                            <input
                                type='text'
                                placeholder='Enter First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${ errors.firstName ?  "is-invalid" : "" }`}
                                onChange={handleFirstName}
                            ></input>
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name</label>
                            <input
                                type='text'
                                placeholder='Enter Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${ errors.lastName ?  "is-invalid" : "" }`}
                                onChange={handleLastName}
                            ></input>
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email ID</label>
                            <input
                                type='text'
                                placeholder='Enter your Email'
                                name='email'
                                value={email}
                                className={`form-control ${ errors.email ?  "is-invalid" : "" }`}
                                onChange={handleEmail}
                            ></input>
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveorUpdateStudent}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudentComponent
