import * as ACTION_TYPE from "./actionTypes";
import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";
import history from "../history";

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
  let filters = values.fields;
  console.log(filters);
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
  let response = null;
  if (html) {
    response = await adminPanelApi(authToken).post(
      "/v1/admin/comprehension/",
      qs.stringify({
        fields: JSON.stringify(formValues),
        html
      })
    );
  } else {
    response = await adminPanelApi(authToken).post(
      "/v1/admin/comprehension/",
      qs.stringify({
        fields: JSON.stringify(formValues)
      })
    );
  }
  if (response.status === 201) {
    history.push("/comprehension/edit/" + response.data.result.id);
  }
  return { type: ACTION_TYPE.ADD_COMPREHENSION };
};

export const updateComprehension = (
  id,
  authToken,
  formValues
) => async dispatch => {
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/comprehension/${id}`,
    qs.stringify(formValues)
  );
  dispatch({
    type: ACTION_TYPE.UPDATE_COMPREHENSION,
    payload: response.data.result
  });
  if (formValues.status || formValues.flag !== null) {
    history.push("/comprehension");
  } else {
    history.push("/comprehension/map/" + id);
  }
};

export const fetchComprehensionDetail = (id, authToken) => async dispatch => {
  const response = await adminPanelApi(authToken).get(
    `/v1/admin/comprehension/${id}`
  );
  dispatch({
    type: ACTION_TYPE.FETCH_COMPREHENSION_DETAIL,
    payload: response.data.result
  });
};

export const fetchAllComprehensions = authToken => async dispatch => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/comprehensions?limit=1000000"
  );
  dispatch({
    type: ACTION_TYPE.FETCH_ALL_COMPREHENSIONS,
    payload: response.data.results
  });
};

export const fetchMappedQuestions = (authToken, id) => async dispatch => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/comprehension/question/list",
    {
      params: {
        comprehension_id: id
      }
    }
  );
  dispatch({
    type: ACTION_TYPE.FETCH_MAPPED_QUESTIONS,
    payload: response.data.result
  });
};

export const mapComprehensionQuestions = (
  authToken,
  values
) => async dispatch => {
  await adminPanelApi(authToken).put(
    "/v1/admin/comprehension/map/question",
    qs.stringify(values)
  );
  dispatch({ type: ACTION_TYPE.MAP_COMPREHENSION_QUESTIONS });
};
