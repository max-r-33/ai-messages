import React from 'react';
import {browserHistory} from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount(){
        document.title = 'Login';
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
        axios.get('http://localhost:9000/api/login?email=' + this.state.email).then(response => {
            //based on the result, set cookie, or alert that
            //their account wasn't found
            console.log(response);
            if (response.data.error) {
                alert('no match');
            } else {
                //compares password with encrypted password
                bcrypt.compare(this.state.password, response.data[0].password, function(err, res){
                    if(res){
                        Cookies.set('user', {
                            name: response.data[0].name,
                            id: response.data[0].id,
                            email: response.data[0].email
                        }, {
                            expires: 1,
                            path: '/'
                        });
                        window.location.reload();
                        window.location.href = 'http://localhost:8080/#/messages';
                    }else{
                        alert('error');
                    }
                });
            }
        });
    }
    render() {
        return (
            <div className='formView'>
                <form>
                    <div className='header'><h1>Login</h1></div>
                    <div className='inputContainer'>
                        <input className='formInput' onChange={event => this.handleEmailChange(event)} value={this.state.email} type='email'></input>
                        <label>Email</label>
                    </div>
                    <div className='inputContainer'>
                        <input className='formInput' onChange={event => this.handlePasswordChange(event)} value={this.state.password} type='password'></input>
                        <label>Password</label>
                    </div>
                    <button className='formBtn' onClick={event => this.handleSubmit(event)}>Login</button>
                </form>
            </div>
        )
    }
}
