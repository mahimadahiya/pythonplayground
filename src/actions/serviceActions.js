import pyLearningApi from "../apis/pylearning";

export const fetchAllServices = async authToken => {
  const response = await pyLearningApi(authToken).get("/service/list/react");
  return response.data.result.category_list;
};
