import * as ACTION_TYPE from "./actionTypes";
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
    formData.append("name",formValues.name)
    formData.append("left_avatar", formValues.leftAvatarImage)
    formData.append("left_avatar_name", formValues.leftAvatarName )
    formData.append("right_avatar_name", formValues.rightAvatarName )
    formData.append("right_avatar", formValues.rightAvatarImage )
    formData.append("background_file", formValues.backImage )
    response = await adminPanelApi(authToken).post(
        "/v1/admin/rp/article/create/",
        formData
      );
      return response;
  };