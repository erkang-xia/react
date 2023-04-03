import './App.css';
import Employee from './components/Employee';

function App() {
  console.log("We are going to display the emplyee here");
  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ? 
          <><Employee /><Employee /><Employee /><Employee /></> 
        :
          <p> You cannot see the showEmployees</p>}
    </div>
  );
}

export default App;
