/**
 * Created by pierremarsot on 21/07/2017.
 */
import Toast from 'react-native-simple-toast';
import {get, put, post} from '../tools/Api';
import {setLocalStorage, getLocalStorage} from '../tools/localStorage';
import moment from 'moment';

export const UPDATE_URL_ICS_SUCCESS = 'UPDATE_URL_ICS_SUCCESS';
export const UPDATE_URL_ICS_ERROR = 'UPDATE_URL_ICS_ERROR';

export const LOAD_EVENTS_SUCCESS = 'LOAD_EVENTS_SUCCESS';
export const LOAD_EVENTS_ERROR = 'LOAD_EVENTS_ERROR';

export const SYNCHRONISATION_CALENDAR = 'SYNCHRONISATION_CALENDAR';

export const LOCALSTORAGE_URL_ICS_CALENDAR = 'LOCALSTORAGE_URL_ICS_CALENDAR_LYON1_APP_TOMUSS';
export const LOCALSTORAGE_EVENTS_CALENDAR = 'LOCALSTORAGE_EVENTS_CALENDAR';
export const LOCALSTORAGE_LAST_SYNCHRO_TIMER_CALENDAR = 'LOCALSTORAGE_LAST_SYNCHRO_TIMER_CALENDAR';

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
      Toast.show("Erreur lors de la récupération de l'url de votre agenda");
      return dispatch(updateUrlIcsError());
    }

    post('/api/calendar', {
      url_ics: urlIcs,
    })
      .then((response) => response.json())
      .then(() => {
        setLocalStorage(LOCALSTORAGE_URL_ICS_CALENDAR, urlIcs);
        Toast.show("L'url de votre agenda a bien été sauvegardé sur notre serveur");
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
    getLocalStorage(LOCALSTORAGE_EVENTS_CALENDAR)
      .then((events) => {
        if (!events) {
          return dispatch(synchroniserCalendar());
        }
        else {
          events = JSON.parse(events);
          return dispatch(loadEventsSuccess({
            events: events,
          }));
        }
      })
      .catch(() => {

      });
  };
}

export function synchroniserCalendar() {
  return dispatch => {
    dispatch({
      type: SYNCHRONISATION_CALENDAR,
    });

    //On enregistre la dernière date de synchro
    const dateLastSynchro = moment().format();
    setLocalStorage(LOCALSTORAGE_LAST_SYNCHRO_TIMER_CALENDAR, dateLastSynchro);

    //On dispatch la date
    dispatch({
      type: LOCALSTORAGE_LAST_SYNCHRO_TIMER_CALENDAR,
      dateLastSynchro: dateLastSynchro,
    });

    get('/api/calendar')
      .then((response) => response.json())
      .then((response) => {
        Toast.show("Votre agenda a été synchronisé.");
        if (response) {
          setLocalStorage(LOCALSTORAGE_EVENTS_CALENDAR, JSON.stringify(response.events));
        }

        dispatch({
          type: SYNCHRONISATION_CALENDAR,
        });
        return dispatch(loadEventsSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }

        dispatch({
          type: SYNCHRONISATION_CALENDAR,
        });
        return dispatch(loadEventsError());
      });
  };
}

export function setLastSynchro() {
  return dispatch => {
    getLocalStorage(LOCALSTORAGE_LAST_SYNCHRO_TIMER_CALENDAR)
      .then((dateLastSynchro) => {
        return dispatch({
          type: LOCALSTORAGE_LAST_SYNCHRO_TIMER_CALENDAR,
          dateLastSynchro: dateLastSynchro,
        });
      })
      .catch(() => {
        return false;
      });
  };
}