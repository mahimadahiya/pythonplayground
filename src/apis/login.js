import axios from 'axios'

export default axios.create({
  baseURL: "https://services.iaugmentor.com",
  headers: {
    key: "TcS99L07QkDezB5n4Qdw",
  }
});