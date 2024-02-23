import axios from "axios";

export const fetchPnlById = async (id) => {
  let response;
  try {
    const res = await axios.get(`http://localhost:5000/comulative/${id}`, {
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
