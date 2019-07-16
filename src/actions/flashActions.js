import * as ACTION_TYPE from "./actionTypes";
import pyLearningApi from "../apis/pylearning";
import qs from "querystring";

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
  await pyLearningApi(authToken).post("/flashcard/add", qs.stringify(values));
  dispatch({ type: ACTION_TYPE.ADD_FLASH });
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
