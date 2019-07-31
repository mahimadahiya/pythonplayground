import pyLearningApi from "../apis/pylearning";
import qs from "querystring";

export const mapModuleParameter = async (authToken, values) => {
  const response = await pyLearningApi(authToken).post(
    "/module/parameter/mapping/",
    qs.stringify(values)
  );
  return response;
};
