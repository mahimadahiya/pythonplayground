import adminPanelApi from "../apis/adminPanel";
import * as ACTION_TYPE from "./actionTypes";
import qs from "querystring";
import pyLearningApi from "../apis/pylearning";

export const getOrganizationModules = (orgId, authToken) => async dispatch => {
  const response = await adminPanelApi(authToken).post(
    "/v1/admin/list/organization/modules/",
    qs.stringify({ organization_id: orgId })
  );
  dispatch({
    type: ACTION_TYPE.FETCH_ORGANIZATION_MODULES,
    payload: response.data
  });
};

export const fetchOrganizations = authToken => async dispatch => {
  const response = await pyLearningApi(authToken).get(
    "organization/list/react"
  );
  dispatch({ type: ACTION_TYPE.FETCH_ORGANIZATIONS, payload: response.data });
};

export const fetchOrganizationBatches = (
  authToken,
  formValues
) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    "/react/organization/batch/list/",
    qs.stringify(formValues)
  );
  dispatch({
    type: ACTION_TYPE.FETCH_ORGANIZATION_BATCHES,
    payload: response.data
  });
};

export const fetchUsers = (authToken, formValues, offset) => async dispatch => {
  let response = null;
  if (!formValues.batchId) {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/list/batch/user/?organization_id=${
        formValues.orgId
      }&limit=10&offset=${offset}`
    );
  } else {
    response = await adminPanelApi(authToken).get(
      `/v1/admin/list/batch/user/?organization_id=${
        formValues.orgId
      }&batch_id=${formValues.batchId}&limit=10&offset=${offset}`
    );
  }

  dispatch({
    type: ACTION_TYPE.FETCH_USERS,
    payload: response.data
  });
};

export const fetchOrganizationTracks = (
  authToken,
  formValues
) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    "/react/organization/track/list/",
    qs.stringify(formValues)
  );
  dispatch({
    type: ACTION_TYPE.FETCH_ORGANIZATION_TRACKS,
    payload: response.data
  });
};

export const clearModules = () => {
  return {
    type: ACTION_TYPE.CLEAR_MODULES
  };
};
