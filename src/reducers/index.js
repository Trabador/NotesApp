import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import usersReducer from './usersReducer';


export default combineReducers({
    notes: notesReducer,
    users: usersReducer
});