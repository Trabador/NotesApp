import { EDIT_NOTE, RESET_FORM, RESET_APP } from './types';


/*Insert new note in database */
export const insertNewNote = (newRecord, user) => (dispatch, getState, { getFirebase }) => {
    if (user.uid) {
        const dbRef = getFirebase().database().ref().child('notes2').child(user.uid);
        const newNote = dbRef.push();
        newNote.set(newRecord)
            .then(() => {
                dispatch({
                    type: RESET_FORM,
                    payload: { editNoteID: null, action: 'add', editMessage: '' }
                });
            })
            .catch(error => { console.log(`Error ${error.code}: ${error.message}`); });
    }
}

/*Delete selected note from DB via ID*/
export const deleteNote = (noteID, user) => (dispatch, getState, { getFirebase }) => {
    if (user.uid) {
        const dbRef = getFirebase().database().ref().child('notes2').child(user.uid);
        const childToRemove = dbRef.child(noteID);
        childToRemove.remove()
            .then(() => {
                console.log(`child removed: ${noteID}`);
                dispatch({
                    type: RESET_FORM,
                    payload: { editNoteID: null, action: 'add', editMessage: '' }
                });
            })
            .catch(error => { console.log(`Error ${error.code}: ${error.message}`); });
    }
}

/*Modify the note in the db layer */
export const modifyNote = ({ id, newMessage }, user) => (dispatch, getState, { getFirebase }) => {
    if (id !== null && user.uid) {
        const dbRef = getFirebase().database().ref().child('notes2').child(user.uid);
        const childUpdate = dbRef.child(id);
        childUpdate.update({ message: newMessage })
            .then(() => {
                console.log(`Child ${id} updated`);
                dispatch({
                    type: RESET_FORM,
                    payload: { editNoteID: null, action: 'add', editMessage: '' }
                });
            })
            .catch(error => { console.log(`Error ${error.code}: ${error.message}`) });
    }
}


/*Search the selected note to edit and set the data in the form to modify the message */
export const editNote = (noteID, user) => (dispatch, getState, { getFirebase }) => {
    if (user) {
        const dbRef = getFirebase().database().ref().child('notes2').child(user.uid);
        const childEdit = dbRef.child(noteID);
        childEdit.once('value', snapshot => {
            let message = snapshot.val().message;
            dispatch({
                type: EDIT_NOTE,
                payload: { action: 'edit', editMessage: message, editNoteID: noteID }
            });
        });
    }
}

/*reset the notes app to the initial state values */
export const resetApp = () => dispatch => {
    dispatch({
        type: RESET_APP
    });
}


