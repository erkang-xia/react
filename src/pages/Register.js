import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

export default function Register() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.clear();
    setLoggedIn(false);
  });

  function register(e) {
    e.preventDefault();
    const url = baseUrl + "api/register/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setLoggedIn(true);
        navigate(
          location?.state?.previousUrl ? location.state.previousUrl : "/cus"
        );

        console.log(localStorage);
      });
  }
  return (
    <form className="w-full max-w-sm" id="register" onSubmit={register}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/5">
          <label for="email">Email</label>
        </div>
        <div className="md:w-4/5">
          <input
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/5">
          <label for="username">Username</label>
        </div>
        <div className="md:w-4/5">
          <input
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/5">
          <label for="password">Password</label>
        </div>
        <div className="md:w-4/5">
          <input
            id="password"
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        className="m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
        form="register"
      >
        Register
      </button>
    </form>
  );
}