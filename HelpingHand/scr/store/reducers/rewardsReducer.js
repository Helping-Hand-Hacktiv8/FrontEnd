import { REWARDS_FETCH_SUCCESS, USER_REWARDS_FETCH_SUCCESS  } from "../actions/actionType"

const initialState = {
    rewards: [],
    userRewards:[]
}

export default function rootReducer(state = initialState, action){
    switch (action.type){
        case REWARDS_FETCH_SUCCESS:
            return{
                ...state,
                rewards:action.payload
            }
         case USER_REWARDS_FETCH_SUCCESS:
            return{
                ...state,
                userRewards:action.payload
            }
        default:
            return state
    }
}