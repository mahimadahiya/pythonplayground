import adminPanelApi from "../apis/adminPanel";
import qs from "querystring";

export const fetchTraitsList = async authToken => {
  const response = await adminPanelApi(authToken).post("/v1/admin/list/trait");
  return response.data.result.trait_details;
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
