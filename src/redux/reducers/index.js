import { combineReducers } from "redux";
import user from "./usersReducer"


const rootreducer = combineReducers({
    user
})

export default rootreducer;