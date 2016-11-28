import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import MessageView from './components/Messages/MessageView';
import HomeView from './components/Home/HomeView';
import NavBar from './components/NavBar';
import reset from '../styles/reset.scss';
import skeleton from '../styles/skeleton.scss';
import master from '../styles/master.scss';
import MessageContainerStyles from '../styles/messageContainer.scss';
import textRegionStyles from '../styles/textRegion.scss';

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={NavBar}>
            <IndexRoute component={HomeView}></IndexRoute>
            <Route path='messages' component={MessageView}></Route>
        </Route>
    </Router>
, app);
