/**
 * Created by pierremarsot on 21/07/2017.
 */
import {
  LOAD_EVENTS_ERROR,
  LOAD_EVENTS_SUCCESS,
  UPDATE_URL_ICS_ERROR,
  UPDATE_URL_ICS_SUCCESS,
} from '../actions/calendar';

const initialState = {
  events: [],
  urlIcs: '',
};

export default function calendar(state = initialState, action = {}){
  switch(action.type){
    case LOAD_EVENTS_SUCCESS:
      if(!action.events){
        return {
          ...state,
          events: [],
        };
      }

      return {
        ...state,
        events: action.events,
      };

    case UPDATE_URL_ICS_SUCCESS:
      if(!action.urlIcs){
        return {
          ...state,
          urlIcs: '',
        };
      }

      return {
        ...state,
        urlIcs: action.urlIcs,
      };

    default:
      return state;
  }
}