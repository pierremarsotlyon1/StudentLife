/**
 * Created by pierremarsot on 12/07/2017.
 */
import {get} from '../tools/Api';
import Toast from 'react-native-simple-toast';

export const LOAD_BON_PLANS_SUCCESS = 'LOAD_BON_PLANS_SUCCESS';
export const LOAD_BON_PLANS_ERROR = 'LOAD_BON_PLANS_ERROR';

export const LOAD_MORE_BON_PLANS_SUCCESS = 'LOAD_MORE_BON_PLANS_SUCCESS';
export const LOAD_MORE_BON_PLANS_ERROR = 'LOAD_MORE_BON_PLANS_ERROR';

export const LOAD_RECENT_BON_PLANS_SUCCESS = 'LOAD_RECENT_BON_PLANS_SUCCESS';
export const LOAD_RECENT_BON_PLANS_ERROR = 'LOAD_RECENT_BON_PLANS_ERROR';

function loadBonPlansSuccess(payload) {
  return {
    type: LOAD_BON_PLANS_SUCCESS,
    bonPlans: payload,
  };
}

function loadBonPlansError() {
  return {
    type: LOAD_BON_PLANS_ERROR,
  };
}

export function loadBonPlans(offset) {
  return dispatch => {
    if (offset < 0) {
      Toast.show("Erreur lors de la récupération de l'offset");
      return dispatch(loadBonPlansError());
    }

    get('/api/bonplans', {
      offset: offset,
    })
      .then((response) => response.json())
      .then((response) => {
        return dispatch(loadBonPlansSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }
        return dispatch(loadBonPlansError());
      });
  }
}

function loadMoreBonPlansSuccess(payload) {
  return {
    type: LOAD_MORE_BON_PLANS_SUCCESS,
    bonPlans: payload,
  };
}

function loadMoreBonPlansError() {
  return {
    type: LOAD_MORE_BON_PLANS_ERROR,
  };
}

export function loadMoreBonPlans(offset) {
  return dispatch => {
    if (offset < 0) {
      Toast.show("Erreur lors de la récupération de l'offset");
      return dispatch(loadMoreBonPlansError());
    }

    get('/api/bonplans', {
      offset: offset,
    })
      .then((response) => response.json())
      .then((response) => {
        return dispatch(loadMoreBonPlansSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }
        return dispatch(loadMoreBonPlansError());
      });
  }
}

function loadRecentBonPlansSuccess(payload){
  return {
    type: LOAD_RECENT_BON_PLANS_SUCCESS,
    bonPlans: payload,
  };
}

function loadRecentBonPlansError(){
  return {
    type: LOAD_RECENT_BON_PLANS_ERROR,
  };
}

export function loadRecentBonPlans(){
  return (dispatch, getState) => {
    if(getState().bonPlans.bonPlans.length === 0){
      return dispatch(loadRecentBonPlansError());
    }

    const bonPlans = getState().bonPlans.bonPlans[0];

    get('/api/bonplans/recent/' + bonPlans._source.date_debut)
      .then((response) => response.json())
      .then((response) => {
        return dispatch(loadRecentBonPlansSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          Toast.show(response.error);
        }
        return dispatch(loadMoreBonPlansError());
      });
  };
}