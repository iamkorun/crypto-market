import { Construction } from "@mui/icons-material";
import axios from "axios";

export const CoinList = async (vsc, page) => {
  let response;
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsc}&order=market_cap_desc&per_page=100&page=${page}&sparkline=true`
    );
    response = {
      result: true,
      data: res.data,
    };
    return response;
  } catch (e) {
    response = {
      result: false,
      message: e,
    };
  }
};

export const CoinSearch = async () => {
  let response;
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/search`
    );
    response = {
      result: true,
      data: res.data,
    };
    return response;
  } catch (e) {
    response = {
      result: false,
      message: e,
    };
  }
};

export const fetchTicker = async (ticker) => {
  let response;
  
  try {
    const res = await axios.post(`http://localhost:5000/api/ticker`, ticker, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    response = {
      result: true,
      data: res.data,
    };
    return response;
  } catch (e) {
    response = {
      error: true,
      message: e,
    };
  }
};

export const fetchMarkets = async () => {
  let response;
  try {
    const res = await axios.get(`http://localhost:5000/api/markets`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    response = {
      result: true,
      data: res.data,
    };
    return response;
  } catch (e) {
    response = {
      error: true,
      message: e,
    };
  }
};
