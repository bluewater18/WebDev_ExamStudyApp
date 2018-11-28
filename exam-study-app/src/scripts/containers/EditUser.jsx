import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import { Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeEditName, changeEditEmail, changeEditPassword, changeEditPhoto, editComplete } from '../actions/action-edit-user-form-change';
import {withRouter} from 'react-router-dom';
//import BasicNotifier from '../components/BasicNotifier';

class Login extends React.Component {
    render() {
        return (
            <div className="Help">
                
                <Background />

                <Card className="edit-user-card">
                    <CardContent className={"edit-user-card-content"}>
                        <EditIcon fontSize="large" />
                        <h1 className="edit-user-card-title">
                            My Details
                        </h1>
                    </CardContent>

                    <hr />
                    
                    <CardContent className={"edit-user-card-content"} style={{paddingBottom: "0", display:"flex", flexDirection:"column" }}>
                        <TextField
                            value={this.props.editUser.UserName}
                            onChange={evt => this.props.changeEditName(evt.target.value)}
                            id="edit-name"
                            label="New Name"
                            className="register-textfield"
                            margin="normal"
                        />
                        <TextField
                            value={this.props.editUser.UserEmail}
                            onChange={evt => this.props.changeEditEmail(evt.target.value)}
                            id="edit-email"
                            label="New Email"
                            className="register-textfield"
                            margin="normal"
                        />
                        <TextField
                            value={this.props.editUser.UserPassword}
                            onChange={evt => this.props.changeEditPassword(evt.target.value)}
                            id="edit-password"
                            label="New Password"
                            className="register-textfield"
                            type="password"
                            margin="normal"
                        />

                        <input
                            accept="image/*"
                            style={{display:"none"}}
                            id="edit-user-photo-file"
                            type="file"
                            onChange={evt => this.props.changeEditPhoto(evt.target.files[0])}
                        />
                        <label htmlFor="edit-user-photo-file">
                            <Button variant="contained" component="span" style={{margin:"theme.spacing.unit"}}>
                                {(this.props.editUser.UserPhoto === null?"Upload A File":"Upload A Different File")}
                            </Button>
                        </label>

                    </CardContent>

                    <CardActions className={"edit-user-card-actions"} style={{ display: "inline-block"}}>
                        <div style={{ width: "100%" }}>
                            <Button onClick={() => {this.props.editComplete(this.props.editUser, this.props.user.id, this.props.editUser.UserPhoto)}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%" }}>
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
        editUser: state.editUser,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        changeEditName: changeEditName,
        changeEditEmail: changeEditEmail,
        changeEditPassword: changeEditPassword,
        changeEditPhoto: changeEditPhoto,
        editComplete: editComplete,
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));