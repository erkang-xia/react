import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useFetch(url, { method, headers, body } = {}) {
  //destructured to make it aobject, so we can pass the parameter in any order
  const [data, setData] = useState();
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  function request() {
    fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        setErr(e);
      });
  }

  function appendData(newData) {
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((d) => {
        const submitted = Object.values(d)[0];
        //grab the property without using the name
        const newState = { ...data };
        Object.values(newState)[0].push(submitted);
        setData(newState);
      })
      .catch((e) => {
        console.log(e);
        setErr(e);
      });
  }

  return { request, appendData, data, err };
}
