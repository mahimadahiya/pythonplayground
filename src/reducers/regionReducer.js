import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  regions: [],
  states: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_REGIONS:
      return {
        ...state,
        regions: action.payload.result
      };
    case ACTION_TYPE.FETCH_STATES:
      return {
        ...state,
        states: action.payload.result
      };
    default:
      return state;
  }
};
