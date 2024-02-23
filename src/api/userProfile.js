import axios from "axios";

export const updateNameById = async (name) => {
  let response;
  try {
    const data = {
      name: name,
    };
    const res = await axios.patch(`http://localhost:5000/user/update`, data, {
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

export const updateToken = async (token) => {
  let response;
  try {
    const data = {
      linetoken: token,
    };
    const res = await axios.patch(`http://localhost:5000/user/update`, data, {
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

export const updateProfilePic = async (imgurl) => {
  let response;
  // console.log(imgurl);
  try {
    const data = {
      imgurl: imgurl,
    };
    const res = await axios.patch(`http://localhost:5000/user/updateprofilepic`, data, {
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

export const AddFavCoins = async (favcoins) => {
  let response;
  try {
    const data = {
      name: favcoins,
    };
    const res = await axios.patch(`http://localhost:5000/user/addfavcoins`, data, {
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

export const RemoveFavCoins = async (favcoins) => {
  let response;
  try {
    const data = {
      name: favcoins,
    };
    const res = await axios.patch(`http://localhost:5000/user/removefavcoins`, data, {
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

export const getUser = async () => {
  let response;
  try {
    const res = await axios.get(`http://localhost:5000/user/userName`, {
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

export const getAllUser = async () => {
  let response;
  try {
    const res = await axios.get(`http://localhost:5000/user/getalluser`, {
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

export const getFavCoins = async () => {
  let response;
  try {
    const res = await axios.get(`http://localhost:5000/user/getfavcoins`, {
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