import './index.css';
import Employees from './pages/Employees';
import Header from './components/Header';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Customers from './pages/Customer';
import Dictionary from './components/Dictionary';

function App() {
  return (
    
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path = '/emp' element = {<Employees/>}/>
          <Route path = '/cus' element = {<Customers/>}/>
          <Route path = '/dic' element = {<Dictionary/>}/>


        </Routes>
      </Header>
    </BrowserRouter>

    
    );
}

export default App;
