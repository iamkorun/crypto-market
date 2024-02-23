import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScaleLoader from "react-spinners/ScaleLoader";
import Moment from "moment";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { formatCurrency } from "@coingecko/cryptoformat";
import Sidebar_wallet from "./Sidebar_wallet";
import { getFavCoins } from "../../api/userProfile";

import "./Wallet.css";
import "../Table.css";
// import jwt from 'jwt-decode'

const TransactionHistory = () => {
  const params = useParams();
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [asset, setAsset] = useState("");
  const [type, setType] = useState(0);
  const [side, setSide] = useState(0);
  const [status, setStatus] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
      setFiltered(res.data);
      setIsLoading(true);
    }
  };

  const filAsset = (data) => {
    return data.filter((item) =>
      item.pair.split("_")[0].toLowerCase().includes(asset.toLowerCase())
    );
  };

  const filType = (data) => {
    if (type != 0) {
      return data.filter((item) => item.type.toLowerCase().includes(type));
    } else {
      return data;
    }
  };

  const filSide = (data) => {
    if (side != 0) {
      return data.filter((item) => item.side.toLowerCase().includes(side));
    } else {
      return data;
    }
  };

  const filStatus = (data) => {
    if (status != 0) {
      return data.filter((item) => item.status.toLowerCase().includes(status));
    } else {
      return data;
    }
  };

  const fillDate = (data) => {
    dayjs.extend(isSameOrAfter);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(isBetween);
    if (startDate && !endDate) {
      return data.filter((item) =>
        dayjs(item.createTime).isSameOrAfter(startDate, "day")
      );
    }
    if (!startDate && endDate) {
      return data.filter((item) =>
        dayjs(item.createTime).isSameOrBefore(endDate, "day")
      );
    }
    if (startDate && endDate) {
      return data.filter((item) =>
        dayjs(item.createTime).isBetween(startDate, endDate, "day", "[]")
      );
    } else {
      return data;
    }
  };

  useEffect(() => {
    localStorage.setItem("wallet_id", params.id);
    getOrder();
  }, []);

  useEffect(() => {
    let result = orders;
    result = filAsset(result);
    result = filType(result);
    result = filSide(result);
    result = filStatus(result);
    result = fillDate(result);
    setFiltered(result);
  }, [asset, type, side, status, startDate, endDate]);

  if (localStorage.getItem("access_token")) {
    // console.log(localStorage.getItem("access_token"));
    return (
      <>
        <Sidebar_wallet />
        {isLoading ? (
          <>
            <Container className="font-link">
              <Row style={{ marginBottom: "10px", marginTop: "50px" }}>
                <div style={{ float: "left" }}>
                  <h3>Transaction History</h3>
                </div>
              </Row>
              <Row
                className="border-bottom"
                style={{ marginTop: "20px", paddingBottom: "20px" }}
              >
                <Col>
                  <Form.Label>Asset</Form.Label>
                  <Form.Control
                    placeholder="Asset"
                    onChange={(e) => setAsset(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Label>Type</Form.Label>
                  <Form.Select onChange={(e) => setType(e.target.value)}>
                    <option value="0">All</option>
                    <option value="limit">Limit</option>
                    <option value="market">Market</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Side</Form.Label>
                  <Form.Select onChange={(e) => setSide(e.target.value)}>
                    <option value="0">All</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Status</Form.Label>
                  <Form.Select onChange={(e) => setStatus(e.target.value)}>
                    <option value="0">All</option>
                    <option value="filled">Filled</option>
                    <option value="pending">Pending</option>
                    <option value="cancel">Cancel</option>
                  </Form.Select>
                </Col>

                <Col>
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table style={{ marginTop: "20px" }} id="content-table-order">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Asset</th>
                        <th>Type</th>
                        <th>Side</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {filtered.map((item) => (
                      <tbody>
                        <tr>
                          <td>
                            {dayjs(item.createTime).format(
                              "MM/DD/YYYY HH:mm:ss"
                            )}
                            {/* {Moment(item.createTime).toLocaleString().split("GMT")[0]} */}
                          </td>
                          <td>
                            <img
                              src={`https://s3-symbol-logo.tradingview.com/crypto/XTVC${
                                item.pair.split("_")[0]
                              }.svg`}
                              style={{ paddingRight: "10px" }}
                            />
                            {item.pair.split("_")[0]}
                          </td>
                          <td>{item.type}</td>
                          <td>{item.side}</td>
                          <td>
                            {
                              formatCurrency(
                                item.amount.$numberDecimal -
                                  item.fee.$numberDecimal,
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
                            {formatCurrency(
                              item.total.$numberDecimal,
                              "USD",
                              "en"
                            )}
                          </td>
                          <td>{item.status}</td>
                          {item.type == "limit" ? (
                            <td>
                              <Link style={{ color: "#6963d6" }} to={`/me/transaction/details/${item._id}`}>
                                <i
                                  id="actionIcon"
                                  class="fa-solid fa-shuffle"
                                ></i>
                              </Link>
                            </td>
                          ) : (
                            <td>-</td>
                          )}
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                </Col>
              </Row>
            </Container>
            {/* <TransactionUi /> */}
          </>
        ) : (
          <ScaleLoader id="spinner" color={"#4D47C3"} size={200} />
        )}
      </>
    );
  }
  return <Navigate to="/login" replace />;
};

export default TransactionHistory;
