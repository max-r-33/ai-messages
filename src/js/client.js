import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import MessageView from './components/Messages/MessageView';
import HomeView from './components/Home/HomeView';
import NavBar from './components/NavBar';
import LoginView from './components/Login/LoginView';
import SignupView from './components/Signup/SignupView';
import LogOutView from './components/Logout/LogOutView';
import SettingsView from './components/Settings/SettingsView';
import FeaturesView from './components/Features/FeaturesView';
import auth from './utils/LoginStatus';

import reset from '../styles/reset.scss';
import master from '../styles/master.scss';
import messageContainerStyle from '../styles/messageContainer.scss';
import textRegionStyle from '../styles/textRegion.scss';
import messageViewStyle from '../styles/messageView.scss';
import navStyle from '../styles/nav.scss';
import messageStyle from '../styles/message.scss';
import homeStyle from '../styles/homeView.scss';
import formStyle from '../styles/formStyles.scss';
import customMessageStyle from '../styles/customMessage.scss';
import infoStyle from '../styles/info.scss';
import featuresStyle from '../styles/featuresView.scss';

const app = document.getElementById('app');

//checks if a user is logged in and redirects to login page if they are not
function requireAuth(nextState, replace) {
    if (!auth.userLoggedIn())
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
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
    <Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
    <Route path='/' component={NavBar}>
        <IndexRoute component={HomeView}></IndexRoute>
        <Route path='features' component={FeaturesView}></Route>
        <Route path='login' component={LoginView} onEnter={requireNotLoggedIn}></Route>
        <Route path='signup' component={SignupView} onEnter={requireNotLoggedIn}></Route>
        <Route path='logout' component={LogOutView}></Route>
        <Route path='messages' component={MessageView} onEnter={requireAuth}></Route>
        <Route path='settings' component={SettingsView} onEnter={requireAuth}></Route>
    </Route>
</Router>, app);
