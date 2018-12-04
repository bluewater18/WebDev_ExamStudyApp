import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import {getGroup, getGroupMembers, deleteGroup} from '../actions/action-get-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IMAGE_PATH } from '../constants/index';
import {Card, CardContent, Divider, ListItem, List, Button, Popover, Modal, } from '@material-ui/core';
import GroupMemberListItem from './GroupMemberListItem';
import UserListItem from './UserListItem';
import {getAllUsers, addUserToGroup, leaveGroup, removeUserFromGroup} from '../actions/action-users';
import {editGroupInit} from '../actions/action-edit-group';


class GroupHome extends React.Component {
    state = {
        anchorEl: null,
        modalOpen: false,
      };

      addUserToGroupWrapper = (user) => {
        this.props.addUserToGroup(user, this.props.activeGroup.groupId)
      }

      removeUserFromGroupWrapper = (user) => {
          this.props.removeUserFromGroup(user, this.props.activeGroup.groupId)
      }
    
      handleClick = event => {
        this.setState({
          anchorEl: event.currentTarget,
        });
      };
    
      handleClose = () => {
        this.setState({
          anchorEl: null,
        });
      };
    componentDidMount() {
        const { groupId } = this.props.match.params;
        this.props.getGroup(groupId);
        this.props.getGroupMembers(groupId);
    }

    handleModalOpen = () => {
        this.setState({modalOpen:true})
    }

    handleModalClose = () => {
        this.setState({modalOpen:false})
    }

    deleteGroup = (groupId) => {
        this.props.deleteGroup(groupId);
    }

    isAdmin() {
        for(let i =0; i<this.props.activeGroup.groupAdmins.length; i++){
            if(this.props.activeGroup.groupAdmins[i] === this.props.user.id)
                return true;
        }
        return false;
    }
    render() {

        return (
            
            <div className="group-home">
            {this.deleteConfirm()}
                <Background/>
                <div className="group-home-header" >
                    <img src={IMAGE_PATH + this.props.activeGroup.groupPhotoPath} alt="user profile" width="150" height="150" />
                    <h1 style={{fontSize:"xx-large"}}>{this.props.activeGroup.groupName}</h1>
                </div>
                <div className="group-home-card-area">
                    <div>
                        {this.infoCardRenderer()}
                    </div>
                    <div>
                        {this.resourceCardRenderer()}
                    </div>
                    <div>
                        {this.memberCardRenderer()}
                    </div>
                </div>

            </div>
            )
    }

    deleteConfirm() {
        return(
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.modalOpen}
            onClose={() => this.handleModalClose()}
            >
                <div style={{top:"50%", left:"50%", transform:"translate(-50%, -50%)", position:"absolute", textAlign:"center", background:"white", padding:"1rem"}} className="group-home-delete-modal">
                    <h1 style={{color:"black"}}>
                        Are you sure you want to delete this group
                        <br/>
                        This action cannot be undone
                    </h1>
                    <Button variant="contained"  style={{margin:"5px", fontSize:"1.2rem", color:"red"}} onClick={()=> this.deleteGroup(this.props.activeGroup.groupId)}>
                            I'm Sure
                    </Button>
                    <Button style={{margin:"5px", fontSize:"1.2rem", color:"primary"}} onClick={()=> this.handleModalClose()}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        )
    }

    infoCardRenderer() {
        return(
            <Card className="group-home-container">
                    <CardContent className="group-home-content-header-members">
                    <div/>
                    <div><h1>{this.props.activeGroup.groupName}</h1></div>
                    <div>
                        {this.infoCardRendererButton()}
                    </div>
                    </CardContent>
                    <Divider />
                    <CardContent className="group-home-content" style={{textAlign:"left"}}>
                    <h3> Description: {this.props.activeGroup.groupDescription}</h3>
                    <h3> Created By: {this.props.activeGroup.groupOwnerName}</h3>
                    <h3> Group Type: {this.props.activeGroup.groupType}</h3>
                    <h3> Member Count: {this.props.activeGroup.groupMemberCount}</h3>
                    <hr/>
                    <h3> Group Code: {this.props.activeGroup.groupCode}</h3>
                    <hr/>
                    {this.groupLeaveButton()}
                    
                </CardContent>
            </Card>
        )
    }

    groupLeaveButton() {
        if(this.props.user.id === this.props.activeGroup.groupOwnerId)
            return(
                <Button variant="contained" color="secondary" style={{margin:"5px", fontSize:"1.2rem"}} onClick={()=> this.handleModalOpen()}>
                    Delete Group
                </Button>
            )
        else
            return(
                <Button variant="contained" color="secondary" style={{margin:"5px", fontSize:"1.2rem"}} onClick={()=> this.props.leaveGroup(this.props.user, this.props.activeGroup.groupId)}>
                    Leave Group
                </Button>
            )
    }

    infoCardRendererButton(){
        if(this.isAdmin())
            return(
            <Button
                variant="contained"
                onClick={()=>{this.props.editGroupInit(this.props.activeGroup)}}
            >
                Edit Group
            </Button>
            )
    }

    resourceCardRenderer() {
        return (
            <Card className="group-home-container">
                <CardContent className="group-home-content-header">
                    <h1>Resources</h1>
                </CardContent>
                <Divider />
                <CardContent className="group-home-content">
                    <h1>  </h1>
                </CardContent>
            </Card>
        )
    }

    memberCardRenderer() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const members = this.props.activeGroup.groupMembers;
        const memberList = members.map((user) =>
            <ListItem key={user.userId} style={{padding:"0", margin:"0", borderBottom:"1px solid #E0E0E0"}}>
                <GroupMemberListItem groupMember={user} isAdmin={this.isAdmin()} removeUser={this.removeUserFromGroupWrapper}/>
            </ListItem>
        )

        const users = this.props.activeGroup.users;
        const usersFiltered = users.filter(function(element){
            for(let i=0; i<members.length; i++){
                if(element.userId === members[i].userId)
                    return false
            }
            return true;
        })
        const userList = usersFiltered.map((user) =>
            <ListItem key={user.userId} style={{padding:"0", margin:"0", borderBottom:"1px solid #E0E0E0"}}>
                <UserListItem user={user} addUser={this.addUserToGroupWrapper}/>
            </ListItem>
        )
        return (
            <Card className="group-home-container" >
                <CardContent className="group-home-content-header-members">
                    <div/>
                    <div><h1>Members</h1></div>
                    <div style={{height:"fit-content", maxHeight:"50vh", overflow:"auto"}}>
                        <Button
                            aria-owns={open ? 'simple-popper' : undefined}
                            aria-haspopup="true"
                            variant="contained"
                            onClick={(evt)=> {this.handleClick(evt); this.props.getAllUsers();}}
                        >
                            Add User
                        </Button>
                        <Popover
                            id="simple-popper"
                            open={open}
                            anchorEl={anchorEl}
                            onClose={this.handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            >
                            <div className="group-home-content-popover">
                                <h2 style={{textAlign:"center"}}>Add Users</h2>
                                <hr/>
                                <div className="group-home-content-popover-list">
                                    <List>
                                        {userList}
                                    </List>
                                </div>
                            </div>
                        </Popover>
                    </div>
                </CardContent>
                <Divider />
                <CardContent className="group-home-content-list" style={{maxHeight:"inherit", minHeight:"fit-content"}}>
                    <List style={{maxHeight:"inherit", height:"inherit", overflow:"auto", padding:"0"}}>
                        {memberList}
                    </List>
                </CardContent>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeGroup: state.activeGroup,
        user: state.user,
        editGroup: state.editGroup,

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getGroup:getGroup,
        getGroupMembers: getGroupMembers,
        getAllUsers: getAllUsers,
        addUserToGroup: addUserToGroup,
        leaveGroup: leaveGroup,
        removeUserFromGroup: removeUserFromGroup,
        deleteGroup: deleteGroup,
        editGroupInit: editGroupInit,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupHome);