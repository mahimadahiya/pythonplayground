import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  list: [],
  count: 0,
  comprehensionDetail: null,
  full_list: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_COMPREHENSION_LIST:
      return {
        ...state,
        list: action.payload.results,
        count: action.payload.count
      };
    case ACTION_TYPE.FETCH_COMPREHENSION_DETAIL:
      return {
        ...state,
        comprehensionDetail: action.payload
      };
    case ACTION_TYPE.FETCH_ALL_COMPREHENSIONS:
      return {
        ...state,
        full_list: action.payload
      };
    default:
      return state;
  }
};
