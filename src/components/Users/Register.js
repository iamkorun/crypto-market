import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Sign_in-up.css";
import graph from "../../graph.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate() ;

  const data = {
    name,
    email,
    password,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:5000/user/register", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({ data }) => {
        if (data.error) {
          alert(data.message);
        } else {
          alert(data.message);
          navigate("/login",{ replace: false });
        }
      });
  };

  return (
    <div className="body font-link">
      <div className="body-left">
        <h1>Sign up to</h1>
        <h2>Money Management </h2>
        <h2>Crypto App</h2>
        <div>If you have an account </div> <br />
        <div>
          You can <Link to="/login">Login here !</Link>
        </div>
        <img src={graph} alt="" />
      </div>
      <div className="body-right-signup">
        <label>Sign up</label>
        <form onSubmit={handleSubmit}>
          <input
            className="put"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <br />
          <input
            className="put"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <br />
          <input
            className="put"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />
          <input className="smbut" type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default Register;
