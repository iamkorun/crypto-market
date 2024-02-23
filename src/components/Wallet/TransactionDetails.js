import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScaleLoader from "react-spinners/ScaleLoader";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { formatCurrency } from "@coingecko/cryptoformat";
import Sidebar_wallet from "./Sidebar_wallet";

const TransactionDetails = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [timeDuration, setTimeDuration] = useState({});
  const [transaction, setTransaction] = useState([]);

  const getDuration = (start, end) => {
    dayjs.extend(duration);
    const diff = dayjs(end).diff(start);
    const diffDuration = dayjs.duration(diff);
    const pastTime = {
      months: diffDuration.months(),
      days: diffDuration.days(),
      hours: diffDuration.hours(),
      minutes: diffDuration.minutes(),
      seconds: diffDuration.seconds(),
    };
    console.log(pastTime);
    setTimeDuration(pastTime);
  };

  const getTransaction = async () => {
    const res = await axios.get(
      `http://localhost:5000/transaction/${params.id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    // console.log(res);
    if (res.data.error) {
      console.log("Can't see details");
    } else {
      setTransaction(res.data);
      console.log(res.data);
      setIsLoading(true);
      getDuration(res.data[0].createTime, res.data[1].createTime);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  if (localStorage.getItem("access_token")) {
    // console.log(localStorage.getItem("access_token"));
    return (
      <>
        <Sidebar_wallet />
        {isLoading ? (
          <>
            <Container className="font-link">
              <Row
                style={{ marginBottom: "10px", marginTop: "50px" }}
                xs="auto"
              >
                <Col>
                  <Link
                    style={{ color: "#6963d6" }}
                    to={`/me/transaction/${localStorage.getItem("wallet_id")}`}
                  >
                    <h3>
                      <i class="fa-solid fa-chevron-left"></i>
                    </h3>
                  </Link>
                </Col>
                <Col>
                  <h3>Transaction Details</h3>
                </Col>
              </Row>
              {transaction.map((item, index) => (
                <Row>
                  {index != 0 ? (
                    <div className="centerArrow">
                      {/* <i class="fa-solid fa-arrow-down" id="arrowicon"></i>
                      {timeDuration.months} months {timeDuration.days} days {" "}
                      {timeDuration.hours} hr {timeDuration.minutes} min {" "}
                      {timeDuration.seconds} sec */}
                      <h3>
                        <i class="fa-solid fa-arrow-down"></i>
                      </h3>
                      {timeDuration.months} months {timeDuration.days} days{" "}
                      {timeDuration.hours} hr {timeDuration.minutes} min{" "}
                      {timeDuration.seconds} sec
                    </div>
                  ) : (
                    <></>
                  )}
                  <Table style={{ marginTop: "20px" }} id="content-table-order">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Asset</th>
                        <th>Type</th>
                        <th>Side</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>CurrentPrice</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {dayjs(item.createTime).format("MM/DD/YYYY HH:mm:ss")}
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
                        {item.currentPrice ? (
                          <td>
                            {
                              formatCurrency(
                                item.currentPrice.$numberDecimal,
                                "USD",
                                "en"
                              ).split("$")[1]
                            }
                          </td>
                        ) : (
                          <td>
                            {
                              formatCurrency(
                                item.avgPrice.$numberDecimal,
                                "USD",
                                "en"
                              ).split("$")[1]
                            }
                          </td>
                        )}

                        <td>
                          {formatCurrency(
                            item.total.$numberDecimal,
                            "USD",
                            "en"
                          )}
                        </td>
                        <td>{item.status}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
              ))}
            </Container>
          </>
        ) : (
          <ScaleLoader id="spinner" color={"#4D47C3"} size={200} />
        )}
      </>
    );
  }
  return <Navigate to="/login" replace />;
};

export default TransactionDetails;
