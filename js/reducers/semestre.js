/**
 * Created by pierremarsot on 24/06/2017.
 */
import {
  LOAD_SEMESTRES_SUCCESS,
  ADD_SEMESTRE_ERROR,
  ADD_SEMESTRE_SUCCESS,
  UPDATE_SEMESTRE_SUCCESS,
  REMOVE_SEMESTRE_SUCCESS,
} from '../actions/semestres';

const initialState = {
  semestres: [],
};

export default function semestres(state = initialState, action = {}){
  let semestres, semestre, id;

  switch(action.type){
    case LOAD_SEMESTRES_SUCCESS:
      semestres = action.semestres;

      if(!semestres){
        return {
          ...state,
          semestres: [],
        };
      }

      return {
        ...state,
        semestres: semestres,
      };

    case ADD_SEMESTRE_SUCCESS:
      semestre = action.semestre;

      if(!semestre){
        return state;
      }

      return {
        ...state,
        semestres: state.semestres.concat(semestre),
      };

    case UPDATE_SEMESTRE_SUCCESS:
      semestre = action.semestre;
      id = action.id;

      if(!semestre || !id){
        return state;
      }

      return {
        ...state,
        semestres: state.semestres.map((s) => {
          if(s.id === id){
            return Object.assign({}, semestre);
          }

          return s;
        }),
      };

    case REMOVE_SEMESTRE_SUCCESS:
      id = action.id;
      if(!id || id.length === 0){
        return state;
      }

      return {
        ...state,
        semestres: state.semestres.filter((s) => {
          return s.id !== id;
        }),
      };

    default:
      return state;
  }
}