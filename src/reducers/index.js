import { combineReducers } from "redux";
import authReducer from "./authReducer";
import moduleTrackReducer from "./moduleTrackReducer";
import organizationReducer from "./organizationReducer";
import questionReducer from "./questionReducer";
import userTrackReducer from "./userTrackReducer";
import simulationReducer from "./simulationReducer";
import dondonReducer from "./dondonReducer";
import magicphraseReducer from "./magicphraseReducer";
import regionReducer from "./regionReducer";
import contentReducer from "./contentReducer";
import categoryReducer from "./categoryReducer";
import mtfReducer from "./mtfReducer";
import quadReducer from "./quadReducer";
import comprehensionReducer from "./comprehensionReducer";
import flashReducer from "./flashReducer";
import articleReducer from "./articleReducer";

export default combineReducers({
  userAuth: authReducer,
  moduleTrack: moduleTrackReducer,
  organization: organizationReducer,
  question: questionReducer,
  userTrack: userTrackReducer,
  simulation: simulationReducer,
  dondon: dondonReducer,
  magicphrase: magicphraseReducer,
  region: regionReducer,
  contentComplexityLevel: contentReducer,
  category: categoryReducer,
  mtf: mtfReducer,
  quad: quadReducer,
  comprehension: comprehensionReducer,
  flashcard: flashReducer,
  article: articleReducer
});
