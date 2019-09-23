import * as ACTION_TYPE from "./actionTypes";
import _ from "lodash";
import adminPanelApi from "../apis/adminPanel";

export const fetchModules = async authToken => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/paginated/modules"
  );
  return response.data.results;
};
export const fetchAllModules = async authToken => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/paginated/modules?limit=100000000"
  );
  return response.data.results;
};

export const createModuleMap = list => {
  const detailsHash = _.reduce(
    list,
    (res, val) => {
      let key = val["id"];
      res[key] = val;
      return res;
    },
    {}
  );
  return {
    type: ACTION_TYPE.CREATE_MODULE_MAP,
    payload: detailsHash
  };
};
