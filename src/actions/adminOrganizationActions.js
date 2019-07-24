import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

export const fetchOrganizationList = async (authToken, values) => {
  let response = null;

  if (values.searchText.length > 0) {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/organizations?offset=${values.offset}&search=${
        values.searchText
      }`
    );
  } else {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/organizations?offset=${values.offset}`
    );
  }
  return { list: response.data.results, count: response.data.count };
};

export const fetchOrganizationDetails = async (authToken, id) => {
  const response = await adminPanelApi(authToken).get(
    `/v1/admin/organization/${id}`
  );
  if (response.status === 200) {
    return response.data;
  }
};

export const createOrganization = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/organization/",
    qs.stringify({
      fields: JSON.stringify(values)
    })
  );
  return response;
};

export const fetchCourses = async authToken => {
  const response = await adminPanelApi(authToken).get("/v1/admin/courses");
  if (response.status === 200) {
    return response.data.result;
  }
};

export const fetchIndustries = async authToken => {
  const response = await adminPanelApi(authToken).get("/v1/admin/industries");
  if (response.status === 200) {
    return response.data.result;
  }
};
