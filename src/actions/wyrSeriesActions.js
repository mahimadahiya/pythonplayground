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
