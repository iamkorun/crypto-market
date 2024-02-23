import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Wallet.css";

const CreateWallet = () => {
  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const data = {
    name,
    balance,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/wallet/create", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(({ data }) => {
        if (data.error) {
          alert(data.message);
        } else {
          alert("Create wallet Successfully !");
          navigate("/me/wallet", { replace: false });
        }
      });
  };

  if (localStorage.getItem("access_token")) {
    // console.log(localStorage.getItem("access_token"));
    return (
      <div className="body font-link">
        <div className="body-create-wallet">
          <form onSubmit={handleSubmit}>
            <label>Wallet Name</label>
            <input
              className="put"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>Deposit</label>
            <input
              className="put"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              type="number"
              placeholder="Balance"
            />
            <input className="smbut" type="submit" value="Create" />
          </form>
        </div>
      </div>
    );
  }
  return <Navigate to="/login" replace />;
};

export default CreateWallet;
