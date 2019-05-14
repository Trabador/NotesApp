import React, { Component } from 'react';
import firebase from '../../Config/dbConfig';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import store from '../../store';
import './Login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            pass: '',
            error: ''
        }
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, pass } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(() => {
                this.setState({ email: '', pass: '', error: '' });
                store.firebaseAuthIsReady.then(() => this.props.history.push('/'));
            })
            .catch((error) => {
                console.log(`Error ${error.code}: ${error.message}`);
                this.setState({ error: error.message });
            });
    }

    renderError = () => {
        if (this.state.error !== '') {
            return (
                <div className="row errors">
                    <i className="material-icons prefix">error</i>
                    <div className="error-message">{this.state.error}</div>
                </div>
            );
        }
        return null;
    }


    render() {
        return (
            <div className="notesWrapper">
                <Header />
                <div className="login">
                    <div className="row">
                        <form className="col s12" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input id="email" type="text" className="validate" onChange={this.handleOnChange} />
                                    <label htmlFor="email">Email account</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="pass" type="password" className="validate" onChange={this.handleOnChange} />
                                    <label htmlFor="pass">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input type="submit" value="Login" className="btn btn-custom"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="go-to-register">
                                    <span>Not registered?</span>
                                    <Link to="/signin">Create an account</Link>
                                </div>
                            </div>
                            {this.renderError()}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;