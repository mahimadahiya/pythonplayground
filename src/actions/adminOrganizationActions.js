import adminPanelApi from "../apis/adminPanel";

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
