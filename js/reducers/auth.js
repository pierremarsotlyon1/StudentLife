/**
 * Created by pierremarsot on 23/06/2017.
 */
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  SET_TOKEN,
  LOGOUT,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from '../actions/auth';
import moment from 'moment';

const initialState = {
  token: '',
  lastChangePassword: '',
};

export default function auth(state = initialState, action = {}){
  let token;

  switch(action.type){
    case CHANGE_PASSWORD_SUCCESS:
      console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
      return {
        ...state,
        lastChangePassword: moment().format('YYYY-MM-DD HH:mm:ss')
      };

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