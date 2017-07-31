import {
  LOAD_JOBS_ERROR,
  LOAD_JOBS_SUCCESS,
  LOAD_MORE_JOBS_ERROR,
  LOAD_MORE_JOBS_SUCCESS,
} from '../actions/jobs';

const initialState = {
  jobs: [],
};

export default function jobs(state = initialState, action = {}){
  switch(action.type){
    case LOAD_JOBS_SUCCESS:
      if(!action || !action.jobs){
        return {
          ...state,
          jobs: [],
        };
      }

      return {
        ...state,
        jobs: action.jobs,
      };

    case LOAD_MORE_JOBS_SUCCESS:
      if(!action || !action.jobs){
        return state;
      }

      return {
        ...state,
        jobs: state.jobs.concat(action.jobs),
      };

    default:
      return state;
  }
}