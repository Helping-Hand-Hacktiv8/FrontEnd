import { combineReducers } from "redux";
import jobsReducer from './jobsReducer'
import companiesReducer from './companiesReducer'
import usersReducer from './usersReducer'
import activitiesReducer from './activitiesReducer'
import rewardsReducer from "./rewardsReducer";

const rootReducer = combineReducers({
    user: usersReducer,
    activity: activitiesReducer,
    rewards: rewardsReducer
})


export default rootReducer