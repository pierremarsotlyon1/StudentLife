/**
 * Created by pierremarsot on 23/06/2017.
 */
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  SET_TOKEN,
  LOGOUT
} from '../actions/auth';

const initialState = {
  token: '',
};

export default function auth(state = initialState, action = {}){
  let token;

  switch(action.type){
    case SET_TOKEN:
    case LOGIN_SUCCESS:
      token = action.token;

      if(!token){
        return {
          ...state,
          token: '',
        };
      }

      return {
        ...state,
        token: token,
      };

    case REGISTER_SUCCESS:
      token = action.token;

      if(!token){
        return {
          ...state,
          token: '',
        };
      }

      return {
        ...state,
        token: token,
      };

    case LOGOUT:
      return {
        ...state,
        token: '',
      };

    default:
      return state;
  }
}