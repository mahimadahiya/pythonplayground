import * as ACTION_TYPE from "./actionTypes";
import pyLearningApi from "../apis/pylearning";
import qs from "querystring";

export const addQuad = (authToken, values) => async dispatch => {
  await pyLearningApi(authToken).post(
    "/game/mtf/panel/type2/add",
    qs.stringify(values)
  );
  dispatch({ type: ACTION_TYPE.ADD_QUAD });
};

export const fetchQuadList = (authToken, params, offset) => async dispatch => {
  let response = null;
  if (!params.entity_type && !params.status) {
    response = await pyLearningApi(authToken).get(
      `/game/list/type2?search=${params.searchText}&offset=${offset}`
    );
  } else if (!params.entity_type) {
    response = await pyLearningApi(authToken).get(
      `/game/list/type2?filter={"status": ${params.status}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  } else if (!params.status) {
    response = await pyLearningApi(authToken).get(
      `/game/list/type2?filter={"entity_type": ${params.entity_type}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  } else {
    response = await pyLearningApi(authToken).get(
      `/game/list/type2?filter={"entity_type": ${
        params.entity_type
      }, "status": ${params.status}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  }
  dispatch({ type: ACTION_TYPE.FETCH_QUAD_LIST, payload: response.data });
};

export const fetchQuadDetails = (authToken, id) => async dispatch => {
  const response = await pyLearningApi(authToken).get(
    "/game/show_details/quad?id=" + id
  );
  dispatch({ type: ACTION_TYPE.FETCH_QUAD_DETAILS, payload: response.data });
};

export const editQuad = (authToken, values) => async dispatch => {
  await pyLearningApi(authToken).post(
    "/game/mtf/panel/type2/edit",
    qs.stringify(values)
  );
  dispatch({ type: ACTION_TYPE.QUAD_EDIT });
};
