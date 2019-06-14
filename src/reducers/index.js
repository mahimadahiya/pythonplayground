import { combineReducers } from "redux";
import authReducer from "./authReducer";
import moduleTrackReducer from "./moduleTrackReducer";
import organizationReducer from "./organizationReducer";
import questionReducer from "./questionReducer";
import userTrackReducer from "./userTrackReducer";
import simulationReducer from "./simulationReducer"
import dondonReducer from "./dondonReducer";

export default combineReducers({
  userAuth: authReducer,
  moduleTrack: moduleTrackReducer,
  organization: organizationReducer,
  question: questionReducer,
  userTrack: userTrackReducer,
  simulation: simulationReducer,
  dondon: dondonReducer
});
