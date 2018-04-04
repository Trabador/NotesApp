import React, { Component } from 'react';
import Note from './Note/NoteComponent';
import NoteForm from './NoteForm/NoteFormComponent';
import firebase from 'firebase';
import { config } from './Config/config'
import './App.css';


class App extends Component {
  constructor(){
    firebase.initializeApp(config);

    super();
    this.state = {
      editnoteID: null,
      action: 'add',
      editMessage : '',
      noteList: []
    };

    this.displayNotes = this.displayNotes.bind(this);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  componentWillMount(){
    firebase.database().ref().child('notes').on('child_added', snapshot =>{
      let note = {data: snapshot.val(), id: snapshot.key};
      this.setState({
        noteList: this.state.noteList.concat(note)
      });
    });

    firebase.database().ref().child('notes').on('child_removed', snapshot =>{
      let aux = this.state.noteList;
      for(var i=0; i < aux.length; i++){
        if(aux[i].id === snapshot.key){
          aux.splice(i, 1);
        }
      }
      this.setState({noteList: aux, editnoteID: null, action: 'add', editMessage: ''});  
    });

    firebase.database().ref().child('notes').on('child_changed', snapshot =>{
      let aux = this.state.noteList;
      for(var i=0; i < aux.length; i++){
        if(aux[i].id === snapshot.key){
          aux[i].data = snapshot.val();
        }
      }
      this.setState({noteList: aux, editnoteID: null, action: 'add', editMessage: ''});
    });
  }

  displayNotes(){
    return(
      this.state.noteList.map(note => {
        return(<Note message={note.data.message} id={note.id} key={note.id} 
                     removeNote={this.removeNote}
                     editNote={this.editNote}/>
        )
      })
    );
  }

  addNote(newRecord){
    const dbRef = firebase.database().ref().child('notes');
    const newNote = dbRef.push();
    newNote.set(newRecord);
  }

  removeNote(noteID){
    const dbRef = firebase.database().ref().child('notes');
    const childToRemove= dbRef.child(noteID);
    childToRemove.remove()
      .then(() => {console.log(`child removed: ${noteID}`);})
      .catch(error => {console.log(`Error ${error.code}: ${error.message}`);});
  }

  editNote(noteID){
    const dbRef = firebase.database().ref().child('notes');
    const childEdit = dbRef.child(noteID);
    childEdit.once('value', snapshot =>{
      let message = snapshot.val().message;
      this.setState({action: 'edit', editMessage: message, editnoteID: noteID});
    });
    
  }

  updateNote(newData){
    if(newData.id !== null){
      const dbRef = firebase.database().ref().child('notes');
      const childUpdate = dbRef.child(newData.id);
      childUpdate.update({message: newData.newMessage})
        .then(() => {this.setState({editnoteID: null,action: 'add', editMessage: ''})})
        .catch(error => {console.log(`Error ${error.code}: ${error.message}`)});
    }
  }

  render() {
    return (
      <div className="notesWrapper">
        <header className="notesHeader">
          <div className="heading">Notes in React</div>
        </header>
        <div className='notesBody'>
          {this.displayNotes()}
        </div>
        <div className='notesFooter'>
          <NoteForm addNote={this.addNote} updateNote={this.updateNote} 
                    action={this.state.action} message={this.state.editMessage}
                    noteID={this.state.editnoteID}/>
        </div> 
      </div>
    );
  }
}

export default App;
