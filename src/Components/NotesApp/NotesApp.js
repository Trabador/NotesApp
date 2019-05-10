import React, { Component } from 'react';
import NoteList from '../NoteList/NoteList';
import NoteForm from '../NoteForm/NoteFormComponent';
import { connect } from 'react-redux';
import firebase from '../../Config/dbConfig';
import { logUser, logOutUSer } from '../../actions/userActions';

class NotesApp extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const current = { uid: user.uid, email: user.email }
                this.props.logUser(current);
            }
            else {
                this.props.logOutUSer();
                this.props.history.push('/login');
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <div id="notification"></div>
                <NoteList />
                <div className='notesFooter'>
                    <NoteForm />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
})

export default connect(mapStateToProps, { logUser, logOutUSer })(NotesApp);