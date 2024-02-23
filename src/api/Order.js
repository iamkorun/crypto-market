import axios from "axios";

export const fetchPendingOrderById = async (id) => {
  let response;
  try {
    const res = await axios.get(`http://localhost:5000/order/pending/${id}`, {
      headers: {
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
      message: e.message,
    };
  }
};

export const CancelPendingOrder = async (id, ticker) => {
  let response;
  try {
    const data = {
      currentPrice: ticker,
    };
    const res = await axios.post(
      `http://localhost:5000/order/cancel/${id}`,
      data,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    response = {
      result: true,
      data: res.data,
    };
    return response;
  } catch (e) {
    response = {
      error: true,
      message: e.message,
    };
  }
};
