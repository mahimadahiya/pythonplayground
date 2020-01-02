import adminPanelApi from "../apis/adminPanel";
import selfService from "../apis/selfService";
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
    `/v1/admin/wyr/tree/${id}`,
    formData
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

/* update or map activity entity */

export const wyrTreeActivityUpdate = async (authToken, id, formValues) => {
  let formData = new FormData();
  formData.append("extra_details", JSON.stringify(formValues.extra_details));
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/wyr/episode_activity/${id}/`,
    formData
  );
  return response;
};

/*stimulation list  */

export const getStimulationList = async authToken => {
  const response = await adminPanelApi(authToken).get("/v1/admin/simulations");
  return response;
};

/* mapping activity  entity list  */

export const getMappingActivityEntityList = async (authToken, parameter_id) => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/wyr/episode/parameter/activity/list",
    {
      params: {
        parameter_id: parameter_id
      }
    }
  );
  return response;
};

/* delete mapped parameter */

export const deleteMappedParameter = async (authToken, id) => {
  const response = await adminPanelApi(authToken).delete(
    `/v1/admin/wyr/tree/map/parameter/${id}`
  );
  return response;
};

/* Course list */

export const getCourseList = async authToken => {
  const response = await adminPanelApi(authToken).get("/v1/admin/fm/course/");
  return response;
};

/* Chapter List */

export const getChapterList = async (authToken, fm_course_id) => {
  const response = await adminPanelApi(authToken).get("/v1/admin/fm/chapter/", {
    params: {
      fm_course_id
    }
  });
  return response;
};

/* episode activity list for fm */

export const getEpisodeActivityListForFm = async (authToken, chapter_id) => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/wyr/episode_activity/",
    {
      params: {
        chapter_id
      }
    }
  );
  return response;
};

/* scene list for epiodes */

export const getWyrEpisodeSceneList = async (authToken, wyr_episode_id) => {
  const response = await adminPanelApi(authToken).get("/v1/admin/wyr/scene", {
    params: {
      wyr_episode_id
    }
  });
  return response;
};

/* scene create for epiodes */

export const wyrEpisodeSceneCreate = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/wyr/scene",
    qs.stringify(values)
  );
  return response;
};

/* scene delete */

export const wyrEpisodeSceneDelete = async (authToken, id) => {
  const response = await adminPanelApi(authToken).delete(
    `/v1/admin/wyr/scene/${id}`
  );
  return response;
};

/* scene update */

export const wyrEpisodeSceneUpdate = async (authToken, id, values) => {
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/wyr/scene/${id}`,
    qs.stringify(values)
  );
  return response;
};
