import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

export const rolePlayList = async authToken => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/rp/article/list"
  );
  return response.data.result;
};

export const addRolePlay = async (authToken, formValues) => {
  let response = null;

  let formData = new FormData();
  formData.append("name", formValues.name);
  formData.append("left_avatar", formValues.leftAvatarImage);
  formData.append("left_avatar_name", formValues.leftAvatarName);
  formData.append("right_avatar_name", formValues.rightAvatarName);
  formData.append("right_avatar", formValues.rightAvatarImage);
  formData.append("background_file", formValues.backImage);
  formData.append("description", formValues.description);
  formData.append("post_description", formValues.postDescription);
  formData.append("technical_service_id", formValues.technical_service_id);
  response = await adminPanelApi(authToken).post(
    "/v1/admin/rp/article/create/",
    formData
  );
  return response;
};

export const deleteRolePLay = async (authToken, rpId) => {
  const response = await adminPanelApi(authToken).delete(
    `/v1/admin/rp/article/delete/${rpId}`
  );
  return response;
};

export const updateRolePlay = async (authToken, rpId, formValues) => {
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/rp/article/update/${rpId}`,
    formValues
  );
  return response;
};

export const rolePlayConversationDetails = async (authToken, id) => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/rp/article/conversation/list",
    {
      params: {
        rp_article_id: id
      }
    }
  );
  //console.log(response);
  return response.data;
};

export const rolePlayConversationDeleteConversation = async (authToken, id) => {
  const response = await adminPanelApi(authToken).delete(
    "/v1/admin/rp/article/conversation/delete/" + id
  );
  //console.log(response);
  return response.data;
};

export const rolePlayConversationChangeStatus = async (
  authToken,
  formValues
) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/rp/article/conversation/save/",

    qs.stringify(formValues)
  );
  //console.log(response);
  return response.data;
};

export const addConversation = async (authToken, formValues) => {
  let response = null;
  // let formData = new FormData();

  // formData.append("text", formValues.text);
  // formData.append("conversation_type", formValues.conversation_type);
  // formData.append("rp_article_id", formValues.rp_article_id);
  // formData.append("timer", formValues.timer);
  // formData.append("title", formValues.title);
  // formData.append("extra_points", formValues.extraPoints);

  response = await adminPanelApi(authToken).post(
    "/v1/admin/rp/article/conversation/create/",
    qs.stringify(formValues)
  );
  return response;
};

export const updateRPConversation = async (authToken, formValues) => {
  const response = await adminPanelApi(authToken).put(
    "/v1/admin/rp/article/conversation/update/",
    qs.stringify(formValues)
  );
  return response;
};

export const fetchRpLayoutList = async authToken => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/rp/article/layout/list"
  );
  return response;
};

export const rolePlayArticleParametersList = async (authToken, rpArticleId) => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/rp/article/parameter/list",
    {
      params: {
        rp_article_id: rpArticleId
      }
    }
  );
  return response.data.result;
};

export const mapRolePlayParameters = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/rp/article/parameter/map/",
    qs.stringify(values)
  );
  return response;
};
