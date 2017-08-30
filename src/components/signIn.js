import React, { Component } from 'react';
import * as firebase from 'firebase';
import { browserHistory , Link } from 'react-router';
import './sign.css';


class signIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            }
        }
    }

    signIn() {
        console.log('this.state', this.state);
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({ error })
                console.log('error signin');

            })

            .then(function () {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        console.log('user has signed in or up', user);
                        browserHistory.push("/MainPage");
                    }
                    else {
                        console.log('user hanst signed');
                    }
                })


            })
    }


    render() {
        return (
            <div>
                <div id="main" className=" container jumbotron" >
                    <h2>Connectez Vous </h2>
                    <div className="form-inline">
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
                            onClick={() => this.signIn()}
                        >
                            Sign In
                </button>
                    </div>
                    <div>{this.state.error.message}</div>
                    <div><Link to={'/signup'}>Sign Up instead.</Link></div>
                </div>
            </div>

        )
    }
}

export default signIn;