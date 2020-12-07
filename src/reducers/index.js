import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { event } from "./event.reducer";
import { video } from "./video.reducer";

// one store have mutiple reducers
const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  event,
  video,
});

export default rootReducer;
