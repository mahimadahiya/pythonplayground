import * as ACTION_TYPE from "../actions/actionTypes";
import _ from "lodash";

const INTIAL_STATE = {
  moduleTracks: [],
  error: false
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_MODULE_TRACKS:
      return {
        ...state,
        moduleTracks: _.mapKeys(action.payload.result.track_list, "id")
      };
    case ACTION_TYPE.FETCH_MODULE_TRACKS_ERROR:
      return {
        ...state,
        error: true
      };
    case ACTION_TYPE.CREATE_MODULE_TRACK_ERROR:
      return {
        ...state,
        error: true
      };
    case ACTION_TYPE.CREATE_MODULE_TRACK_MAPPING_ERROR:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};
