import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

//Seasons list

export const wyrSeasonList = async (authToken, wyr_series_id) => {
  const response = await adminPanelApi(authToken).get("/v1/admin/wyr/season/", {
    params: {
      wyr_series_id
    }
  });
  return response;
};

/*create season */

export const wyrSeasonCreate = async (authToken, formValues) => {
  let formData = new FormData();
  formData.append("name", formValues.name);
  formData.append("description", formValues.description);
  formData.append("season_icon", formValues.season_icon);
  formData.append("wyr_series_id", formValues.wyr_series_id);

  const response = await adminPanelApi(authToken).post(
    `/v1/admin/wyr/season/`,
    formData
  );
  return response.data;
};

//  status update

export const wyrSeasonStatusUpdate = async (authToken, actionId) => {
  const response = await adminPanelApi(authToken).patch(
    `/v1/admin/wyr/season/${actionId}/`
  );
  return response;
};

/* season delete  */
export const wyrSeasonDelete = async (authToken, selected_id) => {
  const response = await adminPanelApi(authToken).delete(
    `/v1/admin/wyr/season/${selected_id}/`
  );
  return response;
};

/*Update season */
export const wyrSeasonUpdate = async (authToken, id, formValues) => {
  let formData = new FormData();
  formData.append("name", formValues.name);
  formData.append("description", formValues.description);
  formData.append("season_icon", formValues.season_icon);

  const response = await adminPanelApi(authToken).put(
    `/v1/admin/wyr/season/${id}/`,
    formData
  );
  return response.data;
};
