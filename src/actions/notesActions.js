import { FETCH_NOTES, DELETE_NOTE, EDIT_NOTE, ADD_NOTE , ADD_MODIFIED, RESET_FORM} from './types';
import firebase from 'firebase/app';

/*Returns all notes from DB*/
export const fetchNotes = () => dispatch => {
    firebase.database().ref().child('notes').once('value', snapshot =>{
        let notes = Object.keys(snapshot.val()).map(key => {
            return ({data: snapshot.val()[key], id: key})
        });
        notes = notes.reverse();
        dispatch({
            type: FETCH_NOTES,
            payload: notes 
        });
      });
}

/*Add new Note to the state*/
export const addNote = (note) => dispatch => {
    dispatch({
        type: ADD_NOTE,
        payload: note
    });
}

/*Add note list with the note selected already modified to the state*/
export const addNoteModified = (notes) => dispatch => {
    dispatch({
        type: ADD_MODIFIED,
        payload: {notes, editNoteID: null,action: 'add', editMessage: ''}
    });
}

/*Delete note from the state */
export const removeNote = (id) => dispatch => {
    dispatch({
        type: DELETE_NOTE,
        payload: {id: id}
    });
}

/*Insert new note in database */
export const insertNewNote = (newRecord) => dispatch => {
    const dbRef = firebase.database().ref().child('notes');
    const newNote = dbRef.push();
    newNote.set(newRecord)
        .then(() => {
            dispatch({
                type: RESET_FORM,
                payload: {editNoteID: null,action: 'add', editMessage: ''}
            });
        })
        .catch(error => {console.log(`Error ${error.code}: ${error.message}`);});
}

/*Delete selected note from DB via ID*/
export const deleteNote = (noteID) => dispatch => {
    const dbRef = firebase.database().ref().child('notes');
    const childToRemove= dbRef.child(noteID);
    childToRemove.remove()
      .then(() => {
          console.log(`child removed: ${noteID}`);
          dispatch({
              type: RESET_FORM,
              payload: {editNoteID: null,action: 'add', editMessage: ''}
          });
        })
      .catch(error => {console.log(`Error ${error.code}: ${error.message}`);});
}

/*Modify the note in the db layer */
export const modifyNote = ({ id, newMessage }) => dispatch => {
    if(id !== null){
        const dbRef = firebase.database().ref().child('notes');
        const childUpdate = dbRef.child(id);
        childUpdate.update({message: newMessage})
          .then(() => {
                console.log(`Child ${id} updated`);
                dispatch({
                    type: RESET_FORM,
                    payload: {editNoteID: null,action: 'add', editMessage: ''}
                });
          })
          .catch(error => {console.log(`Error ${error.code}: ${error.message}`)});
    }
}


/*Search the selected note to edit and set the data in the form to modify the message */
export const editNote = (noteID) => dispatch => {
    const dbRef = firebase.database().ref().child('notes');
    const childEdit = dbRef.child(noteID);
    childEdit.once('value', snapshot =>{
      let message = snapshot.val().message;
      dispatch({
          type: EDIT_NOTE,
          payload: {action: 'edit', editMessage: message, editNoteID: noteID}
      });
    });
}


