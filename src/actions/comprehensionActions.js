import * as ACTION_TYPE from "./actionTypes";
import adminPanelApi from "../apis/adminPanel";

export const fetchComprehensionsList = (
  authToken,
  values
) => async dispatch => {
  let response = null;
  if (values.searchText) {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/comprehensions?offset=${values.offset}&search=${
        values.searchText
      }&filters=${values.fields}`
    );
  } else {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/comprehensions?offset=${values.offset}&filters=${
        values.fields === undefined ? "{}" : values.fields
      }`
    );
  }
  dispatch({
    type: ACTION_TYPE.FETCH_COMPREHENSION_LIST,
    payload: response.data
  });
};
