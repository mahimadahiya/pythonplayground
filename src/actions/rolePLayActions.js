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
    response = await adminPanelApi(authToken).post(
        "/v1/admin/rp/article/create/",
        qs.stringify(formValues)
      );
  };