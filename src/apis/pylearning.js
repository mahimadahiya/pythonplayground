import axios from "axios";

const pyLearningApi = authToken => {
  return axios.create({
    baseURL: "https://pylearning-api.iaugmentor.com",
    headers: {
      key: "TcS99L07QkDezB5n4Qdw",
      Authorization: `Bearer ${authToken}`
    }
  });
};

export default pyLearningApi