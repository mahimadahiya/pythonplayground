import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";
import pyLearningApi from "../apis/pylearning";

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

export const fetchAllOrganizations = async authToken => {
  const response = await pyLearningApi(authToken).get(
    "/organization/list/react"
  );
  return response.data.result.organization_list;
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
      fields: values.fields,
      service_id: values.service_id
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
