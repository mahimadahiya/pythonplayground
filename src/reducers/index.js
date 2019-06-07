import { combineReducers } from "redux";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1ac65ca... Added error boundary
import authReducer from "./authReducer";
import moduleTrackReducer from "./moduleTrackReducer";
import organizationReducer from "./organizationReducer";
import questionReducer from "./questionReducer";
<<<<<<< HEAD
=======
import { reducer as formReducer } from "redux-form";
import authReducer from './authReducer'
import moduleTrackReducer from './moduleTrackReducer'
import organizationReducer from './organizationReducer'
import questionReducer from './questionReducer'
>>>>>>> e9360d8... Add question related action/reducers.
=======
>>>>>>> 1ac65ca... Added error boundary

export default combineReducers({
  userAuth: authReducer,
  moduleTrack: moduleTrackReducer,
  organization: organizationReducer,
  question: questionReducer
});
