/**
 * Created by pierremarsot on 23/06/2017.
 */
import Toast from 'react-native-simple-toast';
import {post, put} from '../tools/Api';
import {ID_TOKEN, setLocalStorage, getToken, deleteLocalStorage} from '../tools/localStorage';
const validator = require('validator');

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const SET_TOKEN = 'SET_TOKEN';
export const LOGOUT = 'LOGOUT';

export function setFcmToken(fcmToken) {
  return new Promise((resolve, reject) => {
    if (!fcmToken || fcmToken.length === 0) {
      return reject();
    }

    put('/api/etudiant/fcm', {
      fcm_token: fcmToken,
    })
      .then(() => {
        return resolve();
      })
      .catch(() => {
        return reject();
      });
  });
}

export function isConnected() {
  return new Promise((resolve, reject) => {
    getToken()
      .then((token) => {
        return resolve(token && token.length > 0);
      })
      .catch(() => {
        return resolve(false);
      });
  });
}

export function setToken() {
  return dispatch => {

    getToken()
      .then((token) => {
        return dispatch({
          type: SET_TOKEN,
          token: token,
        });
      });
  };
}

function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token: token,
  };
}

function loginError() {
  return {
    type: LOGIN_ERROR,
  };
}

export function login(email, password) {
  return dispatch => {
    if (!email || email.length === 0) {
      Toast.show('Vous devez spécifier un email.');
      return false;
    }

    if (!password || password.length === 0) {
      Toast.show('Vous devez spécifier votre mot de passe.');
      return false;
    }

    //On regarde si l'email est un email valide
    if(!validator.isEmail(email)){
      Toast.show('Votre email n\'est pas valide');
      return false;
    }

    post('/login', {
      email: email,
      password: password,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response && response.token) {
          setLocalStorage(ID_TOKEN, response.token)
            .then(() => {
              return dispatch(loginSuccess(response.token));
            })
            .catch(() => {
              Toast.show('Erreur lors de la sauvegarde de votre identifiant.');
              return dispatch(loginError());
            });
        }
        else {
          return dispatch(loginError());
        }
      })
      .catch((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }
        return dispatch(loginError());
      });
  };
}

function registerSuccess(token) {
  return {
    type: REGISTER_SUCCESS,
    token: token,
  };
}

function registerError() {
  return {
    type: REGISTER_ERROR
  };
}

export function register(nom, prenom, email, password, confirmPassword) {
  return dispatch => {
    if (!email || email.length === 0) {
      Toast.show('Vous devez spécifier un email.');
      return false;
    }

    if (!password || password.length === 0) {
      Toast.show('Vous devez spécifier un mot de passe.');
      return false;
    }

    if (!nom || nom.length === 0) {
      Toast.show('Vous devez spécifier votre nom.');
      return false;
    }

    if (!prenom || prenom.length === 0) {
      Toast.show('Vous devez spécifier votre prénom.');
      return false;
    }

    if (!confirmPassword || confirmPassword.length === 0) {
      Toast.show('Vous devez confirmer votre mot de passe.');
      return false;
    }

    if (password !== confirmPassword) {
      Toast.show('Les mots de passe ne sont pas identique.');
      return false;
    }

    //On regarde si l'email est un email valide
    if(!validator.isEmail(email)){
      Toast.show('Votre email n\'est pas valide');
      return false;
    }

    post('/register', {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response && response.token) {
          setLocalStorage(ID_TOKEN, response.token)
            .then(() => {
              return dispatch(registerSuccess(response.token));
            })
            .catch(() => {
              Toast.show('Erreur lors de la sauvegarde de votre identifiant.');
              return dispatch(registerError());
            });
        }
        else {
          return dispatch(registerError());
        }
      })
      .catch((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }
        return dispatch(registerError());
      });
  };
}

export function logout() {
  return dispatch => {
    if (deleteLocalStorage(ID_TOKEN)) {
      return dispatch({
        type: LOGOUT,
      });
    }
  };
}

function changePasswordSuccess() {
  return {};
}

function changePasswordError() {
  return {};
}

export function changePassword(newPassword, confirmNewPassword) {
  return dispatch => {
    if (!newPassword || newPassword.length === 0) {
      Toast.show('Vous devez spécifier un nouveau mot de passe.');
      return dispatch(changePasswordError());
    }

    if (!confirmNewPassword || confirmNewPassword.length === 0) {
      Toast.show('Vous devez confirmer votre mot de passe.');
      return dispatch(changePasswordError());
    }

    if (newPassword !== confirmNewPassword) {
      Toast.show('Les mots de passe sont différents.');
      return dispatch(changePasswordError());
    }

    put('/api/etudiant/change/password', {
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    })
      .then(() => {
        Toast.show('Votre mot de passe a bien été changé.');
      })
      .catch((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }
      });
  };
}