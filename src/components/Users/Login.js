import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Sign_in-up.css";
import graph from "../../graph.png";
// import Ticker from "../api/Ticker";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const data = {
    email,
    password,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const data = new FormData(event.currentTarget);

    axios
      .post("http://localhost:5000/user/login", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({ data }) => {
        console.log(data)
        if (data.error) {
          alert(data.message);
        } else {
          alert("Login successfully");
          localStorage.setItem("access_token", data.token);
          localStorage.setItem("name", data.name);
          navigate("/me/wallet", { replace: false });
          window.location.reload();
        }
      });
  };

  return (
    <div className="body font-link">
      <div className="body-left">
        <h1>Sign in to</h1>
        <h2>Money Management </h2>
        <h2>Crypto App</h2>
        <div>If you don't have an account register</div> <br />
        <div>You can <Link to="/register">Register here !</Link></div>
        <img src={graph} alt="" />
      </div>
      <div className='body-right-signin'>
        <label>Sign in</label>
        <form onSubmit={handleSubmit}>
          <input className="put"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        
          <input className="put"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
       
          <input className="smbut" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
