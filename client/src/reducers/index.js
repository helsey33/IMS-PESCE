import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import conferenceReducer from "./conferenceReducer";
import journalReducer from "./journalReducer";
import workshopReducer from "./workshopReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  conference: conferenceReducer,
  journal: journalReducer,
  workshop: workshopReducer
});
