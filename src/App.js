import React, { Component } from 'react';
import NoteList from './Components/NoteList/NoteList';
import NoteForm from './Components/NoteForm/NoteFormComponent';
import firebase from 'firebase';
import { config } from './Config/config';
import './App.css';
import { connect } from 'react-redux';
import { fetchNotes, addNote, addNoteModified } from './actions/notesActions';


class App extends Component {
  constructor(props){
    super(props);
    // if(!firebase.apps.length ) //ensures one instace of firebase.app
      firebase.initializeApp(config);
  }

  componentWillMount(){
    this.props.fetchNotes();

    const dbRef = firebase.database().ref().child('notes');
    dbRef.on('child_added', snapshot =>{
       let note = {data: snapshot.val(), id: snapshot.key};
       this.props.addNote(note);
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

  // componentDidMount(){
  //   /*listens for the event of adding new notes*/
  //   const dbRef = firebase.database().ref().child('notes');
  //   dbRef.on('child_added', snapshot =>{
  //      let note = {data: snapshot.val(), id: snapshot.key};
  //      this.props.addNote(note);
  //   });

  //   /*listes for the event of modifiying an existing note*/
  //   dbRef.on('child_changed', snapshot =>{
  //     let copyOfList = this.props.noteList.map(note => note);
  //     for(var i=0; i < copyOfList.length; i++){
  //       if(copyOfList[i].id === snapshot.key){
  //         copyOfList[i].data = snapshot.val();
  //       }
  //     }
  //     console.log('child changed listener')
  //     this.props.addNoteModified(copyOfList); 
  //   });
  // }

  render() {
    return (
        <div className="notesWrapper">
          <header className="notesHeader">
            <div className="heading">Notes in React test</div>
          </header>
          <div id="snackbar"></div>
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

export default connect(mapStateToProps,{fetchNotes ,addNote, addNoteModified})(App);
