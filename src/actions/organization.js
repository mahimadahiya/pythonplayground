import adminPanelApi from "../apis/adminPanel";
import { FETCH_ORGANIZATION_MODULES } from "./actionTypes";
import qs from "querystring";

export const getOrganizationModules = (orgId, authToken) => async dispatch => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/list/organization/modules/",
    qs.stringify({ organization_id: orgId })
  );
  console.log("response", response);
  dispatch({ type: FETCH_ORGANIZATION_MODULES, payload: response.data });
};
