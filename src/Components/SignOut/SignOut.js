import React, { Component } from 'react';
import firebase from '../../Config/dbConfig';
import './SignOut.css';

class SignOut extends Component {

    handleSignOut = () => {
        firebase.auth().signOut();
    }

    render() {
        return(
            <div>
                <button className="btn mdc-button--outlined signout" onClick={this.handleSignOut}>
                    <span>LogOut</span>
                </button>
            </div>
        );
    }
}

export default SignOut;