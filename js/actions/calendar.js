/**
 * Created by pierremarsot on 21/07/2017.
 */
import Toast from 'react-native-simple-toast';
import {get, put, post} from '../tools/Api';
import {setLocalStorage} from '../tools/localStorage';

export const UPDATE_URL_ICS_SUCCESS = 'UPDATE_URL_ICS_SUCCESS';
export const UPDATE_URL_ICS_ERROR = 'UPDATE_URL_ICS_ERROR';

export const LOAD_EVENTS_SUCCESS = 'LOAD_EVENTS_SUCCESS';
export const LOAD_EVENTS_ERROR = 'LOAD_EVENTS_ERROR';

export const REFRESH_EVENTS_SUCCESS = 'REFRESH_EVENTS_SUCCESS';
export const REFRESH_EVENTS_ERROR = 'REFRESH_EVENTS_ERROR';

export const LOCALSTORAGE_CALENDAR = 'LOCALSTORAGE_CALENDAR_LYON1_APP_TOMUSS';

function updateUrlIcsSuccess(urlIcs) {
  return {
    type: UPDATE_URL_ICS_SUCCESS,
    urlIcs: urlIcs,
  };
}

function updateUrlIcsError() {
  return {
    type: UPDATE_URL_ICS_ERROR,
  };
}

export function updateUrlIcs(urlIcs) {
  return dispatch => {
    if (!urlIcs || urlIcs.length === 0) {
      Toast.show("Erreur lors de la récupération de l'url de votre calendrier");
      return dispatch(updateUrlIcsError());
    }

    post('/api/calendar', {
      url_ics: urlIcs,
    })
      .then((response) => response.json())
      .then(() => {
        setLocalStorage(LOCALSTORAGE_CALENDAR, urlIcs);
        Toast.show("L'url de votre calendrier a bien été sauvegardé sur notre serveur");
        return dispatch(updateUrlIcsSuccess(urlIcs));
      })
      .catch((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }
        return dispatch(updateUrlIcsError());
      });
  };
}

function loadEventsSuccess(payload) {
  return {
    type: LOAD_EVENTS_SUCCESS,
    events: payload.events,
  };
}

function loadEventsError() {
  return {
    type: LOAD_EVENTS_ERROR,
  };
}

export function loadEvents() {
  return dispatch => {
    get('/api/calendar/events')
      .then((response) => response.json())
      .then((response) => {
        Toast.show("Votre calendrier a été téléchargé.");
        console.log(response);
        return dispatch(loadEventsSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }

        return dispatch(loadEventsError());
      })
  };
}

function refreshEventsSuccess() {
  return {
    type: REFRESH_EVENTS_SUCCESS,
  };
}

function refreshEventsError() {
  return {
    type: REFRESH_EVENTS_ERROR,
  };
}

export function refreshEvents() {
  return dispatch => {
    get('/api/calendar/refresh')
      .then(() => {
        Toast.show("Votre calendrier va être rafraichit sur notre serveur, merci d'attendre 2 minutes avant de " +
          "télécharger votre calendrier.");
        return dispatch(refreshEventsSuccess());
      })
      .catch((response) => {
        response = response.json();
        if (response && response.error) {
          Toast.show(response.error);
        }

        return dispatch(refreshEventsError());
      })
  };
}