import * as ACTION_TYPE from "../actions/actionTypes";

const INIT_STATE = {
  serviceMap: {},
  moduleMap: {}
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.CREATE_SERVICE_MAP:
      return { ...state, serviceMap: action.payload };
    case ACTION_TYPE.CREATE_MODULE_MAP:
      return { ...state, moduleMap: action.payload };
    default:
      return state;
  }
};
