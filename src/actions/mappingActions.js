import pyLearningApi from "../apis/pylearning";
import qs from "querystring";

export const mapModuleParameter = async (authToken, values) => {
  const response = await pyLearningApi(authToken).post(
    "/module/parameter/mapping/",
    qs.stringify(values)
  );
  return response;
};

export const mapOrganizationService = async (authToken, values) => {
  const response = await pyLearningApi(authToken).post(
    "/organization/service/mapping/",
    qs.stringify(values)
  );
  return response;
};

export const mapServiceModule = async (authToken, values) => {
  const response = await pyLearningApi(authToken).post(
    "/module/service/mapping/",
    qs.stringify(values)
  );
  return response;
};
