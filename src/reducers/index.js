import { combineReducers } from "redux";
import authReducer from "./authReducer";
import moduleTrackReducer from "./moduleTrackReducer";
import organizationReducer from "./organizationReducer";
import questionReducer from "./questionReducer";
import userTrackReducer from "./userTrackReducer";

export default combineReducers({
  userAuth: authReducer,
  moduleTrack: moduleTrackReducer,
  organization: organizationReducer,
  question: questionReducer,
  userTrack: userTrackReducer
});
