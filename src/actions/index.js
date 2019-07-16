import pyLearningApi from "../apis/pylearning";

import qs from "querystring";
import * as ACTION_TYPE from "./actionTypes";
import history from "../history";
import {
  getOrganizationModules,
  fetchOrganizationBatches,
  fetchOrganizationTracks,
  fetchOrganizations,
  clearModules,
  fetchUsers
} from "./organizationActions";
import { loginUser, logoutUser } from "./authActions";
import {
  fetchQuestionList,
  fetchQuestionDetail,
  updateQuestion,
  createQuestion
} from "./question";
import {
  createSimulationOrgMapping,
  fetchModuleSimulations,
  fetchSimulationList,
  fetchSimulation,
  fetchDefaultModuleSimulations,
  clearSimulations
} from "./simulationActions";

import { fetchDonDonList, fetchDonDonDetails } from "./dondonActions";
import {
  fetchMagicphraseList,
  fetchMagicphraseDetails
} from "./magicPhraseActions";

import { fetchRegions, fetchStates } from "./regionActions";

import { fetchContentComplexityLevel } from "./contentActions";
import { fetchCategories, fetchParameters, fetchTags } from "./categoryActions";
import { addMTF, fetchMTFList, editMTF, fetchMTFDetails } from "./mtfActions";
import {
  addQuad,
  fetchQuadList,
  editQuad,
  fetchQuadDetails
} from "./quadActions";

import {
  fetchComprehensionsList,
  addComprehension,
  updateComprehension,
  fetchComprehensionDetail,
  fetchAllComprehensions
} from "./comprehensionActions";

import { fetchFlashCardsList } from "./flashActions";

export {
  getOrganizationModules,
  fetchOrganizationBatches,
  fetchOrganizationTracks,
  clearModules,
  fetchOrganizations,
  createSimulationOrgMapping,
  fetchModuleSimulations,
  fetchSimulationList,
  fetchSimulation,
  fetchDefaultModuleSimulations,
  clearSimulations,
  fetchUsers,
  fetchQuestionList,
  fetchQuestionDetail,
  updateQuestion,
  createQuestion,
  fetchDonDonList,
  fetchDonDonDetails,
  fetchMagicphraseList,
  fetchMagicphraseDetails,
  fetchRegions,
  fetchStates,
  fetchCategories,
  fetchParameters,
  fetchTags,
  fetchContentComplexityLevel,
  loginUser,
  logoutUser,
  addMTF,
  fetchMTFList,
  editMTF,
  fetchMTFDetails,
  addQuad,
  fetchQuadList,
  editQuad,
  fetchQuadDetails,
  fetchComprehensionsList,
  addComprehension,
  updateComprehension,
  fetchAllComprehensions,
  fetchComprehensionDetail,
  fetchFlashCardsList
};

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
  if (response.status === 200) {
    dispatch({ type: ACTION_TYPE.FETCH_MODULE_TRACKS, payload: response.data });
  } else {
    dispatch({ type: ACTION_TYPE.FETCH_MODULE_TRACKS_ERROR });
  }
};

export const fetchModuleTrack = (authToken, id) => async dispatch => {
  const response = await pyLearningApi(authToken).get(
    `/react/track/list?track_id=${id}`
  );
  if (response.status === 200)
    dispatch({ type: ACTION_TYPE.FETCH_MODULE_TRACK, payload: response.data });
  else dispatch({ type: ACTION_TYPE.FETCH_MODULE_TRACK_ERROR });
};

export const createModuleTrack = (authToken, formValues) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    "/react/track/create/",
    qs.stringify(formValues)
  );
  if (response.status === 200) {
    dispatch({ type: ACTION_TYPE.CREATE_MODULE_TRACK, payload: response.data });
    const id = response.data.result.track_id;
    history.push(`/tracks/map/module/${id}`);
  } else dispatch({ type: ACTION_TYPE.CREATE_MODULE_TRACK_ERROR });
};

export const createModuleTrackMapping = (
  authToken,
  formValues
) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    "/react/track/module/map/",
    qs.stringify(formValues)
  );
  if (response.status === 200) {
    dispatch({
      type: ACTION_TYPE.CREATE_MODULE_TRACK_MAPPING,
      payload: response.data
    });
    history.push("/tracks");
  } else dispatch({ type: ACTION_TYPE.CREATE_MODULE_TRACK_MAPPING_ERROR });
};

export const createUserTrackMapping = (
  authToken,
  formValues
) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    "/react/user/track/mapping/",
    qs.stringify(formValues)
  );
  if (response.status === 200) {
    dispatch({
      type: ACTION_TYPE.CREATE_USER_TRACK_MAPPING,
      payload: response.data
    });
    history.push("/tracks");
  } else dispatch({ type: ACTION_TYPE.CREATE_USER_TRACK_MAPPING_ERROR });
};

// ENTITY MANAGEMENT

export const fetchModules = authToken => async dispatch => {
  const response = await pyLearningApi(authToken).get("module/list/react");
  dispatch({ type: ACTION_TYPE.FETCH_MODULES, payload: response.data });
};
