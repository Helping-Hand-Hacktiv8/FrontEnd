import { COMPANIES_EDIT_ON_CHANGE, COMPANIES_FETCH_SUCCESS, COMPANIES_SET_EMPTY_DATA, COMPANIES_SINGLE_FETCH_SUCCESS} from "../actions/actionType"

const initialState = {
    companies:[],
    company:{}
}

export default function rootReducer(state = initialState, action){
    switch (action.type){
        case COMPANIES_FETCH_SUCCESS:
            return{
                ...state,
                companies: action.payload
            }
        case COMPANIES_SINGLE_FETCH_SUCCESS:
            return{
                ...state,
                company: action.payload
            }
        case COMPANIES_SET_EMPTY_DATA:
            return{
                ...state,
                company: action.payload
            }
        case COMPANIES_EDIT_ON_CHANGE:
            return{
                ...state,
                company: {
                    ...state.company,
                    ...action.payload
                }
            }
        default:
            return state
    }
}