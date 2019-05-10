import React, { Component } from 'react';
import firebase from '../../Config/dbConfig';
import { logOutUSer } from '../../actions/userActions';
import { connect  } from 'react-redux';

class SignOut extends Component {

    handleSignOut = () => {
        firebase.auth().signOut();
        this.props.logOutUSer();
    }

    render() {
        return(
            <div>
                <button className="btn mdc-button--outlined" onClick={this.handleSignOut}>
                    <span>LogOut</span>
                </button>
            </div>
        );
    }
}

export default connect(null, { logOutUSer })(SignOut);