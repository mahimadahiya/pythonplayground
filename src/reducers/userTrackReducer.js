import * as ACTION_TYPE from "../actions/actionTypes";

const INIT_STATE = {
  error: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.CREATE_USER_TRACK_MAPPING_ERROR:
      return {
        ...state,
        error: true
      };
    default:
      return INIT_STATE;
  }
};
