import * as ACTION_TYPE from "../actions/actionTypes";
import _ from "lodash";

const INITIAL_STATE = {
  questionsList: {},
  questionDetail: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_QUESTIONS:
      return {
        ...state,
        questionsList: _.mapKeys(action.payload.results, "id"),
        count: action.payload.count
      };
    case ACTION_TYPE.FETCH_QUESTION_DETAIL:
      return {
        ...state,
        questionDetail: action.payload
      };
    default:
      return state;
  }
};
