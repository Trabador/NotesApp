import React, { Component } from "react";
import { connect } from 'react-redux';
import {  modifyNote , addNoteModified} from '../../actions/notesActions';
import firebase from 'firebase/app';
import './NoteFormComponent.css';

class NoteForm extends Component{
    constructor(props){
        super(props);
            
        this.state = {
            noteID: null,
            action: 'add',
            textContet: ''
        };
        
        this.handleUserInputData = this.handleUserInputData.bind(this);
        this.handleSendTextData = this.handleSendTextData.bind(this);
        this.renderButton = this.renderForm.bind(this);
        this.modifyDatabase = this.modifyNote.bind(this);
        this.insertNewNote = this.insertNewNote.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.state.action !== nextProps.action || 
            this.state.textContet !== nextProps.textContet ||
            this.state.noteID !== nextProps.id){
            this.setState({
                noteID: nextProps.id,
                action: nextProps.action,
                textContet: nextProps.textContet,
            });
        }
    }

    handleUserInputData(event){
        let messageText = event.target.value;
        if(messageText !== ''){
            this.setState({
                textContet: event.target.value
            });
        }
        else{
            this.setState({textContet: ''});
        }
    }

    handleSendTextData(){
            if(this.state.action === 'add'){
                const newRecord = {
                    message: this.state.textContet
                };
                this.insertNewNote(newRecord);
            }
            else{
                const newData = {
                    id: this.state.noteID,
                    newMessage: this.state.textContet
                }
                this.modifyNote(newData);
            }
        
        this.setState({
            action: 'add',
            textContet: ''
        });
    }

    insertNewNote(newRecord){
        const dbRef = firebase.database().ref().child('notes');
        const newNote = dbRef.push();
        newNote.set(newRecord);
        this.showMessage("Note Added");
    }

    modifyNote({id, newMessage}) {
        if(id !== null){
            const dbRef = firebase.database().ref().child('notes');
            const childUpdate = dbRef.child(id);
            childUpdate.update({message: newMessage})
              .then(() => {
                  console.log(`Child ${id} updated`);
                  this.showMessage("Note Updated");
              })
              .catch(error => {console.log(`Error ${error.code}: ${error.message}`)});
        }
    }

    showMessage = (messageText) => {
        let snackBar = document.getElementById('snackbar');
        snackBar.className = "show";
        snackBar.innerText = `${messageText}`;
        setTimeout(() => { 
            snackBar.className = snackBar.className.replace("show", ""); 
        }, 1500);
    }

    renderForm(){
        let buttonText = null;
        if(this.state.action === 'add'){
            buttonText = 'Add';
        }
        else{
            buttonText = 'Update';
        }
        return(
            <div className='formWrapper'>
                <input className='noteInput' placeholder='Write a new note ... '
                     value={this.state.textContet} onChange={this.handleUserInputData}/>
                <button className='noteButton' onClick={this.handleSendTextData} disabled={!this.state.textContet}>
                    {buttonText}
                </button>
            </div>
        );
    }

    render(){
        return(this.renderForm());
    }
}

const mapStateToProps = state => ({
    noteList: state.notes.noteList,
    textContet: state.notes.editMessage,
    action: state.notes.action,
    id: state.notes.editNoteID
});

export default connect(mapStateToProps,{modifyNote,addNoteModified})(NoteForm);