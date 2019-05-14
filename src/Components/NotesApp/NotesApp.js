import React, { Component } from 'react';
import Header from '../Header/Header';
import NoteList from '../NoteList/NoteList';
import NoteForm from '../NoteForm/NoteFormComponent';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class NotesApp extends Component {

    render() {
        if (this.props.user.isEmpty)
            return <Redirect to="/login" />
        return (
            <div className="notesWrapper">
                <Header />
                <React.Fragment>
                    <div id="notification"></div>
                    <NoteList />
                    <div className='notesFooter'>
                        <NoteForm />
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.firebase.auth,
})

export default connect(mapStateToProps)(NotesApp);