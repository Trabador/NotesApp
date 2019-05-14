import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignOut from '../SignOut/SignOut';

class Header extends Component {
    render() {
        return (
            <header className="notesHeader">
                <div className="heading">
                    Notes in React
                    {this.props.user.uid ? <SignOut /> : null}
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.firebase.auth
});

export default connect(mapStateToProps)(Header);