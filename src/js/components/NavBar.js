import React from "react";
import {Link} from "react-router";

export default class NavBar extends React.Component {
    render() {
        const {history} = this.props;
        const containerStyle = {
            marginTop: "60px"
        }
        return (
            <div className='nav-container'>
                <ul>
                    <li><h1>Name</h1></li>
                    <li><Link to='/'>home</Link></li>
                    <li><Link to='messages'>messages</Link></li>
                    <li><Link to='#'>log out</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}
