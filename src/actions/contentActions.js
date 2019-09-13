import * as ACTION_TYPE from "./actionTypes";
import adminPanelApi from "../apis/adminPanel";

export const fetchContentComplexityLevel = authToken => async dispatch => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/contentcomplexitylevels"
  );
  dispatch({
    type: ACTION_TYPE.FETCH_CONTENT_COMPLEXITY_LEVEL,
    payload: response.data
  });
};
