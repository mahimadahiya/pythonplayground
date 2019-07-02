import pyLearningApi from "../apis/pylearning";
import * as ACTION_TYPE from "./actionTypes";

export const fetchMagicphraseList = (
  authToken,
  params,
  offset
) => async dispatch => {
  let response = null;
  if (!params.entity_type && !params.status) {
    response = await pyLearningApi(authToken).get(
      `/game/ctp/list?search=${params.searchText}&offset=${offset}`
    );
  } else if (!params.entity_type) {
    response = await pyLearningApi(authToken).get(
      `/game/ctp/list?filter={"status": ${params.status}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  } else if (!params.status) {
    response = await pyLearningApi(authToken).get(
      `/game/ctp/list?filter={"entity_type": ${params.entity_type}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  } else {
    response = await pyLearningApi(authToken).get(
      `/game/ctp/list?filter={"entity_type": ${params.entity_type}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  }
  dispatch({
    type: ACTION_TYPE.FETCH_MAGICPHRASE_LIST,
    payload: response.data
  });
};

export const fetchMagicphraseDetails = (authToken, id) => async dispatch => {
  const response = await pyLearningApi(authToken).get(
    "/game/ctp/show?id=" + id
  );
  dispatch({
    type: ACTION_TYPE.FETCH_MAGICPHRASE_DETAILS,
    payload: response.data
  });
};
