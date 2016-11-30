import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import MessageView from './components/Messages/MessageView';
import HomeView from './components/Home/HomeView';
import NavBar from './components/NavBar';
import LoginView from './components/Login/LoginView';
import SignupView from './components/Signup/SignupView';
import LogOutView from './components/Logout/LogOutView';

import auth from './utils/LoginStatus';

import reset from '../styles/reset.scss';
import master from '../styles/master.scss';
import messageContainerStyles from '../styles/messageContainer.scss';
import textRegionStyles from '../styles/textRegion.scss';
import messageViewStyles from '../styles/messageView.scss';
import navStyle from '../styles/nav.scss';
import messageStyle from '../styles/message.scss';
import homeStyle from '../styles/homeView.scss';
import formStyles from '../styles/formStyles.scss';

const app = document.getElementById('app');

//checks if a user is logged in and redirects to login page if they are not
function requireAuth(nextState, replace) {
    if (!auth.userLoggedIn())
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        })
}

//checks if a user is logged in and redirects them to the messages page
function requireNotLoggedIn(nextState, replace) {
    if (auth.userLoggedIn())
        replace({
            pathname: '/messages',
            state: {
                nextPathname: nextState.location.pathname
            }
        })
}

ReactDOM.render(
    <Router history={hashHistory}>
    <Route path='/' component={NavBar}>
        <IndexRoute component={HomeView}></IndexRoute>
        <Route path='login' component={LoginView} onEnter={requireNotLoggedIn}></Route>
        <Route path='signup' component={SignupView} onEnter={requireNotLoggedIn}></Route>
        <Route path='logout' component={LogOutView}></Route>
        <Route path='messages' component={MessageView} onEnter={requireAuth}></Route>
    </Route>
</Router>, app);
