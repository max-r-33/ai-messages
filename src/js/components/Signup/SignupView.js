import React from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            passwordConfirm: ''
        };
    }

    //event handlers
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }
    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    handlePasswordConfirmChange(event) {
        this.setState({passwordConfirm: event.target.value});
    }
    handleSubmit(event) {

        event.preventDefault();

        //checks if all fields are filled in and passwords match
        if (this.state.email && this.state.password && this.state.password === this.state.passwordConfirm) {
            var pword = this.state.password;
            var em = this.state.email;
            var nm = this.state.name;

            //hashes password
            bcrypt.hash(pword, 10, function(err, hash) {
                //creates user
                axios.post('http://localhost:9000/api/signup', {
                    name: nm,
                    email: em,
                    password: hash
                }).then(response => {
                    if (response.data.severity === 'ERROR') {
                        alert('An account with that email already exists!');
                    } else {
                        window.location.href = 'http://localhost:8080/#/login';
                    }
                });
            });
        } else if (this.state.password !== this.state.passwordConfirm) {
            alert('Passwords dont match');
        } else {
            alert('All fields must be filled out!');
        }

    }
    render() {
        return (
            <div className='formView'>
                <form>
                    <div className='header'>
                        <h1>Sign Up</h1>
                    </div>
                    <div className='inputContainer'>
                        <input className='formInput' onChange={event => this.handleNameChange(event)} value={this.state.name} type='text'></input>
                        <label>First Name</label>
                    </div>
                    <div className='inputContainer'>
                        <input className='formInput' onChange={event => this.handleEmailChange(event)} value={this.state.email} type='email'></input>
                        <label>Email</label>
                    </div>
                    <div className='inputContainer'>
                        <input className='formInput' onChange={event => this.handlePasswordChange(event)} value={this.state.password} type='password'></input>
                        <label>Password</label>
                    </div>
                    <div className='inputContainer'>
                        <input className='formInput' onChange={event => this.handlePasswordConfirmChange(event)} value={this.state.passwordconfirm} type='password'></input>
                        <label>Confirm Password</label>
                    </div>
                    <button className='formBtn' onClick={event => this.handleSubmit(event)}>Sign Up</button>
                </form>
            </div>
        )
    }
}
