/**
 * Created by pierremarsot on 09/07/2017.
 */
import {put} from '../tools/Api';
import Toast from 'react-native-simple-toast';

export const CHANGE_INFORMATIONS_SUCCESS = 'CHANGE_INFORMATIONS_SUCCESS';
export const CHANGE_INFORMATIONS_ERROR = 'CHANGE_INFORMATIONS_ERROR';

function changeInformationsSuccess() {
  return {
    type: CHANGE_INFORMATIONS_SUCCESS,
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

    put('/api/etudiant/change/informations', {
      nom: nom,
      prenom: prenom,
    })
      .then(() => {
        Toast.show('Informations modifiées avec succés.');
        return dispatch(changeInformationsSuccess());
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