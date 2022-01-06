import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//import { useHistory } from "react-router-dom";

const AddStudent = () => {

    const history=useNavigate();
    const [studentInput, setStudent] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setStudent({...studentInput, [e.target.fullname]: e.target.value })
    }

    const saveStudent = (e) => {
        e.preventDefault();
        
        const data = {
            fullname:studentInput.fullname,
            email:studentInput.email,
            phone:studentInput.phone,
            address:studentInput.address,
        }

        axios.post(`/api/add-student`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setStudent({
                    fullname: '',
                    email: '',
                    phone: '',
                    address: '',
                    error_list: [],
                });
               history.push('/students');
            }
            else if(res.data.status === 422)
            {
                setStudent({...studentInput, error_list: res.data.validate_err });
            }
        });
    }


    return (
        <div>
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Students 
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveStudent} >
                                    <div className="form-group mb-3">
                                        <label>Student FullName</label>
                                        <input type="text" name="fullname" onChange={handleInput} value={studentInput.fullname} className="form-control" />
                                        <span className="text-danger">{studentInput.error_list.fullname}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={studentInput.email}  className="form-control" />
                                        <span className="text-danger">{studentInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Phone</label>
                                        <input type="text" name="phone" onChange={handleInput} value={studentInput.phone}  className="form-control" />
                                        <span className="text-danger">{studentInput.error_list.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student address</label>
                                        <input type="text" name="address" onChange={handleInput} value={studentInput.address}  className="form-control" />
                                        <span className="text-danger">{studentInput.error_list.address}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Student</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStudent;
