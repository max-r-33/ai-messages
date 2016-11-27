import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import MessageView from './Messages/MessageView';
import HomeView from './Home/HomeView';

export default class Layout extends React.Component {
  render() {
    return (
        
    //   <Router history = {browserHistory}>
    //       <IndexRoute path='/' component={NavBar}>
    //           <Route path='/messages' component={MessageView} />
    //           <Route path='/home' component={HomeView} />
    //       </IndexRoute>
    //   </Router>
    );
  }
}
