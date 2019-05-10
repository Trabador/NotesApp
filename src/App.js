import React, { Component } from 'react';
import firebase from './Config/dbConfig';
import './App.css';
import NotesApp from './Components/NotesApp/NotesApp';
import Login from './Components/Login/Login';
import SignIn from './Components/SignIn/SignIn';
import SignOut from './Components/SignOut/SignOut';
import { connect } from 'react-redux';
import { fetchNotes, addNote, addNoteModified, removeNote } from './actions/notesActions';

import { BrowserRouter, Route } from 'react-router-dom';



class App extends Component {

  componentWillMount() {
    this.props.fetchNotes();

    /*Listens for the event of adding a note */
    const dbRef = firebase.database().ref().child('notes');
    dbRef.on('child_added', snapshot => {
      let note = { data: snapshot.val(), id: snapshot.key };
      this.props.addNote(note);
    });

    /*listens for the event of deleting a note*/
    dbRef.on('child_removed', snapshot => {
      let id = snapshot.key;
      this.props.removeNote(id);
    });

    /*listes for the event of modifiying an existing note*/
    dbRef.on('child_changed', snapshot => {
      let copyOfList = this.props.noteList.map(note => note);
      for (var i = 0; i < copyOfList.length; i++) {
        if (copyOfList[i].id === snapshot.key) {
          copyOfList[i].data = snapshot.val();
        }
      }
      console.log('child changed listener')
      this.props.addNoteModified(copyOfList);
    });
  }

  

  render() {
    return (
      <BrowserRouter>
        <div className="notesWrapper">
          <header className="notesHeader">
            <div className="heading">
              Notes in React
              {this.props.user ? <SignOut /> : null}
            </div>
          </header>
          <Route exact path="/" component={NotesApp} />
          <Route path="/login" component={Login} />
          <Route path="/signin" component={SignIn} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  noteList: state.notes.noteList,
  user: state.users.user
});

export default connect(mapStateToProps, { fetchNotes, addNote, addNoteModified, removeNote })(App);
