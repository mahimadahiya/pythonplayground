import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  traits: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_TRAITS_LIST:
      return {
        ...state,
        traits: action.payload.result.trait_details
      };
    default:
      return state;
  }
};
