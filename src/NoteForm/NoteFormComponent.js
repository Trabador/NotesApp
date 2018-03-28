import React, { Component } from "react";
import './NoteFormComponent.css';

class NoteForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            textContet: ''
        };

        this.handleUserInputData = this.handleUserInputData.bind(this);
        this.handleSendTextData = this.handleSendTextData.bind(this);
    }


    handleUserInputData(event){
        this.setState({
            textContet: event.target.value
        });
    }

    handleSendTextData(){
        const newRecord = {
            message: this.state.textContet
        };

        this.setState({
            textContet: ''
        });

        this.props.addNote(newRecord);
    }

    render(){
        return(
            <div className='formWrapper'>
                <input className='noteInput' placeholder='Escribe una nueva nota aqui ... '
                 value={this.state.textContet} onChange={this.handleUserInputData}/>
                <button className='noteButton' onClick={this.handleSendTextData}>Agregar Nueva</button>
            </div>
        );
    }
}

export default NoteForm;