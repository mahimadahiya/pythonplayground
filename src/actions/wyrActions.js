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
