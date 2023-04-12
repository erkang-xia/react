import "./index.css";
import Employees from "./pages/Employees";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "./pages/Customer";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import CustomerInfo from "./pages/CustomerInfo";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/emp" element={<Employees />} />
          <Route path="/cus" element={<Customers />} />
          <Route path="/dic" element={<Dictionary />} />
          <Route path="/dfn/:search" element={<Definition />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cus/:id" element={<CustomerInfo />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
