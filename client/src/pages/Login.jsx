import React, { FormEvent, useState } from "react";
import { useAppContext } from "../context/appContext";
import { redirect } from "react-router-dom";

const Login = () => {

    //function to send login request
  const login = async (loginData) => {
    try {
      const response = await fetch("/login", loginData);

      const { userId, email, userName, token } = response.data;

      const user = {
        userId,
        email,
        name: userName,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login({ email, password })) {
      redirect("/home");
    } else {
      alert("login failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>Login</div>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
