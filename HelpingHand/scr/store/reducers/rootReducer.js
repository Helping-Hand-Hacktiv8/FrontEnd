import { combineReducers } from "redux";
import jobsReducer from './jobsReducer'
import companiesReducer from './companiesReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
    jobs: jobsReducer,
    companies: companiesReducer,
    user: usersReducer
})


export default rootReducer