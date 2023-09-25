import {   USER_EDIT_ON_CHANGE, USER_SET_EMPTY_DATA, USER_GET_ACCESS_TOKEN } from "../actions/actionType"

const initialState = {
    user:{},
    access_token:''
}

export default function rootReducer(state = initialState, action){
    switch (action.type){
        case USER_SET_EMPTY_DATA:
            return{
                user:action.payload
            }
        case USER_EDIT_ON_CHANGE:
            return{
                ...state,
                user:action.payload
            }
        case USER_GET_ACCESS_TOKEN:
            return{
                ...state,
                access_token:action.payload
            }
        default:
            return state
    }
}