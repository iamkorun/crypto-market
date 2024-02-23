import axios from "axios";

export const fetchRanking = async () => {
  let response;
  try {
    const res = await axios.get(`http://localhost:5000/api/ranking`);
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
