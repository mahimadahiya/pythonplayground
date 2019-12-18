import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

export const wyrTreeList = async (authToken, technical_service_id) => {
  const response = await adminPanelApi(authToken).get("/v1/admin/wyr/tree", {
    params: {
      technical_service_id: technical_service_id
    }
  });
  return response;
};

/* create  */
export const wyrTreeCreate = async (authToken, formValues) => {
  let formData = new FormData();
  formData.append("technical_service_id", formValues.technical_service_id);
  formData.append("name", formValues.name);
  formData.append("description", formValues.description);
  formData.append("episode_icon", formValues.episode_icon);
  formData.append("visibility", formValues.visibility);

  const response = await adminPanelApi(authToken).post(
    "/v1/admin/wyr/tree",
    formData
  );
  return response.data;
};

/* edit */
export const wyrTreeUpdate = async (authToken, id, formValues) => {
  let formData = new FormData();
  formData.append("episode_icon", formValues.episode_icon);

  const response = await adminPanelApi(authToken).put(
    `/v1/admin/wyr/tree/${id}`
  );

  return response;
};

/* status update  */
export const wyrTreeStatusUpdate = async (authToken, actionId) => {
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/wyr/tree/status/update/${actionId}`
  );
  return response;
};

/* delete  */
export const wyrTreeDelete = async (authToken, selected_id) => {
  const response = await adminPanelApi(authToken).delete(
    `/v1/admin/wyr/tree/${selected_id}`
  );
  return response;
};

export const wyrTreeMapParameters = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/wyr/tree/map/",
    qs.stringify(values)
  );
  return response;
};

/*activity list */

export const getActivityList = async authToken => {
  const response = await adminPanelApi(authToken).get("/v1/admin/activity/");
  return response;
};

/*Activity create */

export const wyrTreeActivityCreate = async (authToken, formValues) => {
  let formData = new FormData();
  formData.append("wyr_episode_id", formValues.wyr_episode_id);
  formData.append("activity_id", formValues.activity_id);
  formData.append("entity_id", formValues.entity_id);
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/wyr/episode_activity/",
    formData
  );
  return response;
};

/*delete activity */

export const wyrTreeActivityDelete = async (authToken, id) => {
  const response = await adminPanelApi(authToken).delete(
    `/v1/admin/wyr/episode_activity/${id}/`
  );
  return response;
};
