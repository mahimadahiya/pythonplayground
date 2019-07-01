import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  levels: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_CONTENT_COMPLEXITY_LEVEL:
      return {
        ...state,
        levels: action.payload.result
      };
    default:
      return state;
  }
};
