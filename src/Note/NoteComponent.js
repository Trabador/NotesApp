import React, { Component } from 'react';
import './NoteComponent.css';

class Note extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            message: this.props.message
        };
    }

    render(){
        return(
            <div className="note fade-in">
                <span className="closebtn" onClick={this.props.removeNote}>
                  X
                </span>
                <p className="noteContent">{ this.state.message }</p>
            </div>
        );
    }
}

export default Note;