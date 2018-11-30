import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import { Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGroupName, createGroupDescription, createGroupType, createGroupOwner, createGroupPhoto, createGroupComplete } from '../actions/action-create-group';
import {withRouter} from 'react-router-dom';
import { Select, MenuItem, InputLabel, } from '@material-ui/core';

class CreateGroup extends React.Component {
    render() {
        return (
            <div className="Help">
                
                <Background />

                <Card className="edit-user-card">
                    <CardContent className={"edit-user-card-content"}>
                        <AddIcon fontSize="large" />
                        <h1 className="edit-user-card-title">
                            New Group
                        </h1>
                    </CardContent>

                    <hr />
                    
                    <CardContent className={"edit-user-card-content"} style={{paddingBottom: "0", paddingTop: "5px", display:"flex", flexDirection:"column", flexWrap:"wrap" }}>
                        <TextField
                            value={this.props.createGroup.groupName}
                            onChange={evt => this.props.createGroupName(evt.target.value)}
                            id="edit-name"
                            label="New Name"
                            className="register-textfield"
                            margin="normal"
                        />
                        <TextField
                            value={this.props.createGroup.groupDescription}
                            onChange={evt => this.props.createGroupDescription(evt.target.value)}
                            id="create-desc"
                            label="Group Description"
                            multiline={true}
                            className="register-textfield"
                            margin="normal"
                        />
                        
                        <InputLabel htmlFor="group-type-placeholder" style={{textAlign:"left", fontSize:"1.3rem", paddingTop:"10px"}}>
                            Group Type:
                        </InputLabel>
                        <Select
                            value={this.props.createGroup.groupType}
                            onChange={evt => this.props.createGroupType(evt.target.value) }
                            inputProps={{name:'groupType', id: 'group-type-placeholder'}}
                            className={"create-group-select"}
                        >
                            <MenuItem value={"none"}><em>None</em></MenuItem>
                            <MenuItem value={"ExamStudy"}>Exam Study</MenuItem>
                            <MenuItem value={"StudyGroup"}>Study Group</MenuItem>
                        </Select>

                        <InputLabel htmlFor="create-group-photo-file" style={{textAlign:"left", fontSize:"1.3rem", padding:"15px 0 5px 0"}}>
                            Group Image:
                        </InputLabel>
                        <input
                            accept="image/*"
                            style={{display:"none"}}
                            id="create-group-photo-file"
                            type="file"
                            onChange={evt => this.props.createGroupPhoto(evt.target.files[0])}
                        />
                        <label htmlFor="create-group-photo-file">
                            <Button variant="contained" component="span" style={{margin:"theme.spacing.unit"}}>
                                {(this.props.createGroup.groupPhoto === null?"Upload A File":"Upload A Different File")}
                            </Button>
                        </label>

                    </CardContent>

                    <CardActions className={"edit-user-card-actions"} style={{ display: "inline-block"}}>
                        <div style={{ width: "100%" }}>
                            <Button onClick={() => {this.props.createGroupComplete(this.props.createGroup, this.props.user.id)}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%", fontSize:"1.4rem" }}>
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
        createGroup: state.createGroup,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        createGroupName: createGroupName,
        createGroupDescription: createGroupDescription,
        createGroupType: createGroupType,
        createGroupPhoto: createGroupPhoto,
        createGroupOwner: createGroupOwner,
        createGroupComplete: createGroupComplete,
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGroup));