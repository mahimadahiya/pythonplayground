import axios from "axios";

const adminPanelApi = authToken => {
  axios.create({
    baseURL: "http://203.110.86.43:8892",
    headers: {
      key: "TcS99L07QkDezB5n4Qdw",
      Authorization: `Bearer ${authToken}`
    }
  });
};

export default adminPanelApi;
