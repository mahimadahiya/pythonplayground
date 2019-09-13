import axios from "axios";

const adminPanelApi = authToken => {
  return axios.create({
    baseURL: "https://learning-new.iaugmentor.com",
    headers: {
      key: "TcS99L07QkDezB5n4Qdw",
      Authorization: `Bearer ${authToken}`
    }
  });
};

export default adminPanelApi;
