import React, { Component } from 'react';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';
import './sign.css';


class myaccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            useremail: '',
            userpassword: '',
            error: {
                message: ''
            }
        }

    }

    /*updateUser() {
        });
    }*/

    deleteUser() {
        this.user.delete().then(function () {
            // User deleted.
            alert.log('user deleted')
            browserHistory("/signin")
        }).catch(function (error) {
            alert.log('error of delete')
        });
    }

    render() {
        var user = firebase.auth().currentUser;

        if (user) {
            this.username = user.displayName
            this.useremail = user.email
            console.log("online")

        } else {
            console.log("offline")
        }

        return (
            <div>
                <section className="content-header">
                    <h1>My Account</h1>
                </section>
                <section className="content">
                    <div>
                        <div id="main" className="container" >
                            <form className="form-horizontal">
                                <h5>Name : {this.username}</h5>
                                <h5>Mail : {this.useremail}</h5>
                                <label className="control-label"> Email</label>
                                <input
                                    type="email"
                                    id="newmail"
                                    className="form-control"
                                    placeholder="New Mail"
                                />
                                <label className=" control-label">Password</label>
                                <input
                                    id="newpass"
                                    type="password"
                                    className="form-control"
                                    placeholder="New Password" />
                                <div>
                                    <button type="submit"
                                        className="btn btn-default "
                                        onClick={() => this.updateUser()}>
                                        Update </button>
                                    <button
                                        type="submit"
                                        className="btn btn-danger "
                                        onClick={() => this.deleteUser()}>
                                        Delete Account</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default myaccount;