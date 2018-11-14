import React, { Component } from 'react';
import '../../styles/App.css';
import NavAppBar from './NavAppBar'
import Home from './Home';
import NotFound from '../components/NotFound';
import Help from '../components/Help';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Router>
                <div className="route-container"> 
                    <NavAppBar />
                    <Switch>
                        
                        <Route path="/Help" component={Help} />
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
