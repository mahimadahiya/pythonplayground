import * as ACTION_TYPE from "./actionTypes";
import adminPanelApi from "../apis/adminPanel";

export const fetchCategories = authToken => async dispatch => {
  const response = await adminPanelApi(authToken).get("/v1/admin/categories");
  dispatch({
    type: ACTION_TYPE.FETCH_CATEGORIES,
    payload: response.data
  });
};

export const fetchParameters = (authToken, categories) => async dispatch => {
  let response = null;
  // console.log(categories[0]);
  if (
    categories[0] === null ||
    categories[0] === undefined ||
    (categories[0] && categories[0].length === 0) ||
    categories.length === 0
  ) {
    response = await adminPanelApi(authToken).get(`/v1/admin/parameters`);
  } else {
    categories = JSON.stringify(categories);
    response = await adminPanelApi(authToken).get(
      `/v1/admin/parameters?category_id=${categories}`
    );
  }
  dispatch({ type: ACTION_TYPE.FETCH_PARAMETERS, payload: response.data });
};

export const fetchTags = (authToken, parameters) => async dispatch => {
  parameters = JSON.stringify(parameters);
  const response = await adminPanelApi(authToken).get(
    `/v1/admin/tags?parameter_id=${parameters}`
  );
  dispatch({ type: ACTION_TYPE.FETCH_TAGS, payload: response.data });
};
