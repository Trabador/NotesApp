import {  EDIT_NOTE, RESET_FORM, RESET_APP } from '../actions/types';


const initialState = {
    editNoteID: null,
    action: 'add',
    editMessage : '',
    noteList: []
};

export default function(state = initialState, action){
    switch(action.type){
        case EDIT_NOTE:
            return {
                ...state,
                action: action.payload.action,
                editMessage: action.payload.editMessage, 
                editNoteID: action.payload.editNoteID
            };
        case RESET_FORM:
            return {
                ...state,
                action: action.payload.action,
                editMessage: action.payload.editMessage, 
                editNoteID: action.payload.editNoteID
            };
        case RESET_APP:
            return {
                ...state,
                action: 'add',
                editMessage: '',
                editNoteID: null,
                noteList: []
            }
        default: 
            return state;
    }
}