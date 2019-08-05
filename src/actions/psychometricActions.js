import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

import * as ACTION_TYPE from "./actionTypes";

export const fetchTraitsList = authToken => async dispatch => {
  const response = await adminPanelApi(authToken).post("/v1/admin/list/trait");
  dispatch({
    type: ACTION_TYPE.FETCH_TRAITS_LIST,
    payload: response.data
  });
};

export const createTrait = async (authToken, values) => {
  await adminPanelApi(authToken).post(
    "/v1/admin/create/trait/",
    qs.stringify(values)
  );
};

export const fetchQuestionBankList = async authToken => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/question/bank/list"
  );
  return response.data.result.q_bank_details;
};

export const fetchTraitsQuestionsList = async (authToken, id) => {
  const response = await adminPanelApi(authToken).get(
    "/v1/admin/q_bank/question/list",
    {
      params: {
        q_bank_id: id
      }
    }
  );

  return response.data.result.question_details;
};

export const mapTraitType1 = async (authToken, values) => {
  await adminPanelApi(authToken).post(
    "/v1/admin/map/trait/option/",
    qs.stringify(values)
  );
};
