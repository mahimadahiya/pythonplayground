import pyLearningApi from "../apis/pylearning";

export const fetchModules = async authToken => {
  const response = await pyLearningApi(authToken).get("module/list/react");
  return response.data.result.category_list;
};
