import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddCustomer from "../components/AddCustomer";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";
import useFetch from "../hooks/UseFetch";

export default function Customers() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  //const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);
  function toggleShow() {
    setShow(!show);
  }
  const navigate = useNavigate();
  const location = useLocation();

  const url = baseUrl + "api/customers/";
  const {
    request,
    appendData,
    data: { customer } = {},
    err,
  } = useFetch(url, {
    //data: { customer } = {}  we take whats inside of data and name it to customer and give it a default value to {}, until the data is retrived
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"), //Make sure to add a space after "Bearer" in the Authorization header
    },
  });
  useEffect(() => {
    request();
  }, []);
  /*
  useEffect(() => {
    const url = baseUrl + "api/customers/";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"), //Make sure to add a space after "Bearer" in the Authorization header
      },
    })
      .then((response) => {
        console.log(localStorage.getItem("access"));
        console.log("Received response:", response);
        if (response.status === 401) {
          setLoggedIn(false);
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data);
        setCustomers(data.customer);
      });
  }, []);
  */
  /*
  function addCustomer(name, industry) {
    const data = { name: name, industry: industry };
    const url = baseUrl + "api/customers/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        toggleShow();
        setCustomers([...customers, data.customer]);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  */
  function addCustomer(name, industry) {
    appendData({ name: name, industry: industry });
    if (err) {
      toggleShow();
    }
  }
  return (
    <>
      <h1>Here are our Customers</h1>

      {customer
        ? customer.map((customer) => {
            console.log(customer);
            return (
              <div className="my-4" key={customer.id}>
                <Link
                  className="no-underline m-2 bg-purple-700 hover:bg-purple-500 text-white font-bold py-2.5 px-4 rounded-full"
                  to={"/cus/" + customer.id}
                >
                  {customer.name}
                </Link>
              </div>
            );
          })
        : null}
      <AddCustomer
        addCustomer={addCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}
