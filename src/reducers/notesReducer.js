import { FETCH_NOTES, DELETE_NOTE, EDIT_NOTE, ADD_NOTE, ADD_MODIFIED, RESET_FORM} from '../actions/types';


const initialState = {
    editNoteID: null,
    action: 'add',
    editMessage : '',
    noteList: []
};

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_NOTES:
            return {
                ...state,
                noteList: action.payload
            };
        case ADD_NOTE:
            return {
                ...state,
                noteList: [action.payload,...state.noteList]
            };
        case ADD_MODIFIED:
            return{
                ...state,
                noteList: action.payload.notes,
                action: action.payload.action,
                editNoteID: action.payload.editNoteID,
                editMessage: action.payload.editMessage
            };
        case DELETE_NOTE:
            return {
                ...state,
                noteList: state.noteList.filter(note => note.id !== action.payload.id),
            };
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
        default: 
            return state;
    }
}