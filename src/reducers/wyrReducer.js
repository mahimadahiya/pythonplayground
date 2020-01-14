import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  series: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_SERIES_LIST:
      return {
        ...state,
        series: action.payload.result
      };

    default:
      return state;
  }
};
