import React from "react";
import {Link} from "react-router";
import navStyle from '../../styles/nav.scss';
import messageStyle from '../../styles/message.scss';
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
                            <li className='sliding-u-l-r'><Link to='#'>Log out</Link></li>
                        </div>
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
}
