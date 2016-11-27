import React from "react";
import {Link} from "react-router";

export default class NavBar extends React.Component {
    render() {
        const {history} = this.props;
        const containerStyle = {
            marginTop: "60px"
        }
        return (
            <div >
                <h1>Nav Bar</h1>
                <Link to='/'>home</Link>
                <Link to='messages'>messages</Link>
                <Link to='#'>log out</Link>
                {this.props.children}
            </div>
        );
    }
}
