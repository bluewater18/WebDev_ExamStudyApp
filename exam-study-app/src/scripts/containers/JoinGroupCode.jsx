import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import { Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { joinGroupWithCode } from '../actions/action-get-group';


class JoinGroupWithCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code:'',
        }
    }

    codeUpdate(evt) {
        this.setState({code:evt})
    }

    render() {
            return (
            
            <div className="Help">
                
                <Background />

                <Card className="Help-Card">
                    <CardContent className={"login-card-content"}>
                        <AccountCircleIcon fontSize="large" />
                        <h1 className="login-card-title">
                            Join Group
                        </h1>
                    </CardContent>

                    <hr />
                    
                    <CardContent className={"login-card-content"} style={{paddingBottom: "0", paddingTop: "5px" }}>
                        <TextField
                            required
                            value={this.state.code}
                            onChange={evt => this.codeUpdate(evt.target.value)}
                            id="join-group-code-field"
                            label="Group Code"
                            className="register-textfield"
                            margin="normal"
                        />
                    </CardContent>

                    <CardActions className={"login-card-actions"} style={{ display: "inline-block"}}>
                        <div style={{ width: "100%" }}>
                            <Button onClick={() => {this.props.joinGroupWithCode(this.state.code)}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%" }}>
                                Join!
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
        joinGroupWithCode: joinGroupWithCode
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroupWithCode);