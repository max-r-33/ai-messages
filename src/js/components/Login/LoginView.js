import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);
        axios.post('http://localhost:9000/api/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            console.log(response)
            if (response.data.error) {
                alert('no match');
            } else {
                alert('logged in');
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
