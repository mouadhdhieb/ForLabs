import React, { Component } from 'react';
import * as firebase from 'firebase';
import { browserHistory, Link } from 'react-router';

import './sign.css';

class signUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: {
                message: ''
            }
        }
    }

    signUp() {
        console.log('this.state', this.state);
        const { name, email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({ error })
            })
            .then(function () {
                var user = firebase.auth().currentUser;
                if (user) {
                    user.updateProfile({displayName:name})
                } 
                    console.log("user created")
                    browserHistory.push("/MainPage")
            })
    }


    render() {
        return (
            <div >
                <div id="main" className="container jumbotron" >
                    <h2>Inscrivez-Vous</h2>
                    <div className="form-inline">
                        <input className="form-control"
                            type="text"
                            placeholder="Your Name"
                            onChange={event => this.setState({ name: event.target.value })}
                        />
                        <input className="form-control"
                            type="text"
                            placeholder="Your Mail"
                            onChange={event => this.setState({ email: event.target.value })}
                        />
                        <input className="form-control"
                            type="password"
                            placeholder="Your Password"
                            onChange={event => this.setState({ password: event.target.value })}
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.signUp()}
                        >
                            Sign Up
                </button>
                    </div>
                    <div>{this.state.error.message}</div>
                    <div><Link to={'/SignIn'}>Already user ? Sign in instead</Link></div>
                </div>
            </div>
        )
    }
}

export default signUp;