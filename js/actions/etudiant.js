/**
 * Created by pierremarsot on 09/07/2017.
 */
import {put, get} from '../tools/Api';
import Toast from 'react-native-simple-toast';

export const LOADING_PERSONAL_INFORMATIONS = 'LOADING_PERSONAL_INFORMATIONS';

export const LOAD_PERSONAL_INFORMATIONS_SUCCESS = 'LOAD_PERSONAL_INFORMATIONS_SUCCESS';
export const LOAD_PERSONAL_INFORMATIONS_ERROR = 'LOAD_PERSONAL_INFORMATIONS_ERROR';

export const CHANGE_INFORMATIONS_SUCCESS = 'CHANGE_INFORMATIONS_SUCCESS';
export const CHANGE_INFORMATIONS_ERROR = 'CHANGE_INFORMATIONS_ERROR';

function changeInformationsSuccess(informations) {
  return {
    type: CHANGE_INFORMATIONS_SUCCESS,
    nom: informations.nom,
    prenom: informations.prenom,
  };
}

function changeInformationsError() {
  return {
    type: CHANGE_INFORMATIONS_ERROR,
  };
}

export function changeInformations(nom, prenom) {
  return dispatch => {

    if (!nom || nom.length === 0) {
      Toast.show('Vous devez spécifier un nom.');
      return dispatch(changeInformationsError());
    }

    if (!prenom || prenom.length === 0) {
      Toast.show('Vous devez spécifier un prénom.');
      return dispatch(changeInformationsError());
    }

    const informations = {
      nom: nom,
      prenom: prenom,
    };

    put('/api/etudiant/change/informations', informations)
      .then(() => {
        Toast.show('Informations modifiées avec succès.');
        return dispatch(changeInformationsSuccess(informations));
      })
      .catch((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }
        return dispatch(changeInformationsError());
      });
  };
}

function loadingPersonalInformations(){
  return {
    type: LOADING_PERSONAL_INFORMATIONS,
  };
}

function loadPersonalInformationsSuccess(nom, prenom){
  return {
    type: LOAD_PERSONAL_INFORMATIONS_SUCCESS,
    nom: nom,
    prenom: prenom,
  }
}

function loadPersonalInformationsError(){
  return {
    type: LOAD_PERSONAL_INFORMATIONS_ERROR,
  }
}

export function loadPersonnalInformations(){
  return dispatch => {
    dispatch(loadingPersonalInformations());

    get('/api/etudiant')
      .then(response => response.json())
      .then((response) => {
        dispatch(loadingPersonalInformations());

        if(response && response.profile && response.profile._source){
          return dispatch(loadPersonalInformationsSuccess(response.profile._source.nom, response.profile._source.prenom));
        }

        return false;
      })
      .catch((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }

        dispatch(loadingPersonalInformations());
        return dispatch(loadPersonalInformationsError());
      });
  };
}