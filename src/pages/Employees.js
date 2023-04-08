import '../index.css';
import Employee from '../components/Employee';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import AddEmployee from '../components/AddEmployee';
import EditEmployee from '../components/EditEmployee';

function Employees() {
  //const [role, setRole] = useState('dev');// it will take default value 'dev
   //[role is the name of the variable, setRole is the func we about to define]
  const [employees, setEmployees] = useState(
    [
      {
        id : 1,
        name : "Caleb", 
        role : "Developer", 
        img: "https://images.pexels.com/photos/16076799/pexels-photo-16076799.jpeg"
      },
      {
        id : 2,
        name : "Sam", 
        role : "Developer", 
        img: "https://images.pexels.com/photos/262391/pexels-photo-262391.jpeg"
      },
      {
        id : 3,
        name : "Andy", 
        role : "Manager", 
        img: "https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg"
      },
      {
        id : 4,
        name : "Sal", 
        role : "UI designer ", 
        img: "https://images.pexels.com/photos/1164674/pexels-photo-1164674.jpeg"
      },
      {
        id : 5,
        name : "Kim", 
        role : "Developer", 
        img: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg"
      },
      {
        id : 6,
        name : "Caleb", 
        role : "Developer", 
        img: "https://images.pexels.com/photos/16076799/pexels-photo-16076799.jpeg"
      }

    ]
  )

  function updateEmployee(id, newName, newRole){
    const updateEmployees = employees.map((employee)=>{
      if(id === employee.id){
        return{...employee,name:newName, role:newRole} //spreading, will expan all the obj attributes

      }

      return employee;
    });
    setEmployees(updateEmployees);
  }

  function addEmployee(newName, newRole, newImg){
    const newEmployee = {
      id: uuidv4(),
      name: newName,
      role: newRole,
      img: newImg,
    };

    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);


  }

  const showEmployees = true;
  return (
    <div>
      {showEmployees ? 
          <>
          {/*
            <input type = 'text' onChange = {
            (e)=>{
              //console.log(e.target.value);
              setRole(e.target.value); //you don't assgin value directly to role, always use setRole

            }
          }
          />
        */}
          <div className  = "justify-center flex flex-wrap">
            {employees.map((employee)=>{
              //phase2 we want to create an editEmployee components inside the App.js to pass down to employee
              const editEmployee = 
              <EditEmployee 
                id = {employee.id}
                name = {employee.name} 
                role = {employee.role} 
                updateEmployee = {updateEmployee}
              />
              return (
              <Employee                
              key = {employee.id} //key is a reserved key word 
              id = {employee.id}
              name={employee.name} 
              role = {employee.role} 
              img = {employee.img}
              editEmployee = {editEmployee} //phase 2
              //updateEmployee = {updateEmployee} //pass by data 
              
              />
              
              );

            } )}
          </div>

          <AddEmployee
          addEmployee={addEmployee}
          />
          </> 
            
        :
          (<p> You cannot see the showEmployees</p>)}
    </div>
  );
}

export default Employees;
