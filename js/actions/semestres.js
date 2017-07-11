/**
 * Created by pierremarsot on 23/06/2017.
 */
import {get, post, put, remove} from '../tools/Api';
import Toast from 'react-native-simple-toast';
const validator = require('validator');

export const LOAD_SEMESTRES_SUCCESS = 'LOAD_SEMESTRES_SUCCESS';
export const ADD_SEMESTRE_SUCCESS = 'ADD_SEMESTRE_SUCCESS';
export const ADD_SEMESTRE_ERROR = 'ADD_SEMESTRE_ERROR';

export const UPDATE_SEMESTRE_SUCCESS = 'UPDATE_SEMESTRE_SUCCESS';
export const UPDATE_SEMESTRE_ERROR = 'UPDATE_SEMESTRE_ERROR';

export const REMOVE_SEMESTRE_SUCCESS = 'REMOVE_SEMESTRE_SUCCESS';
export const REMOVE_SEMESTRE_ERROR = 'REMOVE_SEMESTRE_ERROR';

function loadSemestresSuccess(semestres) {
  return {
    type: LOAD_SEMESTRES_SUCCESS,
    semestres: semestres,
  };
}

export function loadSemestres() {
  return dispatch => {
    get('/api/etudiant/semestres')
      .then((response) => response.json())
      .then((response) => {
        return dispatch(loadSemestresSuccess(response));
      })
      .catch((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }
      });
  };
}

function addSemestreSuccess(semestre) {
  return {
    type: ADD_SEMESTRE_SUCCESS,
    semestre: semestre,
  };
}

function addSemestreError() {
  return {
    type: ADD_SEMESTRE_ERROR,
  };
}

export function addSemestre(nom, url, courant) {
  return dispatch => {
    if (!nom || nom.length === 0) {
      Toast.show('Vous devez spécifier le nom du semestre.');
      return dispatch(addSemestreError());
    }

    if (!url || url.length === 0) {
      Toast.show('Vous devez spécifier l\'url du flux rss (cf tomuss).');
      return dispatch(addSemestreError());
    }

    //On regarde si l'url est une url valide
    if(!validator.isURL(url)){
      Toast.show('L\'url n\'est pas valide');
      return false;
    }

    post('/api/etudiant/semestres', {
      name: nom,
      url: url,
      actif: courant,
    })
      .then((response) => response.json())
      .then((response) => {
        Toast.show('Semestre bien ajouté.');
        return dispatch(addSemestreSuccess(response));
      })
      .catch((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }
        return dispatch(addSemestreError());
      });
  };
}

function updateSemestreSuccess(id, semestre) {
  return {
    type: UPDATE_SEMESTRE_SUCCESS,
    semestre: semestre,
    id: id,
  };
}

function updateSemestreError() {
  return {
    type: UPDATE_SEMESTRE_ERROR,
  };
}

export function updateSemestre(id, nom, url, courant) {
  return (dispatch, getState) => {
    if (!id || id.length === 0) {
      Toast.show('Erreur lors de la récupération de l\'identifiant du semestre.');
      return dispatch(updateSemestreError());
    }

    if (!nom || nom.length === 0) {
      Toast.show('Vous devez spécifier le nom du semestre.');
      return dispatch(updateSemestreError());
    }

    if (!url || url.length === 0) {
      Toast.show('Vous devez spécifier l\'url du flux rss (cf tomuss).');
      return dispatch(updateSemestreError());
    }

    //On regarde si l'url est une url valide
    if(!validator.isURL(url)){
      Toast.show('L\'url n\'est pas valide');
      return false;
    }

    //On récup le semestre
    let semestre = getState().semestre.semestres.find((s) => {
      return s.id === id;
    });

    if (!semestre) {
      Toast.show('Erreur lors de la récupération du semestre.');
      return dispatch(updateSemestreError());
    }

    semestre = {
      ...semestre,
      name: nom,
      url: url,
      actif: courant,
    };

    put('/api/etudiant/semestres/' + id, semestre)
      .then((response) => {
        Toast.show('Semestre bien modifié.');
        return dispatch(updateSemestreSuccess(id, semestre));
      })
      .catch((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }
        return dispatch(updateSemestreError());
      });
  };
}

function removeSemestreSuccess(id) {
  return {
    type: REMOVE_SEMESTRE_SUCCESS,
    id: id,
  };
}

function removeSemestreError() {
  return {
    type: REMOVE_SEMESTRE_ERROR,
  };
}

export function removeSemestre(id) {
  return dispatch => {
    if (!id || id.length === 0) {
      Toast.show('Erreur lors de la récupération de l\'identifiant du semestre.');
      return dispatch(removeSemestreError());
    }

    remove('/api/etudiant/semestres/' + id)
      .then(() => {
        Toast.show('Semestre bien supprimé.');
        return dispatch(removeSemestreSuccess(id));
      })
      .catch((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }
        return dispatch(removeSemestreError());
      });
  };
}