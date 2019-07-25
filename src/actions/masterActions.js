import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

export const fetchCategoryList = async (authToken, values) => {
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

export const fetchCategoryDetails = async (authToken, id) => {
  const response = await adminPanelApi(authToken).get(
    `/v1/admin/category/${id}`
  );
  if (response.status === 200) {
    return response.data;
  }
};
