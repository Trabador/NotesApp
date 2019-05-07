import React, { Component } from 'react';
import deleteIcon from '../../Static/images/delete.png';
import editIcon from '../../Static/images/edit.png';
import './NoteComponent.css';
import { connect } from 'react-redux';
import { deleteNote,editNote } from '../../actions/notesActions';

class Note extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            message: this.props.message
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.state.message !== nextProps.message){
            this.setState({message: nextProps.message});
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return(this.state.message !== nextState.message);
    }

    handleEdit(){
        const noteID = this.state.id;
        this.props.editNote(noteID);
    }

    handleRemove(){
        const noteID = this.state.id;
        this.props.deleteNote(noteID);
        this.showMessage("Note Removed");
    }

    showMessage = (messageText) => {
        let snackBar = document.getElementById('notification');
        snackBar.className = "show";
        snackBar.innerText = `${messageText}`;
        setTimeout(() => { 
            snackBar.className = snackBar.className.replace("show", ""); 
        }, 1500);
    }

    render(){
        return(
            <div className="note fade-in">
                <div className="deletebtn" >
                    <span onClick={this.handleRemove}>
                        <img src={deleteIcon} widt='25' height='25' alt='delete' />
                   </span>
                </div>
                <div className="editbtn" >
                    <span onClick={this.handleEdit}>
                        <img src={editIcon}  widt='25' height='25' alt='edit' />
                    </span>    
                </div>
                <p className="noteContent">{ this.state.message }</p>
            </div>
        );
    }
}


export default connect(null,{ deleteNote, editNote })(Note);