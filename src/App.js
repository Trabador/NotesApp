import React, { Component } from 'react';
import NoteList from './Components/NoteList/NoteList';
import NoteForm from './Components/NoteForm/NoteFormComponent';
import firebase from './Config/dbConfig';
import './App.css';
import { connect } from 'react-redux';
import { fetchNotes, addNote, addNoteModified, removeNote } from './actions/notesActions';


class App extends Component {
 
  componentWillMount(){
    this.props.fetchNotes();

    /*Listens for the event of adding a note */
    const dbRef = firebase.database().ref().child('notes');
    dbRef.on('child_added', snapshot =>{
       let note = {data: snapshot.val(), id: snapshot.key};
       this.props.addNote(note);
    });

    /*listens for the event of deleting a note*/
    dbRef.on('child_removed', snapshot => {
      let id = snapshot.key;
      this.props.removeNote(id);
    });

    /*listes for the event of modifiying an existing note*/
    dbRef.on('child_changed', snapshot =>{
      let copyOfList = this.props.noteList.map(note => note);
      for(var i=0; i < copyOfList.length; i++){
        if(copyOfList[i].id === snapshot.key){
          copyOfList[i].data = snapshot.val();
        }
      }
      console.log('child changed listener')
      this.props.addNoteModified(copyOfList); 
    });
  }

  showNotification = (text) => {
    let notification = document.getElementById('notification');
    notification.className = "show";
    notification.innerText = text;
    setTimeout(() => {
      notification.className = notification.className.replace("show","");
    }, 1500);
  }

  render() {
    return (
        <div className="notesWrapper">
          <header className="notesHeader">
            <div className="heading">Notes in React test</div>
          </header>
          <div id="notification"></div>
          <NoteList />
          <div className='notesFooter'>
            <NoteForm />
          </div> 
        </div>
    );
  }
}

const mapStateToProps = state => ({
  noteList: state.notes.noteList,
});

export default connect(mapStateToProps,{fetchNotes ,addNote, addNoteModified, removeNote})(App);
