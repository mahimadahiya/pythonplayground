import pyLearningApi from "../apis/pylearning";
import * as ACTION_TYPE from "./actionTypes";
import _ from "lodash";

export const fetchAllServices = async authToken => {
  const response = await pyLearningApi(authToken).get("/service/list/react");
  return response.data.result.category_list;
};

export const createServiceMap = list => {
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
    type: ACTION_TYPE.CREATE_SERVICE_MAP,
    payload: detailsHash
  };
};
