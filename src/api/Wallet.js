import axios from "axios";

export const fetchWalletById = async (id) => {
  let response;
  try {
    const res = await axios.get(`http://localhost:5000/wallet/details/${id}`, {
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
      message: e,
    };
  }
};

export const fetchAllWallet = async () => {
  let response;
  try {
    const res = await axios.get(`http://localhost:5000/wallet/allwallet`, {
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
      message: e,
    };
  }
};

export const fetchListWallet = async () => {
  let response;
  try {
    const res = await axios.get(`http://localhost:5000/wallet/list/details`, {
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
      message: e,
    };
  }
};



export const deletWalletById = async (id) => {
  let response;
  try {
    const res = await axios.delete(`http://localhost:5000/wallet/${id}`, {
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
      message: e,
    };
  }
};

export const updateWalletById = async (name, id) => {
  let response;
  try {
    const data = {
      name: name,
    };
    const res = await axios.patch(`http://localhost:5000/wallet/${id}`, data, {
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
