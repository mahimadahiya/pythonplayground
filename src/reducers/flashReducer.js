import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  list: [],
  count: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_FLASHCARDS_LIST:
      console.log("here");
      return {
        ...state,
        list: action.payload.results,
        count: action.payload.count
      };
    default:
      return state;
  }
};
