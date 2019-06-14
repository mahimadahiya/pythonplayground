import qs from "querystring";
import pyLearningApi from "../apis/pylearning";
import * as ACTION_TYPE from "./actionTypes";

export const dondonUpload = (authToken, formValues) => {
  pyLearningApi(authToken).post(
    "/game/dondon/upload/add",
    qs.stringify(formValues)
  );
};

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
      `/game/dondon/list?filter={"entity_type": ${params.entity_type}}&search=${
        params.searchText
      }&offset=${offset}`
    );
  }
  dispatch({ type: ACTION_TYPE.FETCH_DONDON_LIST, payload: response.data });
};
