import { combineReducers } from "redux";
import jobsReducer from './jobsReducer'
import companiesReducer from './companiesReducer'
import usersReducer from './usersReducer'
import activitiesReducer from './activitiesReducer'

const rootReducer = combineReducers({
    user: usersReducer,
    activity: activitiesReducer
})


export default rootReducer