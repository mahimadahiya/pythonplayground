import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";
import pyLearningApi from "../apis/pylearning";

export const fetchCategoryList = async (authToken, values) => {
  let response = null;

  if (values.searchText.length > 0) {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/paginated/categories?offset=${values.offset}&search=${values.searchText}`
    );
  } else {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/paginated/categories?offset=${values.offset}`
    );
  }
  return { list: response.data.results, count: response.data.count };
};

export const fetchParameterList = async (authToken, values) => {
  let response = null;

  if (values.searchText.length > 0) {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/paginated/parameters?offset=${values.offset}&search=${values.searchText}`
    );
  } else {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/paginated/parameters?offset=${values.offset}`
    );
  }
  return { list: response.data.results, count: response.data.count };
};

export const fetchArticleDetail = async (id, authToken) => {
  const response = await adminPanelApi(authToken).get(
    `/v1/admin/article/${id}`
  );
  return response.data.result;
};

export const fetchTagList = async (authToken, values) => {
  let response = null;

  if (values.searchText.length > 0) {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/paginated/tags?offset=${values.offset}&search=${values.searchText}`
    );
  } else {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/paginated/tags?offset=${values.offset}`
    );
  }
  return { list: response.data.results, count: response.data.count };
};

export const fetchCategoryDetails = async (authToken, id) => {
  const response = await adminPanelApi(authToken).get(
    `/v1/admin/category/${id}`
  );
  if (response.status === 200) {
    return response.data;
  }
};

export const fetchParameterDetails = async (authToken, id) => {
  const response = await adminPanelApi(authToken).get(
    `/v1/admin/parameter/${id}`
  );
  if (response.status === 200) {
    return response.data;
  }
};

export const fetchTagDetails = async (authToken, id) => {
  const response = await adminPanelApi(authToken).get(`/v1/admin/tag/${id}`);
  if (response.status === 200) {
    return response.data;
  }
};

export const createCategory = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/category/",
    qs.stringify(values)
  );
  return response;
};

export const createParameter = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/parameter/",
    qs.stringify(values)
  );
  return response;
};

export const createTag = async (authToken, values) => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/tag/",
    qs.stringify(values)
  );
  return response;
};

export const editCategory = async (authToken, values) => {
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/category/${values.id}`,
    qs.stringify(values)
  );
  return response;
};

export const editParameter = async (authToken, values) => {
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/parameter/${values.id}`,
    qs.stringify(values)
  );
  return response;
};

export const editTag = async (authToken, values) => {
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/tag/${values.id}`,
    qs.stringify(values)
  );
  return response;
};

export const deleteCategory = async (authToken, id) => {
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/category/${id}`,
    qs.stringify({ flag: 0 })
  );
  return response;
};

export const deleteParameter = async (authToken, id) => {
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/parameter/${id}`,
    qs.stringify({ flag: 0 })
  );
  return response;
};

export const deleteTag = async (authToken, id) => {
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/tag/${id}`,
    qs.stringify({ flag: 0 })
  );
  return response;
};

export const createModule = async (authToken, values) => {
  const response = await pyLearningApi(authToken).post(
    "/module/create/react/",
    qs.stringify(values)
  );
  return response;
};

export const createService = async (authToken, values) => {
  const response = await pyLearningApi(authToken).post(
    "/service/create/react/",
    qs.stringify(values)
  );
  return response;
};
