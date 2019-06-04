import * as ACTION_TYPE from "../actions/actionTypes";
import _ from "lodash";

const INTIAL_STATE = {
  moduleTracks: []
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_MODULE_TRACKS:
      return {
        ...state,
        moduleTracks: _.mapKeys(action.payload.result.track_list, "id")
      };
    default:
      return state;
  }
};
