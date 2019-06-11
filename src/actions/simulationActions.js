import pyLearningApi from "../apis/pylearning";
import adminPanelApi from "../apis/adminPanel";
import * as ACTION_TYPE from "./actionTypes";
import qs from "querystring";
import history from "../history";

export const fetchModuleSimulations = (
  authToken,
  module_id
) => async dispatch => {
  const response = await pyLearningApi(authToken).get(
    `/simulation/list_questions?module_id=${module_id}`
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

export const fetchSimulationList = authToken => async dispatch => {
  const response = await adminPanelApi(authToken).get("/v1/admin/simulations");
  dispatch({
    type: ACTION_TYPE.FETCH_SIMULTATION_LIST,
    payload: response.data
  });
  history.push('/simulation')
};
