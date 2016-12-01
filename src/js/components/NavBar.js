import React from "react";
import {Link} from "react-router";
import Cookies from 'js-cookie';
import auth from '../utils/LoginStatus';

export default class NavBar extends React.Component {
    constructor(props){
        super(props)
        //gets logged in user if there is one
        this.state = {
            user : auth.getLoggedInUser()
        };
    }
    render() {
        if(!this.state.user.id){
            //nav bar to show if the user is not logged in
            return (
                <div>
                    <div className='nav-container'>
                        <ul>
                            <li className='logo'><Link to='/'>Name</Link></li>
                            <div className='right'>
                                <li className='home sliding-u-l-r'><Link to='/'>Home</Link></li>
                                <li className='sliding-u-l-r'><Link to='login'>Log In</Link></li>
                                <li className='sliding-u-l-r'><Link to='signup'>Sign Up</Link></li>
                            </div>
                        </ul>
                    </div>
                    {this.props.children}
                </div>
            );
        }else{
            //nav bar to show if the user not logged in
            return (
                <div>
                    <div className='nav-container'>
                        <ul>
                            <li className='logo'><Link to='/'>{this.state.user.name}</Link></li>
                            <div className='right'>
                                <li className='home sliding-u-l-r'><Link to='/'>Home</Link></li>
                                <li className='sliding-u-l-r'><Link to='messages'>Messages</Link></li>
                                <li className='sliding-u-l-r'><Link to='logout'>Log Out</Link></li>
                            </div>
                        </ul>
                    </div>
                    {this.props.children}
                </div>
            );
        }

    }
}
