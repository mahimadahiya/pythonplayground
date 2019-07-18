import * as ACTION_TYPE from "./actionTypes";
import pyLearningApi from "../apis/pylearning";
import qs from "querystring";
import history from "../history";

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

export const fetchFlashCardsList = (authToken, values) => async dispatch => {
  let response = null;
  let filters = values.fields;
  console.log(filters);
  clean(filters);
  filters = JSON.stringify(filters);

  if (values.searchText) {
    response = await pyLearningApi(authToken).get(
      `/flashcards/list?search=${values.searchText}&offset=${
        values.offset
      }&filters=${filters}`
    );
  } else {
    response = await pyLearningApi(authToken).get(
      `/flashcards/list?offset=${values.offset}&filters=${filters}`
    );
  }
  dispatch({
    type: ACTION_TYPE.FETCH_FLASHCARDS_LIST,
    payload: response.data
  });
};

export const addFlashCard = (authToken, values) => async dispatch => {
  const result = await pyLearningApi(authToken).post(
    "/flashcard/add",
    qs.stringify(values)
  );
  dispatch({ type: ACTION_TYPE.ADD_FLASH });
  if (result.status === 200) {
    history.push("/flashcard");
  }
};

export const deleteFlashCard = (authToken, value) => async dispatch => {
  await pyLearningApi(authToken).post("/flashcard/delete", qs.stringify(value));
  dispatch({ type: ACTION_TYPE.DELETE_FLASH });
};

export const fetchFlashDetails = (authToken, id) => async dispatch => {
  const response = await pyLearningApi(authToken).get(
    `/flash_card/show_details?flash_card_id=${id}`
  );
  dispatch({ type: ACTION_TYPE.FETCH_FLASH_DETAILS, payload: response.data });
};

export const editFlashCard = (authToken, values) => async dispatch => {
  const result = await pyLearningApi(authToken).post(
    "/flashcard/edit",
    qs.stringify(values)
  );
  dispatch({ type: ACTION_TYPE.EDIT_FLASH });
  if (result.status === 200) {
    history.push("/flashcard");
  }
};

export const fetchModulesFlash = (authToken, entity_type) => async dispatch => {
  let response = null;
  if (entity_type === 1) {
    response = await pyLearningApi(authToken).get("/module/list/react");
    dispatch({
      type: ACTION_TYPE.FETCH_MODULES_FLASH,
      payload: response.data.result.category_list
    });
  } else {
    response = await pyLearningApi(authToken).get("/react/fmcourse/list/");
    dispatch({
      type: ACTION_TYPE.FETCH_MODULES_FLASH,
      payload: response.data.result
    });
  }
};

export const fetchMappedCards = (authToken, values) => async dispatch => {
  const response = await pyLearningApi(authToken).get("/flash_card/mapped", {
    params: {
      entity_id: values.entity_id,
      entity_type: values.entity_type
    }
  });
  dispatch({ type: ACTION_TYPE.FETCH_MAPPED_CARDS, payload: response.data });
};

export const mapFlashCards = (authToken, values) => async dispatch => {
  const response = await pyLearningApi(authToken).post(
    "/flash_card/map/",
    qs.stringify(values)
  );
  dispatch({ type: "MAP_FLASH_CARDS" });
  if (response.status === 200) {
    history.push("/flashcard");
  }
};
