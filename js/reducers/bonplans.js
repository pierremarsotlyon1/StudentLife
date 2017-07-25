/**
 * Created by pierremarsot on 12/07/2017.
 */
import {
  LOAD_BON_PLANS_ERROR,
  LOAD_BON_PLANS_SUCCESS,
  LOAD_MORE_BON_PLANS_ERROR,
  LOAD_MORE_BON_PLANS_SUCCESS,
  LOAD_RECENT_BON_PLANS_SUCCESS,
  LOAD_RECENT_BON_PLANS_ERROR,
} from '../actions/bonplans';
import moment from 'moment';

const initialState = {
  bonPlans: [],
  loading: true,
};

export default function bonPlans(state = initialState, action = {}){
  let newArrayBonsPlans;
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

    case LOAD_RECENT_BON_PLANS_SUCCESS:
      if(!action.bonPlans){
        return state;
      }

      //On clone
      newArrayBonsPlans = state.bonPlans.slice();

      //On supprime les potientiel doublons
      for(const bonPlan of action.bonPlans){
        if(!bonPlan || !bonPlan._id){
          continue;
        }

        let find = false;
        for(const b of newArrayBonsPlans){
          if(!b || !b._id){
            continue;
          }

          if(b._id === bonPlan._id){
            find = true;
            break;
          }
        }

        if(!find){
          newArrayBonsPlans.unshift(bonPlan);
        }
      }


      return {
        ...state,
        bonPlans: newArrayBonsPlans.sort((a, b) => {
          const momentA = moment(a._source.date_debut);
          const momentB = moment(b._source.date_debut);

          return momentA.isSameOrBefore(momentB) ? -1 : 1;
        }),
      };

    case LOAD_MORE_BON_PLANS_SUCCESS:
      if(!action.bonPlans){
        return state;
      }

      //On concat
      newArrayBonsPlans = state.bonPlans.concat(action.bonPlans);

      return {
        ...state,
        bonPlans: newArrayBonsPlans.sort((a, b) => {
          const momentA = moment(a._source.date_debut);
          const momentB = moment(b._source.date_debut);

          return momentA.isSameOrBefore(momentB) ? -1 : 1;
        }),
      };

    case LOAD_MORE_BON_PLANS_ERROR:
    default:
      return state;
  }
}