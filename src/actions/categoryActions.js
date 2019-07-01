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
  categories = JSON.stringify(categories);
  const response = await adminPanelApi(authToken).get(
    `/v1/admin/parameters?category_id=${categories}`
  );
  dispatch({ type: ACTION_TYPE.FETCH_PARAMETERS, payload: response.data });
};
