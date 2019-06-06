import { combineReducers } from "redux";
<<<<<<< HEAD
import authReducer from "./authReducer";
import moduleTrackReducer from "./moduleTrackReducer";
import organizationReducer from "./organizationReducer";
import questionReducer from "./questionReducer";
=======
import { reducer as formReducer } from "redux-form";
import authReducer from './authReducer'
import moduleTrackReducer from './moduleTrackReducer'
import organizationReducer from './organizationReducer'
import questionReducer from './questionReducer'
>>>>>>> e9360d8... Add question related action/reducers.

export default combineReducers({
  userAuth: authReducer,
  moduleTrack: moduleTrackReducer,
  organization: organizationReducer,
  question: questionReducer
});
