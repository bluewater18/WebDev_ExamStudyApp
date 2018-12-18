import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import { Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestPasswordReset } from '../actions/action-password-reset';


class RequestResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
        }
    }

    emailUpdate(evt) {
        this.setState({email:evt})
    }

    render() {
            return (
            
            <div className="Help">
                
                <Background />

                <Card className="Help-Card">
                    <CardContent className={"login-card-content"}>
                        <AccountCircleIcon fontSize="large" />
                        <h1 className="login-card-title">
                            Request Password Reset
                        </h1>
                    </CardContent>

                    <hr />
                    
                    <CardContent className={"login-card-content"} style={{paddingBottom: "0", paddingTop: "5px" }}>
                        <TextField
                            required
                            value={this.state.email}
                            onChange={evt => this.emailUpdate(evt.target.value)}
                            id="reset-email-field"
                            label="Email"
                            className="register-textfield"
                            margin="normal"
                        />
                    </CardContent>

                    <CardActions className={"login-card-actions"} style={{ display: "inline-block"}}>
                        <div style={{ width: "100%" }}>
                            <Button onClick={() => {this.props.requestPasswordReset(this.state.email)}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%" }}>
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
        requestPasswordReset: requestPasswordReset,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestResetPassword);