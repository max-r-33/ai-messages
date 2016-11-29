import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import MessageView from './components/Messages/MessageView';
import HomeView from './components/Home/HomeView';
import NavBar from './components/NavBar';
import LoginView from './components/Login/LoginView';
import SignupView from './components/Signup/SignupView';

import reset from '../styles/reset.scss';
import master from '../styles/master.scss';
import messageContainerStyles from '../styles/messageContainer.scss';
import textRegionStyles from '../styles/textRegion.scss';
import messageViewStyles from '../styles/messageView.scss';
import navStyle from '../styles/nav.scss';
import messageStyle from '../styles/message.scss';
import homeStyle from '../styles/homeView.scss';
import loginViewStyle from '../styles/loginView.scss';
import signupViewStyle from '../styles/signupView.scss';

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={NavBar}>
            <IndexRoute component={HomeView}></IndexRoute>
            <Route path='messages' component={MessageView}></Route>
            <Route path='login' component={LoginView}></Route>
            <Route path='signup' component={SignupView}></Route>
        </Route>
    </Router>
, app);
