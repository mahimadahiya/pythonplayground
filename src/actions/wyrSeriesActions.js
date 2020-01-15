import adminPanelApi from "../apis/adminPanel";
import * as ACTION_TYPE from "./actionTypes";
import qs from "querystring";

/* series list api */

export const wyrSeriesList = async (authToken, technical_service_id) => {
  const response = await adminPanelApi(authToken).get("/v1/admin/wyr/series/");
  return response;
};

/* create  */
export const wyrSeriesCreate = async (authToken, formValues) => {
  let formData = new FormData();
  formData.append("name", formValues.name);
  formData.append("description", formValues.description);
  formData.append("series_icon", formValues.series_icon);
  formData.append("series_background", formValues.series_background);

  const response = await adminPanelApi(authToken).post(
    "/v1/admin/wyr/series/",
    formData
  );
  return response.data;
};

/*Update series */
export const wyrSeriesUpdate = async (authToken, id, formValues) => {
  let formData = new FormData();
  formData.append("name", formValues.name);
  formData.append("description", formValues.description);
  formData.append("series_icon", formValues.series_icon);
  formData.append("series_background", formValues.series_background);

  const response = await adminPanelApi(authToken).put(
    `/v1/admin/wyr/series/${id}/`,
    formData
  );
  return response.data;
};

/* delete  */
export const wyrSeriesDelete = async (authToken, selected_id) => {
  const response = await adminPanelApi(authToken).delete(
    `/v1/admin/wyr/series/${selected_id}/`
  );
  return response;
};

/* status update  */
export const wyrSeriesStatusUpdate = async (authToken, actionId) => {
  const response = await adminPanelApi(authToken).patch(
    `/v1/admin/wyr/series/${actionId}/`
  );
  return response;
};

//ACTIONS FOR SERIES

export const fetchSeriesList = authToken => async dispatch => {
  const response = await adminPanelApi(authToken).get("/v1/admin/wyr/series/");
  dispatch({
    type: ACTION_TYPE.FETCH_SERIES_LIST,
    payload: response.data
  });
};
