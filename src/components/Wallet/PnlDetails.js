import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { ButtonGroup, Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScaleLoader from "react-spinners/ScaleLoader";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Sidebar_wallet from "./Sidebar_wallet";
import { fetchWalletById } from "../../api/Wallet";
import { fetchPnlById } from "../../api/Comulative";
import { CoinsChart, ComulativeChart, DailyPnlChart } from "./ChartPnl";
import { formatCurrency } from "@coingecko/cryptoformat";
import "./Wallet.css";
import "../Table.css";
import { TablePnl } from "./TablePnl";

const PnlDetails = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [range, setRange] = useState(7);
  const [firstDeposit, setFirstDeposit] = useState(0);
  const [toDayPnl, setToDayPnl] = useState(0);
  const [pnlPercent, setPnlPercent] = useState(0);
  const [pnlDataset, setPnlDataset] = useState([]);
  const [coinsData, setCoinsData] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  const mapDailyPnl = (data, deposit) => {
    let count = 0;
    let pnlTemp = 0;
    let priceTemp = deposit;
    console.log(data);
    let pnlData = data.map((item) => {
      let subpnlPrice = item.totalBalance - priceTemp;
      priceTemp = item.totalBalance;
      let subpnlPercent = item.dailyPNL - pnlTemp;
      pnlTemp = item.dailyPNL;
      return {
        ...item,
        dailyProfitLoss: subpnlPrice,
        dailyProfitLossPercent: subpnlPercent,
      };
    });
    setPnlDataset(pnlData);
  };

  const calUsdPnl = (pnl, deposit) => {
    let pnlUsd = deposit * (pnl / 100);
    setToDayPnl(pnlUsd);
  };

  const fetchPnl = async () => {
    const res = await fetchPnlById(params.id);
    if (res.data.error) {
      alert(res.data.message);
    } else {
      // setPnlDataset(res.data.pnl);
      mapDailyPnl(res.data.pnl, res.data.firstDeposit.$numberDecimal);
      // console.log(res.data.pnl);
      // console.log(res.data.firstDeposit.$numberDecimal);
    }
  };

  const fetchCoin = async () => {
    const res = await fetchWalletById(params.id);
    setFirstDeposit(res.data.deposit);
    setCoinsData(res.data.coins);
    setTotalBalance(res.data.totalBalance);
    setIsLoading(true);
    setPnlPercent(res.data.PNL);
    calUsdPnl(res.data.PNL, res.data.deposit);
  };

  useEffect(() => {
    fetchPnl();
    fetchCoin();
  }, []);

  const PnlUi = () => {
    return (
      <Container className="font-link">
        <Row
          className="border-bottom"
          style={{ marginTop: "50px", paddingBottom: "50px" }}
        >
          <Col md="4">
            <div>
              <span style={{ fontSize: "20px" }}>Deposit</span>
              <OverlayTrigger
                key={"top"}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    = Your first deposit in this wallet
                  </Tooltip>
                }
              >
                <i
                  style={{ marginLeft: "10px" }}
                  class="fa-solid fa-circle-info"
                ></i>
              </OverlayTrigger>
            </div>
            <p>
              <h4>{formatCurrency(firstDeposit, "USD", "en")}</h4>
            </p>
          </Col>
          <Col md="4">
            <div>
              <span style={{ fontSize: "20px" }}>Estimated Balance</span>
              <OverlayTrigger
                key={"top"}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    = Estimated Balance asset in wallet
                  </Tooltip>
                }
              >
                <i
                  style={{ marginLeft: "10px" }}
                  class="fa-solid fa-circle-info"
                ></i>
              </OverlayTrigger>
            </div>
            <p>
              <h4>{formatCurrency(totalBalance, "USD", "en")}</h4>
            </p>
          </Col>
          <Col md="2">
            <div>
              <span style={{ fontSize: "20px" }}>PNL</span>
              <OverlayTrigger
                key={"top"}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    = Current profit and loss
                  </Tooltip>
                }
              >
                <i
                  style={{ marginLeft: "10px" }}
                  class="fa-solid fa-circle-info"
                ></i>
              </OverlayTrigger>
            </div>
            <font color={toDayPnl < 0 ? "#ED6572" : "#00c853"}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                {formatCurrency(toDayPnl, "USD", "en")}
              </span>
              <p>{parseFloat(pnlPercent).toFixed(2)} %</p>
            </font>
          </Col>
        </Row>
        <Row>
          <ButtonGroup style={{marginTop:"10px"}}>
            <button
              className={range === 7 ? "typeLabelChoosed" : "typeLabel"}
              onClick={() => {
                setRange(7);
              }}
            >
              7 Days
            </button>
            <button
              className={range === 30 ? "typeLabelChoosed" : "typeLabel"}
              onClick={() => {
                setRange(30);
              }}
            >
              30 Days
            </button>
          </ButtonGroup>
        </Row>
        <Row style={{ marginTop: "50px" }}>
          <Col md="7">
            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontSize: "20px" }}>Daily PNL</span>
              <OverlayTrigger
                key={"top"}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    = Daily final profit and loss asset in wallet
                  </Tooltip>
                }
              >
                <i
                  style={{ marginLeft: "10px" }}
                  class="fa-solid fa-circle-info"
                ></i>
              </OverlayTrigger>
            </div>
            <DailyPnlChart pnl={pnlDataset} deposit={firstDeposit} range={range}/>
          </Col>
          <Col md="1"></Col>
          <Col md="4">
            <div>
              <span style={{ fontSize: "20px" }}>Asset Allocation</span>
              <OverlayTrigger
                key={"top"}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    = The display of each coins in wallet
                  </Tooltip>
                }
              >
                <i
                  style={{ marginLeft: "10px" }}
                  class="fa-solid fa-circle-info"
                ></i>
              </OverlayTrigger>
            </div>
            <CoinsChart coinsData={coinsData} totalBalance={totalBalance}/>
          </Col>
        </Row>
        <Row style={{ marginTop: "50px" }}>
          <Col md="12">
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontSize: "20px" }}>Comulative Balance</span>
              <OverlayTrigger
                key={"top"}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    = Cumulative totalbalance in wallet all the time
                  </Tooltip>
                }
              >
                <i
                  style={{ marginLeft: "10px" }}
                  class="fa-solid fa-circle-info"
                ></i>
              </OverlayTrigger>
            </div>
            <ComulativeChart pnl={pnlDataset} deposit={firstDeposit} range={range}/>
          </Col>
        </Row>
        <Row style={{ marginTop: "50px" }}>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Comulative Balance</th>
                  <th>Daily Profit and Loss</th>
                  <th>Comulative Profit and Loss</th>
                  <th>Daily Profit and Loss %</th>
                  <th>Comulative Profit and Loss %</th>
                </tr>
              </thead>
              {pnlDataset.slice(-range).map((item) => (
                <TablePnl data={item} />
              ))}
            </Table>
          </Col>
        </Row>
      </Container>
    );
  };

  if (localStorage.getItem("access_token")) {
    return (
      <>
        <Sidebar_wallet />
        {isLoading ? (
          <>
            <PnlUi />
          </>
        ) : (
          <ScaleLoader id="spinner" color={"#4D47C3"} size={200} />
        )}
      </>
    );
  }
  return <Navigate to="/login" replace />;
};

export default PnlDetails;
