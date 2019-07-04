import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  list: [],
  count: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_MTF_LIST:
      return {
        ...state,
        list: action.payload.results,
        count: action.payload.count
      };
    default:
      return state;
  }
};
