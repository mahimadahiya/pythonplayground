import pyLearningApi from "../apis/pylearning";
import adminPanelApi from "../apis/adminPanel";
import * as ACTION_TYPE from "./actionTypes";
import qs from "querystring";
import history from "../history";
import { source } from "../apis/cancel";

export const fetchModuleSimulations = (
  authToken,
  module_id
) => async dispatch => {
  const response = await pyLearningApi(authToken).get(
    `/simulation/list_questions?module_id=${module_id}`,
    { cancelToken: source.token }
  );
  dispatch({
    type: ACTION_TYPE.FETCH_MODULE_SIMULATION,
    payload: response.data
  });
};

export const fetchDefaultModuleSimulations = (
  authToken,
  formValues
) => async dispatch => {
  const response = await pyLearningApi(authToken).get(
    `/simulation/view_mapped?organization_id=${
      formValues.organization_id
    }&module_id=${formValues.module_id}`
  );
  dispatch({
    type: ACTION_TYPE.FETCH_DEFAULT_SIMULATIONS,
    payload: response.data
  });
};

export const createSimulationOrgMapping = (
  authToken,
  formValues
) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    `/simulation/organization_map/`,
    qs.stringify(formValues)
  );
  dispatch({
    type: ACTION_TYPE.CREATE_SIMULATION_ORG_MAPPING,
    payload: response.data
  });
};

export const fetchSimulationList = (authToken, offset) => async dispatch => {
  let response = null;
  let flag = 0;
  if (offset) {
    response = await adminPanelApi(authToken)
      .get(`/v1/admin/simulations?limit=10&offset=${offset}`, {
        cancelToken: source.token
      })
      .catch(err => (flag = 1));
  } else {
    response = await adminPanelApi(authToken)
      .get(`/v1/admin/simulations`, {
        cancelToken: source.token
      })
      .catch(err => (flag = 1));
  }
  if (flag == 0) {
    dispatch({
      type: ACTION_TYPE.FETCH_SIMULATION_LIST,
      payload: response.data
    });
    history.push("/simulation");
  }
};

export const fetchSimulation = (authToken, id) => async dispatch => {
  const response = await adminPanelApi(authToken).get(
    `v1/admin/simulations/detail?question_id=${id}`
  );
  dispatch({
    type: ACTION_TYPE.FETCH_SIMULATION,
    payload: response.data
  });
};

export const clearSimulations = () => {
  return {
    type: ACTION_TYPE.CLEAR_SIMULATIONS
  };
};
