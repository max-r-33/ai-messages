import React from 'react';
import axios from 'axios';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: ''
        };
    }
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    handlePasswordConfirmChange(event) {
        this.setState({passwordConfirm: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);
        console.log(this.state.passwordConfirm);
        if (this.state.email && this.state.password && this.state.password === this.state.passwordConfirm) {
            axios.post('http://localhost:9000/api/signup', {
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                console.log(response);
            });
        } else if (this.state.password !== this.state.passwordConfirm) {
            alert('Passwords dont match');
        } else {
            alert('All fields must be filled out!');
        }

    }
    render() {
        return (
            <div className='signupView'>
                <h1>Signup</h1>
                <form>
                    <input onChange={event => this.handleEmailChange(event)} value={this.state.email} placeholder='Email' type='email'></input>
                    <input onChange={event => this.handlePasswordChange(event)} value={this.state.password} placeholder='Password' type='password'></input>
                    <input onChange={event => this.handlePasswordConfirmChange(event)} value={this.state.passwordconfirm} placeholder='Confirm Password' type='password'></input>
                    <button onClick={event => this.handleSubmit(event)}>Signup</button>
                </form>
            </div>
        )
    }
}
