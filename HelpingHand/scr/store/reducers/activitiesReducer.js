import { ACTIVITIES_FETCH_SUCCESS  } from "../actions/actionType"

const initialState = {
    activities:[],
}

export default function activitiesReducer(state = initialState, action){
    switch (action.type){
        case ACTIVITIES_FETCH_SUCCESS:
            return{
                ...state,
                activities:action.payload
            }
        default:
            return state
    }
}