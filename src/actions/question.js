import adminPanelApi from '../apis/adminPanel'
import * as ACTION_TYPE from "./actionTypes";
import qs from "querystring";

export const fetchQuestionList = (authToken) => async dispatch => {
  const response = await adminPanelApi(authToken).get("/v1/admin/questions");
  dispatch( { type: ACTION_TYPE.FETCH_QUESTIONS, payload: response.data.result })
  
}

export const fetchQuestionDetail = (id,authToken) => async dispatch => {
  const response = await adminPanelApi(authToken).get(`/v1/admin/question/${id}`);
  dispatch( { type: ACTION_TYPE.FETCH_QUESTION_DETAIL, payload: response.data.result })

}

export const updateQuestion = (id, authToken, formValues) => async dispatch => {
  const response = await adminPanelApi(authToken).put(`/v1/admin/question/${id}`, qs.stringify(formValues));
  dispatch( { type: ACTION_TYPE.UPDATE_QUESTION, payload: response.data.result })

}