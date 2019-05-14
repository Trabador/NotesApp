import React, { Component } from 'react';
import './App.css';
import NotesApp from './Components/NotesApp/NotesApp';
import Login from './Components/Login/Login';
import SignIn from './Components/SignIn/SignIn';
import { BrowserRouter, Route } from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Route exact path ="/" component={NotesApp} />
          <Route path="/login" component={Login} />
          <Route path="/signin" component={SignIn} />
      </BrowserRouter>
    );
  }
}



export default App;
