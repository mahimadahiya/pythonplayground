import * as ACTION_TYPE from "../actions/actionTypes";
import _ from "lodash";

const INITIAL_STATE = {
  moduleSimulations: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_MODULE_SIMULATION:
      return {
        ...state,
        moduleSimulations: _.mapKeys(
          action.payload.result,
          "id"
        )
      };
    default:
      return state;
  }
};
