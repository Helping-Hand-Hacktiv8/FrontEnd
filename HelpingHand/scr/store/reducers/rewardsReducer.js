import { REWARDS_FETCH_SUCCESS  } from "../actions/actionType"

const initialState = {
    rewards:[],
}

export default function rewardsReducer(state = initialState, action){
    switch (action.type){
        case REWARDS_FETCH_SUCCESS:
            return{
                ...state,
                rewards:action.payload
            }
        default:
            return state
    }
}