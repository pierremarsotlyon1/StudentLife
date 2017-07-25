import {
  CHANGE_INFORMATIONS_ERROR,
  CHANGE_INFORMATIONS_SUCCESS,
  LOADING_PERSONAL_INFORMATIONS,
  LOAD_PERSONAL_INFORMATIONS_SUCCESS,
  LOAD_PERSONAL_INFORMATIONS_ERROR,
} from '../actions/etudiant';

const initialState = {
  nom: '',
  prenom: '',
  loadingPersonalInformations: false,
};

export default function etudiant(state = initialState, action = {}){
  switch(action.type){
    case CHANGE_INFORMATIONS_SUCCESS:
      if(!action.nom || !action.prenom){
        return state;
      }

      return {
        ...state,
        nom: action.nom,
        prenom: action.prenom,
      };

    case LOADING_PERSONAL_INFORMATIONS:
      return {
        ...state,
        loadingPersonalInformations: !state.loadingPersonalInformations,
      };

    case LOAD_PERSONAL_INFORMATIONS_SUCCESS:
      if(!action.nom || !action.prenom){
        return state;
      }

      return {
        ...state,
        nom: action.nom,
        prenom: action.prenom,
      };

    default:
      return state;
  }
}