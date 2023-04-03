import './App.css';
import Employee from './components/Employee';
import { useState } from 'react';

function App() {
  const [role, setRole] = useState('dev');// it will take default value 'dev
   //[role is the name of the variable, setRole is the func we about to define]

  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ? 
          <>
          <input type = 'text' onChange = {
            (e)=>{
              console.log(e.target.value);
              setRole(e.target.value); //you don't assgin value directly to role, always use setRole

            }
          }
          />
            <Employee name = "erkang"role = "intern"/>
            <Employee name = "Abby" role = {role}/>
            <Employee name = "依然"/>
            <Employee name = "Caleb"/></> 
        :
          <p> You cannot see the showEmployees</p>}
    </div>
  );
}

export default App;
