
import { ACTIVITIES_FETCH_SUCCESS, ACTIVITY_FETCH_SUCCESS, AUTHOR_ACTIVITIES_FETCH_SUCCESS, PARTICIPANT_ACTIVITIES_FETCH_SUCCESS  } from "../actions/actionType"

const initialState = {
    activities:[],
    activitiesAuthor:[],
    activitiesParticipant:[],
    activity:{}

}

export default function rootReducer(state = initialState, action){
    switch (action.type){
        case ACTIVITIES_FETCH_SUCCESS:
            return{
                ...state,
                activities:action.payload
            }
        case ACTIVITY_FETCH_SUCCESS:
            return{
                ...state,
                activity:action.payload
            }

        case AUTHOR_ACTIVITIES_FETCH_SUCCESS:
            return{
                ...state,
                activitiesAuthor:action.payload
            }
        case PARTICIPANT_ACTIVITIES_FETCH_SUCCESS:
            return{
                ...state,
                activitiesParticipant:action.payload

            }
        default:
            return state
    } 
    
}