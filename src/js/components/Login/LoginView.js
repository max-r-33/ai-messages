import React from 'react';
import {browserHistory} from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    //event handlers

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        //posts to db which checks if there is a match
        axios.post('http://localhost:9000/api/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            //based on the result, set cookie, or alert that
            //their account wasn't found
            if (response.data.error) {
                alert('no match');
            } else {
                Cookies.set('user', {
                    name: response.data[0].name,
                    id: response.data[0].id,
                    email: response.data[0].email
                }, {
                    expires: 1,
                    path: '/'
                });
                window.location.reload();
                window.location.href='http://localhost:8080/#/messages';
            }
        });
    }
    render() {
        return (
            <div className='loginView'>
                <h1>Login</h1>
                <form>
                    <input onChange={event => this.handleEmailChange(event)} value={this.state.email} placeholder='Email' type='email'></input>
                    <input onChange={event => this.handlePasswordChange(event)} value={this.state.password} placeholder='Password' type='password'></input>
                    <button onClick={event => this.handleSubmit(event)}>Submit</button>
                </form>
            </div>
        )
    }
}
