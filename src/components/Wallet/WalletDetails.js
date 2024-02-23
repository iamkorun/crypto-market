import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScaleLoader from "react-spinners/ScaleLoader";
import Moment from "moment";

import dayjs from "dayjs";
import { fetchWalletById } from "../../api/Wallet";
import { formatCurrency } from "@coingecko/cryptoformat";
import Sidebar_wallet from "./Sidebar_wallet";
import { getFavCoins } from "../../api/userProfile";

import "./Wallet.css";
import "../Table.css";
// import jwt from 'jwt-decode'

const WalletDetails = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [coins, setCoins] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [orders, setOrders] = useState([]);
  const [pnl, setPNL] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFavCoins, setDataFavCoins] = useState([]);
  const [favCoins, setFavCoins] = useState([]);

  const navigate = useNavigate();

  const getCoins = async () => {
    const res = await fetchWalletById(params.id);
    if (res.data.error) {
      console.log("Please Choose Your Wallet");
      alert("Please Choose Your Wallet");
      navigate("/me/wallet", { replace: false });
    } else {
      setCoins(res.data.coins);
      setTotalBalance(res.data.totalBalance);
      setPNL(res.data.PNL);
      setBalance(res.data.balance);
      setName(res.data.name);
      // localStorage.setItem("wallet_name",res.data.name);
      setIsLoading(true);
    }
  };

  const getOrder = async () => {
    const res = await axios.get(`http://localhost:5000/order/${params.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    if (res.data.error) {
      console.log("Try to use trade feature");
    } else {
      setOrders(res.data);
    }
  };

  const getfavcoins = async () => {
    const res = await getFavCoins();
    if (res.data.error) {
      console.log(res.data.error);
    } else {
      setDataFavCoins(res.data);
      console.log(res.data);
    }
  };

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        getCoins();
        getOrder();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    dataFavCoins.map((item) => {
      setFavCoins(item.coins);
    });
  }, [dataFavCoins]);

  useEffect(() => {
    localStorage.setItem("wallet_id", params.id);
    getCoins();
    getOrder();
    getfavcoins();
  }, []);

  const Walletui = () => {
    return (
      <Container className="font-link">
        <Row style={{ marginBottom: "20px" }}>
          <Col lg="3">
            <div className="body-wallet">
              <div className="wallet">
                <h1>{name}</h1>
                {!isNaN(totalBalance) && (
                  <>
                    <p>
                      TotalBalance ≈ {formatCurrency(totalBalance, "USD", "en")}
                    </p>
                    <p>PNL {pnl.toFixed(2)} %</p>
                  </>
                )}
                {isNaN(totalBalance) && <p>TotalBalance ≈ --- $</p>}
                <p>Balance: {formatCurrency(balance, "USD", "en")}</p>
              </div>
            </div>
          </Col>
          <Col lg="3" style={{ paddingTop: "70px" }}>
            <Table id="content-table-wallet">
              <thead>
                <tr>
                  <th>Favorite Coins</th>
                </tr>
              </thead>
              <tbody>
                {favCoins.map((item) => (
                  <tr>
                    <td>
                      <Link to={`/trade/${item.name}`}>
                        <img
                          src={`https://s3-symbol-logo.tradingview.com/crypto/XTVC${
                            item.name.split("_")[0]
                          }.svg`}
                          style={{ paddingRight: "10px" }}
                        />
                        {item.name.split("_")[0]}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col lg="6" style={{ paddingTop: "70px" }}>
            <div style={{ float: "left" }}>
              <h5>Holdings</h5>
            </div>
            <Table id="content-table-wallet">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Current Price</th>
                  <th>Amount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((item) => (
                  <tr>
                    <td>
                      <Link to={`/trade/${item.name + "_USDT"}`}>
                        <img
                          src={`https://s3-symbol-logo.tradingview.com/crypto/XTVC${item.name}.svg`}
                          style={{ paddingRight: "10px" }}
                        />
                        {item.name}
                      </Link>
                    </td>
                    <td>{item.currentPrice}</td>
                    <td>{item.amount}</td>
                    <td>≈ {formatCurrency(item.total, "USD", "en")}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ float: "left" }}>
              <h5>Transaction</h5>
            </div>
            <div style={{ float: "right" }}>
              <Link
                className="typeLabel"
                to={`/me/transaction/${localStorage.getItem("wallet_id")}`}
              >
                View All
              </Link>
            </div>
            <Table id="content-table-order">
              <thead>
                <tr>
                  <th>Pair</th>
                  <th>Side</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Createtime</th>
                  <th>Status</th>
                </tr>
              </thead>
              {orders.map((item) => (
                <tbody>
                  <tr>
                    <td>
                      <Link to={`/trade/${item.pair.split("_")[0] + "_USDT"}`}>
                        <img
                          src={`https://s3-symbol-logo.tradingview.com/crypto/XTVC${
                            item.pair.split("_")[0]
                          }.svg`}
                          style={{ paddingRight: "10px" }}
                        />
                        {item.pair.split("_")[0]}/{item.pair.split("_")[1]}
                      </Link>
                    </td>
                    <td>
                      {item.type}/{item.side}
                    </td>
                    <td>
                      {
                        formatCurrency(
                          item.amount.$numberDecimal - item.fee.$numberDecimal,
                          "BTC",
                          "en"
                        ).split("₿")[1]
                      }
                    </td>
                    <td>
                      {
                        formatCurrency(
                          item.avgPrice.$numberDecimal,
                          "USD",
                          "en"
                        ).split("$")[1]
                      }
                    </td>
                    <td>
                      {formatCurrency(item.total.$numberDecimal, "USD", "en")}
                    </td>
                    <td>
                      {dayjs(item.createTime).format("MM/DD/YYYY HH:mm:ss")}
                      {/* {Moment(item.createTime).toLocaleString().split("GMT")[0]} */}
                    </td>
                    <td>{item.status}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Col>
        </Row>
      </Container>
    );
  };

  if (localStorage.getItem("access_token")) {
    // console.log(localStorage.getItem("access_token"));
    return (
      <>
        <Sidebar_wallet />
        {isLoading ? (
          <>
            <Walletui />
          </>
        ) : (
          <ScaleLoader id="spinner" color={"#4D47C3"} size={200} />
        )}
      </>
    );
  }
  return <Navigate to="/login" replace />;
};

export default WalletDetails;
