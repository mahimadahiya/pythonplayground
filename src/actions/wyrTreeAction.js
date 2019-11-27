import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";


export const wyrTreeList = async (authToken, technical_service_id) => {
    const response = await adminPanelApi(authToken).get(
        '/v1/admin/wyr/tree',
        {
            params: {
                technical_service_id : technical_service_id
            }
        }
    );
    return response;
}

export const wyrTreeStatusUpdate = async (authToken,actionId) => {
    const response = await adminPanelApi(authToken).put(
        `/v1/admin/wyr/tree/status/update/${actionId}`
    );
    return response;
}

export const wyrTreeDelete = async (authToken,selected_id) => {
    const response = await adminPanelApi(authToken).delete(
        `/v1/admin/wyr/tree/${selected_id}`
    );
    return response;
} 

export const wyrTreeMapParameters = async (authToken, values) => {
    const response = await adminPanelApi(authToken).post(
      "/v1/admin/wyr/tree/map/",
      qs.stringify(values)
    );
    return response;
  };

