import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const ViewStudent = () => {

    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    useEffect(() => {

        axios.get(`/api/students`).then(res=>{
            if(res.status === 200)
            {
                setStudents(res.data.students)
                setLoading(false);
            }
        });

    }, []);

    const deleteStudent = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-student/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Deleted!",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    if(loading)
    {
        return <h4 className="text-center">Loading Student Data...</h4>
    }
    else
    {
        var student_HTMLTABLE = "";
       
        student_HTMLTABLE = students.map( (item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.fullname}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>
                        <Link to={`edit-student/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Students Data
                                    <Link to={'/add-student'} className="btn btn-primary btn-sm float-end"> Add Student</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Fullname</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewStudent;
