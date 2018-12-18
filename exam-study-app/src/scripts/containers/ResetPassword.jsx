import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import { Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPassword } from '../actions/action-password-reset';


class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password:'',
        }
    }

    passwordUpdate(evt) {
        this.setState({password:evt})
    }

    render() {
            return (
            
            <div className="Help">
                
                <Background />

                <Card className="Help-Card">
                    <CardContent className={"login-card-content"}>
                        <AccountCircleIcon fontSize="large" />
                        <h1 className="login-card-title">
                            Reset Password
                        </h1>
                    </CardContent>

                    <hr />
                    
                    <CardContent className={"login-card-content"} style={{paddingBottom: "0", paddingTop: "5px" }}>
                        <TextField
                            required
                            value={this.state.password}
                            onChange={evt => this.passwordUpdate(evt.target.value)}
                            id="reset-password-field"
                            label="New Password"
                            className="register-password"
                            margin="normal"
                            type="password"
                        />
                    </CardContent>

                    <CardActions className={"login-card-actions"} style={{ display: "inline-block"}}>
                        <div style={{ width: "100%" }}>
                            <Button onClick={() => {this.props.resetPassword(this.state.password, this.props.match.params)}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%" }}>
                                Submit
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetPassword: resetPassword
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);