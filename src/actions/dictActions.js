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

export const fetchJargonDetails = async (authToken, id) => {
  const response = await adminPanelApi(authToken).get("/v1/admin/jargon/list", {
    params: { jargon_id: id }
  });
  return response.data;
};

export const editJargon = async (authToken, id, values) => {
  const response = await adminPanelApi(authToken).put(
    "/v1/admin/jargon/edit/" + id,
    qs.stringify(values)
  );
  return response;
};

export const mapJargon = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/jargon/map/",
    qs.stringify(values)
  );
  return response;
};

export const fetchFMCourses = async authToken => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/fm/course/list"
  );
  return response.data;
};

export const fetchJargonClusterList = async authToken => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/jargon/cluster/list"
  );
  return response.data;
};

export const createJargonCluster = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/jargon/cluster/create/",
    qs.stringify(values)
  );
  return response;
};

