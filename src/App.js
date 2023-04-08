import './index.css';
import Employees from './pages/Employees';
import Header from './components/Header';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Customers from './pages/Customer';

function App() {
  return (
    
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path = '/emp' element = {<Employees/>}/>
          <Route path = '/cus' element = {<Customers/>}/>


        </Routes>
      </Header>
    </BrowserRouter>

    
    );
}

export default App;
