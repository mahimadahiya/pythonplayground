import * as ACTION_TYPE from "./actionTypes";
import adminPanelApi from "../apis/adminPanel";

export const fetchComprehensionsList = (
  authToken,
  offset
) => async dispatch => {
  const response = await adminPanelApi(authToken).get(
    `/v1/admin/comprehensions?offset=${offset}`
  );
  console.log(response);
};
