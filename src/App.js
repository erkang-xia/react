import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [role, setRole] = useState('dev');// it will take default value 'dev
   //[role is the name of the variable, setRole is the func we about to define]
  const [employees, setEmployees] = useState(
    [
      {
        name : "Caleb", 
        role : "Developer", 
        img: "https://images.pexels.com/photos/16076799/pexels-photo-16076799.jpeg"
      },
      {
        name : "Sam", 
        role : "Developer", 
        img: "https://images.pexels.com/photos/262391/pexels-photo-262391.jpeg"
      },
      {
        name : "Andy", 
        role : "Manager", 
        img: "https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg"
      },
      {
        name : "Sal", 
        role : "UI designer ", 
        img: "https://images.pexels.com/photos/1164674/pexels-photo-1164674.jpeg"
      },
      {
        name : "Kim", 
        role : "Developer", 
        img: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg"
      },
      {
        name : "Caleb", 
        role : "Developer", 
        img: "https://images.pexels.com/photos/16076799/pexels-photo-16076799.jpeg"
      }

    ]
  )

  const showEmployees = true;
  return (
    <div className="App justify-center">
      {showEmployees ? 
          <>
          <input type = 'text' onChange = {
            (e)=>{
              console.log(e.target.value);
              setRole(e.target.value); //you don't assgin value directly to role, always use setRole

            }
          }
          />
          <div className  = "flex flex-wrap">
            {employees.map((employee)=>{
              return (
              <Employee 

              key = {uuidv4()} //key is a reserved key word 

              name={employee.name} 
              role = {employee.role} 
              img = {employee.img}/>
              );

            } )}
          </div>
          </> 
            
        :
          (<p> You cannot see the showEmployees</p>)}
    </div>
  );
}

export default App;
