import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import { firebaseReducer } from 'react-redux-firebase';


export default combineReducers({
    notes: notesReducer,
    firebase: firebaseReducer
});