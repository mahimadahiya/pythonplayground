import * as ACTION_TYPE from "./actionTypes";
import pyLearningApi from "../apis/pylearning";
import qs from "querystring";

export const addMTF = (authToken, values) => async dispatch => {
  await pyLearningApi(authToken).post(
    "/game/mtf/panel/type1/add",
    qs.stringify(values)
  );
  dispatch({ type: ACTION_TYPE.ADD_MTF });
};

export const fetchMTFList = (authToken, params, offset) => async dispatch => {
  let response = null;
  if (!params.entity_type && !params.status) {
    response = await pyLearningApi(authToken).get(
      `/game/list/type1?search=${params.searchText}&offset=${offset}`
    );
  } else if (!params.entity_type) {
    response = await pyLearningApi(authToken).get(
      `/game/list/type1?filter={"status": ${params.status}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  } else if (!params.status) {
    response = await pyLearningApi(authToken).get(
      `/game/list/type1?filter={"entity_type": ${params.entity_type}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  } else {
    response = await pyLearningApi(authToken).get(
      `/game/list/type1?filter={"entity_type": ${
        params.entity_type
      }, "status": ${params.status}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  }
  dispatch({ type: ACTION_TYPE.FETCH_MTF_LIST, payload: response.data });
};

export const fetchMTFDetails = (authToken, id) => async dispatch => {
  const response = await pyLearningApi(authToken).get(
    "/game/show_details/mtf?id=" + id
  );
  dispatch({ type: ACTION_TYPE.FETCH_MTF_DETAILS, payload: response.data });
};

export const editMTF = (authToken, values) => async dispatch => {
  await pyLearningApi(authToken).post(
    "/game/mtf/panel/type1/edit",
    qs.stringify(values)
  );
  dispatch({ type: ACTION_TYPE.MTF_EDIT });
};
