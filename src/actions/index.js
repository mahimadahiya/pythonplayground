import authApi from '../apis/login'
import pyLearningApi from '../apis/pylearning'

import qs from 'querystring'
import * as ACTION_TYPE from './actionTypes'


// USER
export const loginUser = (formValues) => async dispatch => {
  const response = await authApi.post("/v2/accounts/auth/signin/", qs.stringify(formValues));
  dispatch({ type:ACTION_TYPE.LOGIN_USER,  payload: response.data})
}

export const setUserAuthValue = (formValues) => {
  return {
    type: ACTION_TYPE.SET_USER_AUTH,
    payload: formValues
  };
};


// MODULE TRACKS

export const fetchModuleTracks = (authToken) => async dispatch => {
  const response = await pyLearningApi(authToken).get("/react/track/list");
  dispatch( { type: ACTION_TYPE.FETCH_MODULE_TRACKS, payload: response.data })
}

export const createModuleTrack = (authToken, formValues) => async dispatch => {
  const response = await pyLearningApi(authToken).post("/react/track/create/")
  dispatch( { type: ACTION_TYPE.CREATE_MODULE_TRACK, payload: response.data})
}