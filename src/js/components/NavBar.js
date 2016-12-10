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
                            <li className='logo'><Link to='/'></Link></li>
                            <div className='right'>
                                <li id='home' className='sliding-u-l-r'><Link to='/'>home</Link></li>
                                <li className='hideOnMobile sliding-u-l-r'><Link to='features'>features</Link></li>
                                <li className='sliding-u-l-r'><Link to='login'>log in</Link></li>
                                <li className='sliding-u-l-r'><Link to='signup'>sign up</Link></li>
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
                            <li className='logo'><Link to='/'>{this.state.user.name.toLowerCase()}</Link></li>
                            <div className='right'>
                                <li className='hideOnMobile sliding-u-l-r'><Link to='features'>features</Link></li>
                                <li className='sliding-u-l-r'><Link to='messages'>messages</Link></li>
                                <li className='hideOnMobile sliding-u-l-r'><Link to='settings'>settings</Link></li>
                                <li className='sliding-u-l-r'><Link to='logout'>log out</Link></li>
                            </div>
                        </ul>
                    </div>
                    {this.props.children}
                </div>
            );
        }

    }
}
