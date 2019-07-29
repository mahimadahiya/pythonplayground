import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  step: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.ARTICLE_SETSTEP:
      return {
        ...state,
        step: action.payload
      };
    default:
      return state;
  }
};
