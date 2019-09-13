import adminPanelApi from "../apis/adminPanel";
import * as ACTION_TYPE from "./actionTypes";

export const fetchRegions = authToken => async dispatch => {
  const response = await adminPanelApi(authToken).get("/v1/admin/regions");
  dispatch({
    type: ACTION_TYPE.FETCH_REGIONS,
    payload: response.data
  });
};

export const fetchStates = (authToken, regions = null) => async dispatch => {
  let response = null;

  response = await adminPanelApi(authToken).get(
    `/v1/admin/states?region_id=${JSON.stringify(regions)}`
  );

  dispatch({ type: ACTION_TYPE.FETCH_STATES, payload: response.data });
};
