import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  list: [],
  count: 0,
  flash: null,
  modules: [],
  mappedCards: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_FLASHCARDS_LIST:
      return {
        ...state,
        list: action.payload.results,
        count: action.payload.count
      };
    case ACTION_TYPE.FETCH_FLASH_DETAILS:
      return {
        ...state,
        flash: action.payload.result
      };
    case ACTION_TYPE.FETCH_MODULES_FLASH:
      return {
        ...state,
        modules: action.payload
      };
    case ACTION_TYPE.FETCH_MAPPED_CARDS:
      return {
        ...state,
        mappedCards: action.payload.result
      };
    default:
      return state;
  }
};
