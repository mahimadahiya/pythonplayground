import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

// Scenario Api
export const wyrScenarioList = async (authToken, technical_service_id) => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/wyr/scenario",
    {
      params: {
        technical_service_id: technical_service_id
      }
    }
  );
  return response.data;
};

export const wyrScenarioStatusUpdate = async (authToken, scenarioId) => {
  const response = await adminPanelApi(authToken).put(
    "/v1/admin/wyr/scenario/status/update/" + scenarioId
  );
  return response;
};

export const wyrScenarioDelete = async (authToken, selected_id) => {
  const response = await adminPanelApi(authToken).delete(
    "/v1/admin/wyr/scenario/" + selected_id
  );
  return response.data;
};

export const wyrScenarioMapParameters = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/wyr/scenario/map/",
    qs.stringify(values)
  );
  return response;
};

export const createNewWyrScenario = async (authToken, formValues) => {
  let formData = new FormData();

  formData.append("technical_service_id", formValues.technical_service_id);
  formData.append("objective", formValues.objective);
  formData.append("pre_description", formValues.pre_description);
  formData.append("post_description", formValues.post_description);
  formData.append("complexity", formValues.complexity);
  formData.append("timer", formValues.timer);

  if (formValues.hasOwnProperty("media_type") === true) {
    formData.append("media_type", formValues.media_type);
  }

  if (formValues.hasOwnProperty("media_file") === true) {
    formData.append("media_file", formValues.media_file);
  }

  const response = await adminPanelApi(authToken).post(
    "/v1/admin/wyr/scenario",
    formData
  );
  return response.data;
};

export const updateWyrScenario = async (authToken, actionId, formValues) => {
  let formData = new FormData();
  formData.append("objective", formValues.objective);
  formData.append("pre_description", formValues.pre_description);
  formData.append("post_description", formValues.post_description);
  formData.append("complexity", formValues.complexity);
  formData.append("timer", formValues.timer);

  if (formValues.hasOwnProperty("media_type") === true) {
    formData.append("media_type", formValues.media_type);
  }

  if (formValues.hasOwnProperty("media_file") === true) {
    formData.append("media_file", formValues.media_file);
  }

  const response = await adminPanelApi(authToken).put(
    "/v1/admin/wyr/scenario/" + actionId,
    formData
  );
  return response.data;
};
