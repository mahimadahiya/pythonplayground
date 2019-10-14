import * as ACTION_TYPE from "./actionTypes";
import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

export const rolePlayList = async authToken => {
    const response = await adminPanelApi(authToken).get(
      "/v1/admin/rp/article/list"
    );
        return response.data.result;
  };