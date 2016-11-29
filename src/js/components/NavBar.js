import React from "react";
import {Link} from "react-router";

export default class NavBar extends React.Component {
    render() {
        const {history} = this.props;
        const containerStyle = {
            marginTop: "60px"
        }
        return (
            <div>
                <div className='nav-container'>
                    <ul>
                        <li className='logo'><Link to='/'>Name</Link></li>
                        <div className='right'>
                            <li className='sliding-u-l-r'><Link to='/'>Home</Link></li>
                            <li className='sliding-u-l-r'><Link to='messages'>Messages</Link></li>
                            <li className='sliding-u-l-r'><Link to='login'>Log In</Link></li>
                            <li className='sliding-u-l-r'><Link to='signup'>Sign Up</Link></li>
                        </div>
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
}
