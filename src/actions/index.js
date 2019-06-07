import pyLearningApi from "../apis/pylearning";

import qs from "querystring";
import * as ACTION_TYPE from "./actionTypes";
import history from "../history";
import { getOrganizationModules, fetchOrganizationBatches, fetchOrganizationTracks, fetchOrganizations } from "./organizationActions";
import { loginUser, logoutUser } from "./authActions";
import {
  fetchQuestionList,
  fetchQuestionDetail,
  updateQuestion
} from "./question";

export { fetchQuestionList, fetchQuestionDetail, updateQuestion };
export { getOrganizationModules, fetchOrganizationBatches, fetchOrganizationTracks, fetchOrganizations };
export { loginUser, logoutUser };

// >>>>>>>>>>>>>>>>>>>>>>>>>REFACTOR BELOW>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// USER

export const setUserAuthValue = formValues => {
  return {
    type: ACTION_TYPE.SET_USER_AUTH,
    payload: formValues
  };
};

// MODULE TRACKS

export const fetchModuleTracks = authToken => async dispatch => {
  const response = await pyLearningApi(authToken).get("/react/track/list");
  dispatch({ type: ACTION_TYPE.FETCH_MODULE_TRACKS, payload: response.data });
};

export const fetchModuleTrack = (authToken, id) => async dispatch => {
  const response = await pyLearningApi(authToken).get(
    `/react/track/list?track_id=${id}`
  );
  dispatch({ type: ACTION_TYPE.FETCH_MODULE_TRACK, payload: response.data });
};

export const createModuleTrack = (authToken, formValues) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    "/react/track/create/",
    qs.stringify(formValues)
  );
  dispatch({ type: ACTION_TYPE.CREATE_MODULE_TRACK, payload: response.data });
  const id = response.data.result.track_id;
  history.push(`/tracks/map/module/${id}`);
};

export const createModuleTrackMapping = (
  authToken,
  formValues
) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    "/react/track/module/map/",
    qs.stringify(formValues)
  );
  dispatch({
    type: ACTION_TYPE.CREATE_MODULE_TRACK_MAPPING,
    payload: response.data
  });
  history.push("/tracks");
};

export const createUserTrackMapping = (
  authToken,
  formValues
) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    "/react/user/track/mapping/",
    qs.stringify(formValues)
  );
  dispatch({
    type: ACTION_TYPE.CREATE_USER_TRACK_MAPPING,
    payload: response.data
  });
  history.push("/tracks");
};

// ENTITY MANAGEMENT

export const fetchModules = authToken => async dispatch => {
  const response = await pyLearningApi(authToken).get("module/list/react");
  dispatch({ type: ACTION_TYPE.FETCH_MODULES, payload: response.data });
};

// ORGANIZATION
