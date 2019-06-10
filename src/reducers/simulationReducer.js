import * as ACTION_TYPE from "../actions/actionTypes";
import _ from "lodash";

const INITIAL_STATE = {
  moduleSimulations: {},
  simulations: []
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
        simulations: action.payload.result
      };
    default:
      return state;
  }
};
