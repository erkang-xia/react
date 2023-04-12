import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { baseUrl } from "../shared";

export default function CustomerInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!customer) return;
    // check if attribute is equal
    let equal = true;
    if (
      customer.name !== tempCustomer.name ||
      customer.industry !== tempCustomer.industry
    ) {
      equal = false;
    }
    if (equal) {
      setChanged(false);
    }
  });
  useEffect(() => {
    const url = baseUrl + "api/customers/" + id;
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          // redirect to a 404 page
          navigate("/404");
        }

        if (!response.ok) throw new Error("Something went wrong");

        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
        console.log(customer);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  function updateCustomer(e) {
    e.preventDefault();
    const url = baseUrl + "api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong");
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
        console.log(data);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <>
      {" "}
      {customer ? (
        <div>
          <form
            className="w-full max-w-sm"
            id="customer"
            onSubmit={updateCustomer}
          >
            <label for="name">Name</label>
            <input
              id="name"
              className="m-2 block"
              type="text"
              value={tempCustomer.name}
              onChange={(e) => {
                setChanged(true);
                setTempCustomer({
                  ...tempCustomer,
                  name: e.target.value,
                });
              }}
            />

            <label for="industry">Industry</label>
            <input
              id="industry"
              className="m-2 block"
              type="text"
              value={tempCustomer.industry}
              onChange={(e) => {
                setChanged(true);
                setTempCustomer({
                  ...tempCustomer,
                  industry: e.target.value,
                });
              }}
            />
          </form>
          {changed ? (
            <>
              <button className="m-2" form="customer">
                Save
              </button>
              <button
                className="m-2"
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : null}
          <button
            onClick={(e) => {
              const url = baseUrl + "api/customers/" + id;
              fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Something went wrong");
                  }
                  // assume things went well
                  navigate("/cus");
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br />
      <Link to="/cus">Go Back</Link>
    </>
  );
}
