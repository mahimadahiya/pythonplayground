import adminPanelApi from "../apis/adminPanel";

export const getTechnicalAssesmentList = async AuthToken => {
  const response = await adminPanelApi(AuthToken).get(
    "/v1/admin/technical/assessment/group"
  );
  return response;
};
