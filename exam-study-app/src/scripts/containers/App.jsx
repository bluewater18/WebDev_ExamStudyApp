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
import MyGroups from './MyGroups';
import EditUser from './EditUser';
import CreateGroup from './CreateGroup';
import GroupHome from './GroupHome';
import JoinGroupCode from './JoinGroupCode';
import BasicNotifier from '../components/BasicNotifier';

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
                        <Route path="/user/edit" component={EditUser} />
                        <Route path="/groups/create" component={CreateGroup} />
                        <Route path="/group/:groupId" component={GroupHome} />
                        <Route path="/groups/join-code" component={JoinGroupCode} />
                        {/* <Route path="/group/:groupId/edit" component={GroupEdit} /> */}
                        <Route exact path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
            <BasicNotifier/>
        </div>
    );
  }
}

export default App;
