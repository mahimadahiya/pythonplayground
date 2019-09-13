import Axios from "axios";

const adminUpload = authToken =>
  Axios.create({
    baseURL: "https://learning-new.iaugmentor.com",
    headers: {
      key: "TcS99L07QkDezB5n4Qdw",
      Authorization: `Bearer ${authToken}`,
      "content-type": "multipart/form-data"
    }
  });

export default adminUpload;
