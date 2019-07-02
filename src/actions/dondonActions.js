import pyLearningApi from "../apis/pylearning";
import * as ACTION_TYPE from "./actionTypes";

export const fetchDonDonList = (
  authToken,
  params,
  offset
) => async dispatch => {
  let response = null;
  if (!params.entity_type && !params.status) {
    response = await pyLearningApi(authToken).get(
      `/game/dondon/list?search=${params.searchText}&offset=${offset}`
    );
  } else if (!params.entity_type) {
    response = await pyLearningApi(authToken).get(
      `/game/dondon/list?filter={"status": ${params.status}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  } else if (!params.status) {
    response = await pyLearningApi(authToken).get(
      `/game/dondon/list?filter={"entity_type": ${params.entity_type}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  } else {
    response = await pyLearningApi(authToken).get(
      `/game/dondon/list?filter={"entity_type": ${
        params.entity_type
      }, "status": ${params.status}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  }
  dispatch({ type: ACTION_TYPE.FETCH_DONDON_LIST, payload: response.data });
};

export const fetchDonDonDetails = (authToken, id) => async dispatch => {
  const response = await pyLearningApi(authToken).get(
    "/game/dondon/show?id=" + id
  );
  dispatch({ type: ACTION_TYPE.FETCH_DONDON_DETAILS, payload: response.data });
};
