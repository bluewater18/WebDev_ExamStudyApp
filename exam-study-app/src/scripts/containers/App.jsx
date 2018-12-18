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
import GroupEdit from './EditGroup';
import ResourceHome from './ResourceHome';
import DailyGoals from './DailyGoals';
import MyCalendar from './MyCalendar';
import StudyTimer from './StudyTimer';
import RequestResetPassword from './RequestResetPassword';
import ResetPassword from './ResetPassword';

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
                        <Route path="/daily-goals" component={DailyGoals} />
                        <Route path="/my-calendar" component={MyCalendar} />
                        <Route path="/study-timer" component={StudyTimer} />
                        <Route path="/my-groups" component={MyGroups} />
                        <Route path="/user/edit" component={EditUser} />
                        <Route path="/group/:groupId/resource/:resourceId" component={ResourceHome}  />
                        <Route path="/group/:groupId/edit" component={GroupEdit} />
                        <Route path="/group/:groupId" component={GroupHome} />
                        <Route path="/groups/create" component={CreateGroup} />
                        <Route path="/groups/join-code" component={JoinGroupCode} />
                        <Route path="/reset-password/:resetKey" component={ResetPassword} />
                        <Route path="/reset-password" component={RequestResetPassword} />


                        
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
