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
                        <li><Link to='/'><h1>Name</h1></Link></li>
                        <div className='right'>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='messages'>Messages</Link></li>
                            <li><Link to='#'>log out</Link></li>
                        </div>
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
}
