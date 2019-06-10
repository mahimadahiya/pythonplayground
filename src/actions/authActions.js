import authApi from "../apis/login";
import qs from "querystring";
import * as ACTION_TYPE from "./actionTypes";

export const loginUser = formValues => async dispatch => {
  const response = await authApi.post(
    "/v2/accounts/auth/signin/",
    qs.stringify(formValues)
  );
  dispatch({ type: ACTION_TYPE.LOGIN_USER, payload: response.data });
};

export const logoutUser = () => {
  return {
    type: ACTION_TYPE.LOGOUT_USER
  };
};
