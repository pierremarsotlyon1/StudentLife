/**
 * Created by pierremarsot on 12/07/2017.
 */
import {
  LOAD_BON_PLANS_ERROR,
  LOAD_BON_PLANS_SUCCESS,
  LOAD_MORE_BON_PLANS_ERROR,
  LOAD_MORE_BON_PLANS_SUCCESS,
} from '../actions/bonplans';

const initialState = {
  bonPlans: [],
  loading: true,
};

export default function bonPlans(state = initialState, action = {}){
  switch(action.type){
    case LOAD_BON_PLANS_ERROR:
      return {
        ...state,
        bonPlans: [],
      };

    case LOAD_BON_PLANS_SUCCESS:
      if(!action.bonPlans){
        return {
          ...state,
          bonPlans: [],
          loading: false,
        };
      }

      return {
        ...state,
        bonPlans: action.bonPlans,
        loading: false,
      };

    case LOAD_MORE_BON_PLANS_SUCCESS:
      if(!action.bonPlans){
        return state;
      }

      return {
        ...state,
        bonPlans: state.bonPlans.concat(action.bonPlans),
      };

    case LOAD_MORE_BON_PLANS_ERROR:
    default:
      return state;
  }
}