import {  JOBS_EDIT_ON_CHANGE, JOBS_FETCH_SUCCESS, JOBS_SET_EMPTY_DATA, JOBS_SINGLE_FETCH_SUCCESS } from "../actions/actionType"

const initialState = {
    jobs:[],
    job:{}
}

export default function rootReducer(state = initialState, action){
    switch (action.type){
        case JOBS_FETCH_SUCCESS:
            return{
                ...state,
                jobs: action.payload
            }
        case JOBS_SINGLE_FETCH_SUCCESS:
            return{
                ...state,
                job: action.payload
            }
        case JOBS_SET_EMPTY_DATA:
            return{
                ...state,
                job:action.payload
            }
        case JOBS_EDIT_ON_CHANGE:
            return{
                ...state,
                job:{
                    ...state.job,
                    ...action.payload
                }
            }
        default:
            return state
    }
}