import React, { Component } from 'react';
//import '../../styles/App.css';
import NavAppBar from './NavAppBar'
import Home from './Home';
import NotFound from '../components/NotFound';
import Help from '../components/Help';
import Register from '../containers/Register';
import Login from '../containers/Login';
import history from '../../history';

import {Router, Route, Switch } from "react-router-dom";
import MyGroups from './MyGroupHelper';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Router history={history}>
                <div className="route-container"> 
                    <NavAppBar />
                    <Switch>
                        
                        <Route path="/help" component={Help} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/my-groups" component={MyGroups} />
                        <Route exact path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
  }
}

export default App;
