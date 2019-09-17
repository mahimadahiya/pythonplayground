import _ from "lodash";
import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

export const fetchSPOCList = async (authToken, fields, offset) => {
  fields = _.pickBy(fields, _.identity);
  const response = await adminPanelApi(authToken).get("/v1/admin/spoc/list", {
    params: { offset }
  });
  return { list: response.data.results, count: response.data.count };
};

export const createSPOC = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/spoc/create",
    qs.stringify(values)
  );
  return response.data;
};
