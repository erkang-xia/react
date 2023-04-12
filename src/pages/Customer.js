import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCustomer from "../components/AddCustomer";
import { baseUrl } from "../shared";

export default function Customers() {
  const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);
  function toggleShow() {
    setShow(!show);
  }
  useEffect(() => {
    console.log("Fetching");
    fetch("http://127.0.0.1:8000/api/customers/")
      .then((response) => {
        console.log("Received response:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data);
        setCustomers(data.customer);
      });
  }, []);

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
  return (
    <>
      <h1>Here are our Customers</h1>
      <ul>
        {customers
          ? customers.map((customer) => {
              return (
                <li key={customer.id}>
                  <Link to={"/cus/" + customer.id}>{customer.name}</Link>
                </li>
              );
            })
          : null}
      </ul>
      <AddCustomer
        addCustomer={addCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}
