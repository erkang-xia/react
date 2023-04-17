import "./index.css";
import Employees from "./pages/Employees";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "./pages/Customer";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import CustomerInfo from "./pages/CustomerInfo";
import Login from "./pages/login";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "./shared";
import Register from "./pages/Register";

export const LoginContext = createContext();
function App() {
  useEffect(() => {
    function refreshToken() {
      if (localStorage.refresh) {
        const url = baseUrl + "api/token/refresh/";
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.access = data.access;
            localStorage.refresh = data.refresh;
            setLoggedIn(true);
          });
      }
    }
    const minute = 1000 * 60;
    refreshToken();
    setInterval(refreshToken(), 3 * minute);
  }, []);
  //check local storage for access token
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }

  return (
    <LoginContext.Provider
      value={
        [loggedIn, changeLoggedIn]
        //we pass [loggedIn, changeLoggedIn] but the name is irrelavent, when we use this in
        //the other pages, we change name it it differently
      }
    >
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
