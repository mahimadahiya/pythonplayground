import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

// Actions Api
export const wyrActionList = async (authToken, technical_service_id) => {
  const response = await adminPanelApi(authToken).get("/v1/admin/wyr/action", {
    params: {
      technical_service_id: technical_service_id
    }
  });
  return response.data;
};

export const wyrActionDelete = async (authToken, selected_id) => {
  const response = await adminPanelApi(authToken).delete(
    "/v1/admin/wyr/action/" + selected_id
  );
  return response.data;
};

export const createNewWyrAction = async (authToken, formValues) => {
  let formData = new FormData();
  formData.append("action", formValues.action);
  formData.append("technical_service_id", formValues.technical_service_id);
  formData.append("complexity", formValues.complexity);
  formData.append("level", formValues.level);

  if (formValues.hasOwnProperty("media_type") === true) {
    formData.append("media_type", formValues.media_type);
  }

  if (formValues.hasOwnProperty("media_file") === true) {
    formData.append("media_file", formValues.media_file);
  }

  const response = await adminPanelApi(authToken).post(
    "/v1/admin/wyr/action",
    formData
  );
  return response.data;
};

export const wyrActionMapParameters = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/wyr/action/map/",
    qs.stringify(values)
  );
  return response;
};
