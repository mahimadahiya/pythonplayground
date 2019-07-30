import adminPanelApi from "../apis/adminPanel";
import pyLearningApi from "../apis/pylearning";

export const fetchModulePaginatedList = async (authToken, values) => {
  let response = null;

  if (values.searchText.length > 0) {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/paginated/categories?offset=${values.offset}&search=${
        values.searchText
      }`
    );
  } else {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/paginated/categories?offset=${values.offset}`
    );
  }
  return { list: response.data.results, count: response.data.count };
};

export const fetchModules = async authToken => {
  const response = await pyLearningApi(authToken).get("module/list/react");
  return response.data.result.category_list;
};
