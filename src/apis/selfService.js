import axios from "axios";

const selfService = authToken => {
  return axios.create({
    baseURL: "https://selfservice-api.iaugmentor.com",
    headers: {
      key: "TcS99L07QkDezB5n4Qdw",
      Authorization: `Bearer ${authToken}`
    }
  });
};

export default selfService;
