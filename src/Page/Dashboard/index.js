import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import '../../App.css';

// import { employeesData } from '../../data';

function Dashboard() {

    const [employees, setEmployees] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    useEffect(()=>{
        console.log("use effect run");
        fetch('http://localhost:8000/employees')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setEmployees(data);
            console.log(data);
        })
    },[]);

    const handleEdit = (id) => {
        const [employee] = employees.filter(employee => employee.id === id);

        setSelectedEmployee(employee);
        setIsEditing(true);
    }

    // const handleDelete = (id) => {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, cancel!',
    //     }).then(result => {
    //         if (result.value) {
    //             const [employee] = employees.filter(employee => employee.id === id);

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Deleted!',
    //                 text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
    //                 showConfirmButton: false,
    //                 timer: 1500,
    //             });

    //             setEmployees(employees.filter(employee => employee.id !== id));
    //         }
    //     });
    // }


    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                const employeeD = employees.find(employee => employee.id === id);
                fetch('http://localhost:8000/employees/'+id,{
                    method: 'DELETE',
                })
                .then(res =>{
                    if(res.ok){
                        return res.json();
                    } else {
                        throw new Error('Error deleting');
                    }
                })
                .then(data => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: `${employeeD.firstName} ${employeeD.lastName}'s data has been deleted.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setEmployees(employees.filter(employee => employee.id !== id));
                });

                

                
            }
        });
    }

    return (
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && employees &&(
                <>
                    <Header
                        setIsAdding={setIsAdding}
                    />
                    <List
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    )
}

export default Dashboard;