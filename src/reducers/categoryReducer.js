import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  categories: [],
  parameters: [],
  tags: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload.result
      };
    case ACTION_TYPE.FETCH_PARAMETERS:
      return {
        ...state,
        parameters: action.payload.result
      };
    case ACTION_TYPE.FETCH_TAGS:
      return {
        ...state,
        tags: action.payload.result
      };
    default:
      return state;
  }
};
