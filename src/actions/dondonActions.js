import qs from "querystring";
import pyLearningApi from "../apis/pylearning";

export const dondonUpload = (authToken, formValues) => {
  pyLearningApi(authToken).post(
    "/game/dondon/upload",
    qs.stringify(formValues)
  );
};
