import React, { Component } from "react";
import { connect } from 'react-redux';
import { insertNewNote, modifyNote } from '../../actions/notesActions';
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
    }

    componentWillReceiveProps(nextProps){
        if(this.state.action !== nextProps.action || 
            this.state.textContet !== nextProps.textContet ||
            this.state.noteID !== nextProps.id) {
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
            this.props.insertNewNote(newRecord, this.props.user);
            this.showMessage('Note Added');
        }
        else{
            const newData = {
                id: this.state.noteID,
                newMessage: this.state.textContet
            }
            this.props.modifyNote(newData, this.props.user);
            this.showMessage('Note Updated');
        }
        this.setState({
            action: 'add',
            textContet: '',
            noteID: null
        });
    }    

    showMessage = (messageText) => {
        let notification = document.getElementById('notification');
        notification.className = "show";
        notification.innerText = `${messageText}`;
        setTimeout(() => { 
            notification.className = notification.className.replace("show", ""); 
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
    textContet: state.notes.editMessage,
    action: state.notes.action,
    id: state.notes.editNoteID,
    user: state.firebase.auth
});

export default connect(mapStateToProps,{insertNewNote,modifyNote})(NoteForm);