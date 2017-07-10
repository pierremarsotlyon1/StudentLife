/**
 * Created by stan229 on 5/27/16.
 */
import {combineReducers} from "redux";
import auth from "./auth";
import semestre from "./semestre";

export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    auth: auth,
    semestre: semestre,
  });
}
