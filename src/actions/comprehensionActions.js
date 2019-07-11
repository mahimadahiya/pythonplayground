import * as ACTION_TYPE from "./actionTypes";
import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

export const fetchComprehensionsList = (
  authToken,
  values
) => async dispatch => {
  let response = null;

  let filters = {
    comprehension_type: values.fields.comprehension_type,
    comprehensionfmarticle__fmarticle_id:
      values.fields.comprehensionfmarticle__fmarticle_id
  };

  clean(filters);
  filters = JSON.stringify(filters);

  if (values.searchText) {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/comprehensions?offset=${values.offset}&search=${
        values.searchText
      }&filters=${filters}`
    );
  } else {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/comprehensions?offset=${values.offset}&filters=${filters}`
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
