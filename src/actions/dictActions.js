import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";
import adminUpload from "../apis/adminUpload";

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

export const mapKeyword = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/keyword/map/",
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

export const createKeyword = async (authToken, file, values) => {
  let formData = new FormData();
  formData.append("media_file", file);
  formData.append("name", values.name);
  formData.append("description", values.description);
  formData.append("media_type", values.media_type);
  const response = await adminUpload(authToken).post(
    "/v1/admin/keyword/create/",
    formData
  );
  return response;
};
