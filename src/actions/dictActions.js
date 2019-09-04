import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

export const fetchJargonList = async authToken => {
  const response = await adminPanelApi(authToken).get("/v1/admin/jargon/list");
  return response.data.result.jargon_details;
};

export const fetchKeywordsList = async authToken => {
  const response = await adminPanelApi(authToken).get("/v1/admin/keyword/list");
  return response.data.result.keyword_details;
};

export const createJargon = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/jargon/create/",
    qs.stringify(values)
  );
  return response;
};

export const deleteJargon = async (authToken, id) => {
  const response = await adminPanelApi(authToken).delete(
    "/v1/admin/jargon/delete/" + id
  );
  return response;
};
