import {get} from '../tools/Api';
import Toast from 'react-native-simple-toast';

export const LOAD_JOBS_SUCCESS = 'LOAD_JOBS_SUCCESS';
export const LOAD_JOBS_ERROR = 'LOAD_JOBS_ERROR';

export const LOAD_MORE_JOBS_SUCCESS = 'LOAD_JOBS_SUCCESS';
export const LOAD_MORE_JOBS_ERROR = 'LOAD_JOBS_ERROR';

function loadJobsSuccess(payload){
  return {
    type: LOAD_JOBS_SUCCESS,
    jobs: payload.jobs,
  };
}

function loadJobsError(){
  return {
    type: LOAD_JOBS_ERROR,
  };
}

export function loadJobs(offset){
  return dispatch => {
    get('/api/jobs/date', {
      offset: offset,
    })
      .then(response => response.json())
      .then((response) => {
        if(response && response.jobs){
          return dispatch(loadJobsSuccess(response));
        }
        else{
          return dispatch(loadJobsError());
        }
      })
      .catch((response) => {
        if (response) {
          response.json()
            .then((response) => {
              if (response.error) {
                Toast.show(response.error);
              }

              return dispatch(loadJobsError());
            })
            .catch(() => {
              return dispatch(loadJobsError());
            });
        }
      });
  };
}

function loadMoreJobsSuccess(payload){
  return {
    type: LOAD_JOBS_SUCCESS,
    jobs: payload.jobs,
  };
}

function loadMoreJobsError(){
  return {
    type: LOAD_JOBS_ERROR,
  };
}

export function loadMoreJobs(offset){
  return dispatch => {
    get('/api/jobs/date', {
      offset: offset,
    })
      .then(response => response.json())
      .then((response) => {
        if(response && response.jobs){
          return dispatch(loadMoreJobsSuccess(response));
        }
        else{
          return dispatch(loadMoreJobsError());
        }
      })
      .catch((response) => {
        if (response) {
          response.json()
            .then((response) => {
              if (response.error) {
                Toast.show(response.error);
              }

              return dispatch(loadMoreJobsError());
            })
            .catch(() => {
              return dispatch(loadMoreJobsError());
            });
        }
      });
  };
}