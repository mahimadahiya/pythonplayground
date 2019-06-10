import pyLearningApi from "../apis/pylearning";
import * as ACTION_TYPE from "./actionTypes";
import qs from "querystring";

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

export const createSimulationOrgMapping = (
  authToken,
  formValues
) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    `/simulation/organization_map`, qs.stringify(formValues)
  );
  dispatch({
    type: ACTION_TYPE.CREATE_SIMULATION_ORG_MAPPING,
    payload: response.data
  });
};
