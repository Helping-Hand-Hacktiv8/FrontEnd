import { ACTIVITIES_FETCH_SUCCESS, USERACTIVITIES_FETCH_SUCCESS  } from "../actions/actionType"

const initialState = {
    activities:[],
    userActivities:[]
}

export default function rootReducer(state = initialState, action){
    switch (action.type){
        case ACTIVITIES_FETCH_SUCCESS:
            return{
                ...state,
                activities:action.payload
            }
        case USERACTIVITIES_FETCH_SUCCESS:
            return{
                ...state,
                userActivities:action.payload
            }
        default:
            return state
    } 
    
}