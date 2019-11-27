import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

export const getTechnicalAssesmentList = async AuthToken => {
  const response = await adminPanelApi(AuthToken).get(
    "/v1/admin/technical/assessment/group/"
  );
  return response;
};

export const createNewTechnicalService = async (AuthToken, values) => {
  const response = await adminPanelApi(AuthToken).post(
    "/v1/admin/technical/assessment/group/",
    qs.stringify({
      fields: JSON.stringify(values)
    })
  );
  return response;
};
