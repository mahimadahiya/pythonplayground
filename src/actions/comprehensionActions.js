import * as ACTION_TYPE from "./actionTypes";
import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

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

export const addComprehension = (
  authToken,
  formValues,
  html
) => async dispatch => {
  if (html) {
    await adminPanelApi(authToken).post(
      "/v1/admin/comprehension/",
      qs.stringify({
        fields: JSON.stringify(formValues),
        html
      })
    );
  } else {
    await adminPanelApi(authToken).post(
      "/v1/admin/comprehension/",
      qs.stringify({
        fields: JSON.stringify(formValues)
      })
    );
  }
  return { type: ACTION_TYPE.ADD_COMPREHENSION };
};
