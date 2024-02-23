import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navigate } from "react-router-dom";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import { fetchTicker } from "../../api/Coins";
import ScaleLoader from "react-spinners/ScaleLoader";

// import TradingViewWidget from "react-tradingview-widget";
import { AdvancedChart } from "react-tradingview-embed";
import { LimitBuy, MarketBuy } from "./Buy";
import { LimitSell, MarketSell } from "./Sell";
import { OpenOrder, OrderHistory } from "./Order";
import { WalletAssets } from "./Wallet";
import { fetchPendingOrderById, CancelPendingOrder } from "../../api/Order";
import { Button, Table } from "react-bootstrap";
import {
  AddFavCoins,
  RemoveFavCoins,
  getFavCoins,
} from "../../api/userProfile";
import { ConfirmModal } from "../Modal";

import "./Trade.css";
import "../Table.css";

const Trade = () => {
  const params = useParams();
  let symbol = params.pair.split("_")[0];

  const [limitBuy, setLimitBuy] = useState(true);
  const [limitSell, setLimitSell] = useState(false);
  const [marketBuy, setMarketBuy] = useState(false);
  const [marketSell, setMarketSell] = useState(false);
  const [openOrderState, setOpenOrderState] = useState(true);
  const [historyOrderState, setHistoryOrderState] = useState(false);
  const [stlBuy, setStlBuy] = useState(false);
  const [stlSell, setStlSell] = useState(false);

  const [orders, setOrders] = useState([]);
  const [pendingOrder, setPendingOrder] = useState([]);
  const [price, setPrice] = useState(0);
  const [ticker, setTicker] = useState(0);
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [coinBalance, setCoinBalance] = useState(0);
  const [walletCoinBalance, setWalletCoinBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [side, setSide] = useState("buy");
  const [takeProfit, setTP] = useState();
  const [stopLoss, setSL] = useState();
  const [type, setType] = useState("limit");
  const [Chart, setChart] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [orderStateValue, setOrderStateValue] = useState("openOrder");
  const [favcoins, setFavCoins] = useState("");
  const [dataFavCoins, setDataFavCoins] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalTitle, setConfirmModalTitle] = useState("");
  const [confirmModalMessage, setConfirmModalMessage] = useState("");

  const navigate = useNavigate();

  const buyData = {
    wallet_id: localStorage.getItem("wallet_id"),
    pair: params.pair,
    type: type,
    side: side,
    amount,
    avgPrice: price,
    fee,
    total,
    takeProfit,
    stopLoss,
  };

  const sellData = {
    wallet_id: localStorage.getItem("wallet_id"),
    pair: params.pair,
    type: type,
    side: side,
    amount,
    avgPrice: price,
    currentPrice: ticker,
    fee,
    total,
  };

  const handleSideChange = (event, value) => {
    if (value != null) {
      setSide(value);
    }
  };

  const valueLimitBuyCal = (value) => {
    let coinAmount = (balance * value) / 100 / price;
    let fee = coinAmount / 1000;
    let total = price * coinAmount;
    setType(type);
    setAmount(coinAmount);
    setFee(fee);
    setTotal(total);
    return `${value}`;
  };

  const valueLimitSellCal = (value) => {
    let coinAmount = (coinBalance / 100) * value;
    let fee = coinAmount / 1000;
    let total = price * coinAmount;
    setType(type);
    setAmount(coinAmount);
    setFee(fee);
    setTotal(total);
    return `${value}`;
  };

  const valueMarketBuyCal = (value) => {
    let coinAmount = (balance * value) / 100 / ticker;
    let fee = coinAmount / 1000;
    let total = ticker * coinAmount;
    setPrice(ticker);
    setType(type);
    setAmount(coinAmount);
    setFee(fee);
    setTotal(total);
    return `${value}`;
  };

  const valueMarketSellCal = (value) => {
    let coinAmount = (coinBalance / 100) * value;
    let fee = coinAmount / 1000;
    let total = ticker * coinAmount;
    setPrice(ticker);
    setType(type);
    setAmount(coinAmount);
    setFee(fee);
    setTotal(total);
    return `${value}`;
  };

  const handleFocusPrice = (event) => {
    setPrice(event.target.value);
  };

  const handleInputPrice = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (total >= 10) {
      await axios
        .post(`http://localhost:5000/order/${type}`, sellData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(({ data }) => {
          if (data.error) {
            alert(data.message);
          } else {
            alert("Order Successfully !");
            getWallet();
            getPendingOrder();
          }
        });
    } else {
      alert("minimum 10$");
    }
  };

  const handleEditLimitOrder = async () => {};

  const handleCancelLimitOrder = async (event) => {
    // console.log(event._id)
    const res = await CancelPendingOrder(event._id, ticker);
    if (res.data.error) {
      alert(res.data.message);
    } else {
      getPendingOrder();
      getWallet();
    }
  };

  const handlePairChange = async (event) => {
    if (event.pair != params.pair) {
      navigate(`/trade/${event.pair}`, { replace: false });
      window.location.reload();
    }
  };

  const getWallet = async () => {
    const res = await axios.get(
      `http://localhost:5000/wallet/${localStorage.getItem("wallet_id")}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    if (res.data.error) {
      console.log("Please Choose Your Wallet");
    } else {
      const hasWalletCoin = await res.data.coins.find(({ name }) => {
        return name === params.pair.split("_")[0];
      });
      const hasStoreCoin = await res.data.storeCoins.find(({ name }) => {
        return name === params.pair.split("_")[0];
      });
      if (hasStoreCoin) {
        // console.log(hascoin);
        setWalletCoinBalance(hasWalletCoin.amount);
        setCoinBalance(hasStoreCoin.amount);
      } else {
        setWalletCoinBalance(0);
        setCoinBalance(0);
      }
      setWalletBalance(res.data.balance.$numberDecimal);
      setBalance(res.data.storeBalance.$numberDecimal);
    }
  };

  const getPendingOrder = async () => {
    const res = await fetchPendingOrderById(localStorage.getItem("wallet_id"));
    if (res.data.error) {
      alert(res.data.message);
    } else {
      // console.log(res.data);
      setPendingOrder(res.data);
    }
  };

  const getOrder = async () => {
    const res = await axios.get(
      `http://localhost:5000/order/${localStorage.getItem("wallet_id")}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    if (res.data.error) {
      console.log("Try to use trade feature");
    } else {
      setOrders(res.data);
      // console.log(res.data);
    }
  };

  const getTicker = async () => {
    const ticker = {
      ticker: params.pair,
    };
    const res = await fetchTicker(ticker);
    if (res.data.error) {
      // console.log("Fetch Error !");
    } else {
      // console.log(res.data.info.lastPrice);
      setTicker(res.data.info.lastPrice);
      setIsLoading(true);
    }
  };

  const marks = [
    {
      value: 0,
    },
    {
      value: 25,
    },
    {
      value: 50,
    },
    {
      value: 75,
    },
    {
      value: 100,
    },
  ];

  const ConditionType = () => {
    if (side === "buy") {
      if (type === "limit") {
        setLimitBuy(true);
        setLimitSell(false);
        setMarketBuy(false);
        setMarketSell(false);
        setStlBuy(false);
        setStlSell(false);
      }
      if (type === "market") {
        setLimitBuy(false);
        setLimitSell(false);
        setMarketBuy(true);
        setMarketSell(false);
        setStlBuy(false);
        setStlSell(false);
      }
      if (type === "stl") {
        setLimitBuy(false);
        setLimitSell(false);
        setMarketBuy(false);
        setMarketSell(false);
        setStlBuy(true);
        setStlSell(false);
      }
    }
    if (side === "sell") {
      if (type === "limit") {
        setLimitBuy(false);
        setLimitSell(true);
        setMarketBuy(false);
        setMarketSell(false);
        setStlBuy(false);
        setStlSell(false);
      }
      if (type === "market") {
        setLimitBuy(false);
        setLimitSell(false);
        setMarketBuy(false);
        setMarketSell(true);
        setStlBuy(false);
        setStlSell(false);
      }
      if (type === "stl") {
        setLimitBuy(false);
        setLimitSell(false);
        setMarketBuy(false);
        setMarketSell(false);
        setStlBuy(false);
        setStlSell(true);
      }
    }
  };

  const ConditionOrderState = () => {
    if (orderStateValue === "openOrder") {
      setOpenOrderState(true);
      setHistoryOrderState(false);
    }

    if (orderStateValue === "historyOrder") {
      setOpenOrderState(false);
      setHistoryOrderState(true);
    }
  };

  const handleRemove = () => {
    setConfirmModalTitle("Are you sure ?");
    setConfirmModalMessage("Are you sure want to remove ?");
    setShowConfirmModal(true);
  };

  const onCancel = () => {
    setShowConfirmModal(false);
  };

  const addFav = async () => {
    setFavCoins(params.pair);
    const res = await AddFavCoins(params.pair);
    if (res.data.error) {
      console.log(res.data.message);
      alert(res.data.message);
    } else {
      alert("Add " + params.pair + " to Favorite");
    }
  };

  const removeFav = async () => {
    setFavCoins("");
    setShowConfirmModal(false);
    const res = await RemoveFavCoins(params.pair);
    if (res.data.error) {
      console.log(res.data.message);
      alert(res.data.message);
    } else {
      alert("Remove " + params.pair + " From Favorite");
    }
  };

  const getfavcoins = async () => {
    const res = await getFavCoins();
    setDataFavCoins(res.data);
  };

  useEffect(() => {
    getfavcoins();
  }, []);

  useEffect(() => {
    dataFavCoins.map((item) => {
      const checkfav = item.coins;
      checkfav.map((item2) => {
        if (params.pair === item2.name) {
          setFavCoins(params.pair);
        }
      });
    });
  }, [dataFavCoins]);

  useEffect(() => {
    const interval = setInterval(() => {
      getTicker();
      getPendingOrder();
    }, 1000);
    return () => clearInterval(interval);
  }, [ticker]);

  useEffect(() => {
    getTicker();
    getPendingOrder();
  }, []);

  useEffect(() => {
    getWallet();
    getOrder();
  }, [balance, pendingOrder]);

  useEffect(() => {
    ConditionType();
    // console.log(type);
  }, [type, side]);

  useEffect(() => {
    ConditionOrderState();
  }, [orderStateValue]);

  useEffect(() => {
    const fetchChart = () => {
      const symbol = params.pair.split("_")[0] + params.pair.split("_")[1];
      return (
        <>
          <AdvancedChart
            widgetProps={{
              theme: "dark",
              symbol: symbol,
              style: "1",
              range: "YTD",
              timezone: "Asia/Bangkok",
              height: "680",
              studies: ["StochasticRSI@tv-basicstudies"],
            }}
          />
          {/* <TradingViewWidget symbol={symbol} timezone="Asia/Bangkok" autosize /> */}
        </>
      );
    };

    setChart(fetchChart);
  }, []);

  const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      fontWeight: "bold",
      backgroundColor: selectedColor,
    },
  }));

  const SelectTypeUI = () => {
    return (
      <>
        <ToggleButtonGroup
          className="buttongroup"
          value={side}
          exclusive
          onChange={handleSideChange}
          aria-label="Platform"
        >
          <ToggleButton
            className="buyselected"
            value="buy"
            selectedColor="#00c853"
          >
            BUY
          </ToggleButton>
          <ToggleButton
            className="sellselected"
            value="sell"
            selectedColor="#ff1744"
          >
            SELL
          </ToggleButton>
        </ToggleButtonGroup>
        <hr />
        <Row xs="auto" id="type">
          <Col>
            <button
              className={type === "limit" ? "typeLabelChoosed" : "typeLabel"}
              onClick={() => {
                setType("limit");
              }}
            >
              Limit
            </button>
          </Col>
          <Col>
            <button
              className={type === "market" ? "typeLabelChoosed" : "typeLabel"}
              onClick={() => {
                setType("market");
              }}
            >
              Market
            </button>
          </Col>
          {/* <Col>
            <button
              className={type === "stl" ? "typeLabelChoosed" : "typeLabel"}
              onClick={() => {
                setType("stl");
              }}
            >
              Stop-limit
            </button>
          </Col> */}
        </Row>
        <hr />
      </>
    );
  };

  const SelectOrderStateUI = () => {
    return (
      <Row xs="auto">
        <Col>
          <button
            className={
              orderStateValue === "openOrder" ? "typeLabelChoosed" : "typeLabel"
            }
            onClick={() => {
              setOrderStateValue("openOrder");
            }}
          >
            Open Order
          </button>
        </Col>
        <Col>
          <button
            className={
              orderStateValue === "historyOrder"
                ? "typeLabelChoosed"
                : "typeLabel"
            }
            onClick={() => {
              setOrderStateValue("historyOrder");
            }}
          >
            Order History
          </button>
        </Col>
      </Row>
    );
  };

  if (localStorage.getItem("access_token")) {
    return (
      <>
        {isLoading ? (
          <>
            <Container style={{ padding: 20, marginTop: 20 }} fluid>
              <Row>
                <Col id="favCoins">
                  {params.pair}
                  {params.pair !== favcoins ? (
                    <button id="butAddFav" onClick={addFav}>
                      Add to favotite
                    </button>
                  ) : (
                    <button id="butRemoveFav" onClick={handleRemove}>
                      Remove from favorite
                    </button>
                  )}
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col style={{ height: 680 }} md="8">
                  {Chart}
                </Col>
                <Col
                  className="border"
                  md="4"
                  style={{ marginLeft: 20, width: 350, padding: 20 }}
                >
                  <SelectTypeUI />
                  <Box className="ProcessBox" sx={{ width: 300 }}>
                    {limitBuy && (
                      <LimitBuy
                        pair={params.pair}
                        ticker={ticker}
                        balance={balance}
                        onInput={handleInputPrice}
                        onFocus={handleFocusPrice}
                        onSubmit={handleSubmit}
                        valuetext={valueLimitBuyCal}
                        marks={marks}
                        amount={amount}
                        symbol={symbol}
                        total={total}
                      />
                    )}
                    {limitSell && (
                      <LimitSell
                        pair={params.pair}
                        ticker={ticker}
                        coinBalance={coinBalance}
                        onInput={handleInputPrice}
                        onFocus={handleFocusPrice}
                        onSubmit={handleSubmit}
                        valuetext={valueLimitSellCal}
                        marks={marks}
                        amount={amount}
                        symbol={symbol}
                        total={total}
                      />
                    )}
                    {marketBuy && (
                      <MarketBuy
                        pair={params.pair}
                        ticker={ticker}
                        balance={balance}
                        onSubmit={handleSubmit}
                        valuetext={valueMarketBuyCal}
                        marks={marks}
                        amount={amount}
                        symbol={symbol}
                        total={total}
                      />
                    )}
                    {marketSell && (
                      <MarketSell
                        pair={params.pair}
                        ticker={ticker}
                        coinBalance={coinBalance}
                        onSubmit={handleSubmit}
                        valuetext={valueMarketSellCal}
                        marks={marks}
                        amount={amount}
                        symbol={symbol}
                        total={total}
                      />
                    )}
                  </Box>
                </Col>
              </Row>
              <Row
                className="justify-content-md-center"
                style={{ paddingTop: 20 }}
              >
                <Col className="border-end" style={{ height: 300 }} md="8">
                  <SelectOrderStateUI />
                  {openOrderState && (
                    <Table id="content-table-trade">
                      <thead>
                        <tr>
                          <th>Pair</th>
                          <th>Type</th>
                          <th>Side</th>
                          <th>Amount</th>
                          <th>Trigger</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {pendingOrder.map((item) => (
                        <>
                          {item.pair == params.pair && (
                            <OpenOrder
                              key={item._id}
                              data={item}
                              onEdit={handleEditLimitOrder}
                              onDelete={handleCancelLimitOrder}
                              onPair={handlePairChange}
                            />
                          )}
                        </>
                      ))}
                    </Table>
                  )}
                  {historyOrderState && (
                    <Table id="content-table-trade">
                      <thead>
                        <tr>
                          <th>Pair</th>
                          <th>Type</th>
                          <th>Side</th>
                          <th>Price</th>
                          <th>Amount</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      {orders.map(
                        (item) =>
                          item.pair === params.pair && (
                            <OrderHistory key={item._id} data={item} />
                          )
                      )}
                    </Table>
                  )}
                </Col>
                <Col style={{ height: 300 }} md="auto">
                  <WalletAssets
                    inSpotBalance={balance}
                    inSpotCoin={coinBalance}
                    balance={walletBalance}
                    coin={walletCoinBalance}
                    symbol={params.pair.split("_")[0]}
                  />
                </Col>
              </Row>
            </Container>
            <ConfirmModal
              show={showConfirmModal}
              title={confirmModalTitle}
              message={confirmModalMessage}
              onConfirm={removeFav}
              onCancel={onCancel}
            />
          </>
        ) : (
          <ScaleLoader id="spinner" color={"#4D47C3"} size={200} />
        )}
      </>
    );
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Trade;
