import React, { Component } from "react";
import './NoteFormComponent.css';

class NoteForm extends Component{
    constructor(props){
        super(props);
            
        this.state = {
            action: this.props.action,
            textContet: ''
        };
        
        this.handleUserInputData = this.handleUserInputData.bind(this);
        this.handleSendTextData = this.handleSendTextData.bind(this);
        this.renderAddNote = this.renderAddNote.bind(this);
        this.renderEditNote = this.renderEditNote.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log('CWP');
        if( this.state.action !== nextProps.action ||
            this.state.message !== nextProps.message){
                this.setState({textContet: nextProps.message,
                               action: nextProps.action});
        }
    }



    handleUserInputData(event){
        this.setState({
            textContet: event.target.value
        });
    }

    handleSendTextData(){
        if(this.state.action === 'add'){
            const newRecord = {
                message: this.state.textContet
            };

            this.props.addNote(newRecord);
        }
        else{
            const newData = {
                id: '',
                newMessage: this.state.textContet
            }

            this.props.updateNote(newData);
        }
        
        this.setState({
            action: 'add',
            textContet: ''
        });
    }

    renderAddNote(){
        return(
            <div className='formWrapper'>
                <input className='noteInput' placeholder='Escribe una nueva nota aqui ... '
                     value={this.state.textContet} onChange={this.handleUserInputData}/>
                <button className='noteButton' onClick={this.handleSendTextData}>Agregar Nueva</button>
            </div>
        );
    }

    renderEditNote(message){
        return(
            <div className='formWrapper'>
                <input className='noteInput' 
                     value={this.state.textContet} onChange={this.handleUserInputData}/>
                <button className='noteButton' onClick={this.handleSendTextData}>Actualizar</button>
            </div>
        );
    }

    render(){
        if(this.state.action === 'add'){
            console.log('add note');
            return(this.renderAddNote());
        }
        else{
            console.log('edit note');
            return(this.renderEditNote());
        }
    }
}

export default NoteForm;