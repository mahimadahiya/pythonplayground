import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from './authReducer'
import moduleTrackReducer from './moduleTrackReducer'
import organizationReducer from './organizationReducer'
import questionReducer from './questionReducer'

export default combineReducers({
  form: formReducer,
  userAuth: authReducer,
  moduleTrack: moduleTrackReducer,
  organization: organizationReducer,
  question: questionReducer
});
