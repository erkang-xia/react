import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { baseUrl } from "../shared";
import { LoginContext } from "../App";

export default function CustomerInfo() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

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
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"), //Make sure to add a space after "Bearer" in the Authorization header
      },
    })
      .then((response) => {
        if (response.status === 404) {
          // redirect to a 404 page
          navigate("/404");
        } else if (response.status === 401) {
          setLoggedIn(false);
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
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
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"), //Make sure to add a space after "Bearer" in the Authorization header
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (response.status === 401) {
          setLoggedIn(false);
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
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
    <div className="p-3">
      {" "}
      {customer ? (
        <div>
          <form
            className="w-full max-w-sm"
            id="customer"
            onSubmit={updateCustomer}
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label for="name">Name</label>
              </div>
              <div className="md:w-4/5">
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
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
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label for="industry">Industry</label>
              </div>
              <div className="md:w-4/5">
                <input
                  id="industry"
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
              </div>
            </div>
          </form>
          <div>
            {changed ? (
              <>
                <button
                  className="m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                  form="customer"
                >
                  Save
                </button>
                <button
                  className="m-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
                  onClick={(e) => {
                    setTempCustomer({ ...customer });
                    setChanged(false);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : null}
            {!changed ? (
              <button
                className="m-2 bg-slate-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
                onClick={(e) => {
                  const url = baseUrl + "api/customers/" + id;
                  fetch(url, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("access"), //Make sure to add a space after "Bearer" in the Authorization header
                    },
                  })
                    .then((response) => {
                      if (response.status === 401) {
                        setLoggedIn(false);
                        navigate("/login", {
                          state: {
                            previousUrl: location.pathname,
                          },
                        });
                      }
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
            ) : null}
          </div>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br />
      <Link
        className="no-underline m-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-4 rounded-full"
        to="/cus"
      >
        ← Go Back
      </Link>
    </div>
  );
}
