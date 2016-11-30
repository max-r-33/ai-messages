import React from 'react';
import Cookies from 'js-cookie';

export default class LogOutView extends React.Component{
    constructor(props){
        //removes user cookie and redirects home
        super(props);
        Cookies.remove('user');
        window.location.href='http://localhost:8080/';
    }
    render(){
        return (
            <div>
                Logging Out...
            </div>
        )
    }
}
