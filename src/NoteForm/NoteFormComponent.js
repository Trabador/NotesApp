import React, { Component } from "react";
import './NoteFormComponent.css';

class NoteForm extends Component{
    constructor(props){
        super(props);
            
        this.state = {
            noteID: this.props.noteID,
            action: this.props.action,
            textContet: ''
        };
        
        this.handleUserInputData = this.handleUserInputData.bind(this);
        this.handleSendTextData = this.handleSendTextData.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if( this.state.action !== nextProps.action ||
            this.state.message !== nextProps.message){
                this.setState({noteID: nextProps.noteID,
                               textContet: nextProps.message,
                               action: nextProps.action});
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
            this.setState({textContet: null});
        }
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
                    id: this.state.noteID,
                    newMessage: this.state.textContet
                }
    
                this.props.updateNote(newData);
            }
        
        this.setState({
            action: 'add',
            textContet: ''
        });
    }

    renderButton(){
        let buttonText = null;
        if(this.state.action === 'add'){
            buttonText = 'Agregar';
        }
        else{
            buttonText = 'Actualizar';
        }
        return(
            <div className='formWrapper'>
                <input className='noteInput' placeholder='Escribe una nueva nota aqui ... '
                     value={this.state.textContet} onChange={this.handleUserInputData}/>
                <button className='noteButton' onClick={this.handleSendTextData} disabled={!this.state.textContet}>
                    {buttonText}
                </button>
            </div>
        );
    }

    render(){
        return(this.renderButton());
    }
}

export default NoteForm;