import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import { Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Select, MenuItem, InputLabel, } from '@material-ui/core';
import { editGroupName, editGroupDescription, editGroupType, editGroupPhoto, editGroupComplete } from '../actions/action-edit-group';
import { groupTypes } from '../constants';

class EditGroup extends React.Component {
    render() {
        return (
            <div className="Help">
                
                <Background />

                <Card className="edit-user-card">
                    <CardContent className={"edit-user-card-content"}>
                        <AddIcon fontSize="large" />
                        <h1 className="edit-user-card-title">
                            Edit Group
                        </h1>
                    </CardContent>

                    <hr />
                    
                    <CardContent className={"edit-user-card-content"} style={{paddingBottom: "0", paddingTop: "5px", display:"flex", flexDirection:"column", flexWrap:"wrap" }}>
                        <TextField
                            value={this.props.editGroup.groupName}
                            onChange={evt => this.props.editGroupName(evt.target.value)}
                            id="edit-name"
                            label="New Name"
                            className="register-textfield"
                            margin="normal"
                        />
                        <TextField
                            value={this.props.editGroup.groupDescription}
                            onChange={evt => this.props.editGroupDescription(evt.target.value)}
                            id="edit-desc"
                            label="Group Description"
                            multiline={true}
                            className="register-textfield"
                            margin="normal"
                        />
                        
                        <InputLabel htmlFor="group-type-placeholder" style={{textAlign:"left", fontSize:"1.3rem", paddingTop:"10px"}}>
                            Group Type:
                        </InputLabel>
                        <Select
                            value={this.props.editGroup.groupType}
                            onChange={evt => this.props.editGroupType(evt.target.value) }
                            inputProps={{name:'groupType', id: 'group-type-placeholder'}}
                            className={"edit-group-select"}
                        >
                            <MenuItem value={"none"}><em>None</em></MenuItem>
                            {Object.keys(groupTypes).map(e =>
                                <MenuItem key={groupTypes[e]} value={groupTypes[e]}>{groupTypes[e]}</MenuItem>
                            )}
                        </Select>

                        <InputLabel htmlFor="edit-group-photo-file" style={{textAlign:"left", fontSize:"1.3rem", padding:"15px 0 5px 0"}}>
                            Group Image:
                        </InputLabel>
                        <input
                            accept="image/*"
                            style={{display:"none"}}
                            id="edit-group-photo-file"
                            type="file"
                            onChange={evt => this.props.editGroupPhoto(evt.target.files[0])}
                        />
                        <label htmlFor="edit-group-photo-file">
                            <Button variant="contained" component="span" style={{margin:"theme.spacing.unit"}}>
                                {(this.props.editGroup.groupPhoto === null?"Upload A File":"Upload A Different File")}
                            </Button>
                        </label>

                    </CardContent>

                    <CardActions className={"edit-user-card-actions"} style={{ display: "inline-block"}}>
                        <div style={{ width: "100%" }}>
                            <Button onClick={() => {this.props.editGroupComplete(this.props.editGroup, this.props.user.id)}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%", fontSize:"1.4rem" }}>
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
        editGroup: state.editGroup,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        editGroupName: editGroupName,
        editGroupDescription: editGroupDescription,
        editGroupType: editGroupType,
        editGroupPhoto: editGroupPhoto,
        editGroupComplete: editGroupComplete,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGroup);