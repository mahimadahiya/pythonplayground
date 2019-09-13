import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  list: [],
  count: null,
  quadDetail: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_QUAD_LIST:
      return {
        ...state,
        list: action.payload.results,
        count: action.payload.count
      };
    case ACTION_TYPE.FETCH_QUAD_DETAILS:
      return {
        ...state,
        quadDetail: action.payload.result
      };
    default:
      return state;
  }
};
