﻿import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import { Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeLoginEmail, changeLoginPassword, submitLogin } from '../actions/action-login-form-change';
import {withRouter} from 'react-router-dom';
//import BasicNotifier from '../components/BasicNotifier';

class Login extends React.Component {
    render() {
        return (
            <div className="Help">
                
                <Background />

                <Card className="Help-Card">
                    <CardContent className={"login-card-content"}>
                        <AccountCircleIcon fontSize="large" />
                        <h1 className="login-card-title">
                            Log In
                        </h1>
                    </CardContent>

                    <hr />
                    
                    <CardContent className={"login-card-content"} style={{paddingBottom: "0" }}>
                        <TextField
                            required
                            value={this.props.login.UserEmail}
                            onChange={evt => this.props.changeLoginEmail(evt.target.value)}
                            id="login-email"
                            label="Email"
                            className="register-textfield"
                            margin="normal"
                        />
                        <TextField
                            required
                            value={this.props.login.UserPassword}
                            onChange={evt => this.props.changeLoginPassword(evt.target.value)}
                            id="login-password"
                            label="Password"
                            className="register-textfield"
                            type="password"
                            margin="normal"
                        />
                    </CardContent>

                    <CardActions className={"login-card-actions"} style={{ display: "inline-block"}}>
                        <div style={{ width: "100%" }}>
                            <Button onClick={() => {this.props.submitLogin(this.props.login)}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%" }}>
                                Log In
                            </Button>
                        </div>
                        <Link to="/register">
                            <Button style={{ justifySelf: "right", fontSize: "xsmall", padding: "5px", minHeight:"0", marginBottom:"5px",}} >
                                Don't have an account? Register Here
                            </Button>
                        </Link>
                    </CardActions>
                </Card>

                {/*<BasicNotifier message="yello" />*/}
            
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ui: state.ui,
        login: state.login,
        user: state.user
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        changeLoginEmail: changeLoginEmail,
        changeLoginPassword: changeLoginPassword,
        submitLogin: submitLogin,
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));