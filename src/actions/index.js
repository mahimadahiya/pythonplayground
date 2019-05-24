import authApi from '../apis/login'
import qs from 'querystring'



export const loginUser = (formValues) => async dispatch => {
  const response = await authApi.post("/v2/accounts/auth/signin/", qs.stringify(formValues));
  dispatch({ type:"LOGIN_USER",  payload: response.data})
}

export const setUserAuthValue = (formValues) => {
  return {
    type: "SET_USER_AUTH",
    payload: formValues
  };
};