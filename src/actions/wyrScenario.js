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
