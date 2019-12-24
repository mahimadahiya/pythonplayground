import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

/* series list api */

export const wyrSeriesList = async (authToken, technical_service_id) => {
  const response = await adminPanelApi(authToken).get("/v1/admin/wyr/series/", {
    params: {
      technical_service_id: technical_service_id
    }
  });
  return response;
};

/* create  */
export const wyrSeriesCreate = async (authToken, formValues) => {
  let formData = new FormData();
  formData.append("technical_service_id", formValues.technical_service_id);
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

/* delete  */
export const wyrSeriesDelete = async (authToken, selected_id) => {
  const response = await adminPanelApi(authToken).delete(
    `/v1/admin/wyr/series/${selected_id}/`
  );
  return response;
};

/* status update  */
export const wyrSeriesStatusUpdate = async (authToken, actionId) => {
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/wyr/series/${actionId}/`
  );
  return response;
};

/* map parameters */
export const wyrSeriesMapParameters = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/wyr/series_parameter/",
    qs.stringify(values)
  );
  return response;
};

/* delete mapped parameter */

export const deleteMappedSeriesParameter = async (authToken, id) => {
  const response = await adminPanelApi(authToken).delete(
    `/v1/admin/wyr/series_parameter/${id}/`
  );
  return response;
};
