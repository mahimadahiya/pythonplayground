import adminPanelApi from "../apis/adminPanel";

export const fetchJargonList = async authToken => {
  const response = await adminPanelApi(authToken).get("/v1/admin/jargon/list");
  return response.data.result.jargon_details;
};
