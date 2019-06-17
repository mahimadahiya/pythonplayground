import * as ACTION_TYPE from "../actions/actionTypes";
import _ from "lodash";

const INITIAL_STATE = {
  moduleSimulations: {},
  simulations: [],
  defaultSimulations: null,
  count: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_MODULE_SIMULATION:
      return {
        ...state,
        moduleSimulations: _.mapKeys(action.payload.result, "id")
      };
    case ACTION_TYPE.FETCH_SIMULTATION_LIST:
      return {
        ...state,
        simulations: action.payload.results,
        count: action.payload.count
      };
    case ACTION_TYPE.FETCH_DEFAULT_SIMULATIONS:
      return {
        ...state,
        defaultSimulations: action.payload.result
      };
    case ACTION_TYPE.CLEAR_SIMULATIONS:
      return {
        ...state,
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};
