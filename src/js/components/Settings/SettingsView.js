import React from 'react';
import axios from 'axios';
import auth from '../../utils/LoginStatus.js';
import Cookies from 'js-cookie';

export default class SettingsView extends React.Component {
    constructor(props) {
        super(props);
        var user = auth.getLoggedInUser();
        this.state = {
            name: user.name,
            email: user.email,
            id: parseInt(user.id)
        };
        console.log(this.state.id);
    }
    componentDidMount(){
        document.title = 'Settings';
    }
    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handleDelete(event) {
        event.preventDefault();
        var x = confirm('Are you sure you want to delete your account? Deleting your accound deletes all of your messages.');
        if (x) {
            console.log('deleted')
            axios({
                url: 'http://localhost:9000/api/deleteAccount',
                method: 'DELETE',
                data: {
                    email: this.state.email,
                    id: parseInt(this.state.id)
                }
            }).then(response => {
                if (response.data.error) {
                    alert('error, try again');
                } else {
                    console.log('ok');
                    Cookies.remove('user');
                    window.location.reload();
                }
            });
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        //posts to db which checks if there is a match
        axios.put('http://localhost:9000/api/changeName', {
            email: this.state.email,
            newName: this.state.name
        }).then(response => {
            Cookies.remove('user');
            window.location.reload();
        });
    }
    render() {
        return (
            <div className='formView'>
                <form>
                    <div className='header'>
                        <h1>Settings</h1><br/>
                        <label>When you update your settings, you'll have to login again.</label>
                    </div>
                    <div className='inputContainer'>
                        <input className='formInput' onChange={event => this.handleNameChange(event)} value={this.state.name} type='text'></input>
                        <label>Name</label>
                    </div>
                    <button className='formBtn' onClick={event => this.handleSubmit(event)}>Update Name</button>
                </form>
                <button className='formBtn formBtnDanger' onClick={event => this.handleDelete(event)}>Delete Account</button>
            </div>
        );
    }
}
