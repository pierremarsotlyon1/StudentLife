/**
 * Created by stan229 on 5/27/16.
 */
import {combineReducers} from "redux";
import auth from "./auth";
import semestre from "./semestre";
import bonPlans from './bonplans';
import calendar from './calendar';
import etudiant from './etudiant';
import jobs from './jobs';

export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    auth: auth,
    semestre: semestre,
    bonPlans: bonPlans,
    calendar: calendar,
    etudiant: etudiant,
    jobs: jobs,
  });
}
