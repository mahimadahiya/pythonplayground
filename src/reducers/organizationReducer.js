import * as ACTION_TYPE from "../actions/actionTypes";
import _ from "lodash";

const INITIAL_STATE = {
  organizationList: {},
  currentOrganization: null,
  organizationBatches: {},
  organizationTracks: {},
  organizationModules: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_ORGANIZATIONS:
      return {
        ...state,
        organizationList: _.mapKeys(
          action.payload.result.organization_list,
          "id"
        )
      };
    case ACTION_TYPE.FETCH_ORGANIZATION_BATCHES:
      return {
        ...state,
        organizationBatches: _.mapKeys(action.payload.result, "id")
      };
    case ACTION_TYPE.FETCH_ORGANIZATION_TRACKS:
      return {
        ...state,
        organizationTracks: _.mapKeys(action.payload.result, "id")
      };
    case ACTION_TYPE.FETCH_ORGANIZATION_MODULES:
      return {
        ...state,
        organizationModules: _.mapKeys(action.payload.result, "module_id")
      };
    default:
      return state;
  }
};
