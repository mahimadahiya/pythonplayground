import { combineReducers } from "redux";
<<<<<<< HEAD
import { reducer as formReducer } from "redux-form";
import authReducer from './authReducer'
import moduleTrackReducer from './moduleTrackReducer'
import organizationReducer from './organizationReducer'
=======
import authReducer from "./authReducer";
import moduleTrackReducer from "./moduleTrackReducer";
import organizationReducer from "./organizationReducer";
import questionReducer from "./questionReducer";
>>>>>>> 1ac65ca... Added error boundary

export default combineReducers({
  userAuth: authReducer,
  moduleTrack: moduleTrackReducer,
  organization: organizationReducer
});
