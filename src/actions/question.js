import adminPanelApi from "../apis/adminPanel";
import * as ACTION_TYPE from "./actionTypes";
import qs from "querystring";
import history from "../history";

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

export const fetchQuestionList = (authToken, values) => async dispatch => {
  let response = null;
  let filters = values.fields;
  clean(filters);
  filters = JSON.stringify(filters);
  if (values.searchText) {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/questions?offset=${values.offset}&search=${values.searchText}&filters=${filters}`
    );
  } else {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/questions?offset=${values.offset}&filters=${filters}`
    );
  }
  dispatch({
    type: ACTION_TYPE.FETCH_QUESTIONS,
    payload: response.data
  });
};

export const fetchQuestionDetail = (id, authToken) => async dispatch => {
  const response = await adminPanelApi(authToken).get(
    `/v1/admin/question/${id}`
  );
  dispatch({
    type: ACTION_TYPE.FETCH_QUESTION_DETAIL,
    payload: response.data.result
  });
};

export const updateQuestion = (id, authToken, formValues) => async dispatch => {
  const response = await adminPanelApi(authToken).put(
    `/v1/admin/question/${id}`,
    qs.stringify(formValues)
  );
  dispatch({
    type: ACTION_TYPE.UPDATE_QUESTION,
    payload: response.data.result
  });
  if (formValues.status || formValues.flag !== null) {
    history.push("/questions");
  } else {
    // history.push("/question/map/choices/" + id);
  }
};

export const createQuestion = (authToken, formValues) => async dispatch => {
  formValues["status"] = 1;
  const data = qs.stringify({ fields: JSON.stringify(formValues) });
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/question/",
    data
  );
  const id = response.data.result.id;
  history.push({ pathname: "/question/edit/" + id });
};
