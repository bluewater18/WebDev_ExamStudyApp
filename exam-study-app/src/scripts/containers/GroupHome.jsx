import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import {getGroup, getGroupMembers} from '../actions/action-get-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IMAGE_PATH } from '../constants/index';
import {Card, CardContent, Divider, ListItem, List} from '@material-ui/core';
import GroupMemberListItem from './GroupMemberListItem';

class GroupHome extends React.Component {
    componentDidMount() {
        const { groupId } = this.props.match.params;
        this.props.getGroup(groupId);
        this.props.getGroupMembers(groupId);
    }
    render() {
        const members = this.props.activeGroup.groupMembers;
        const memberList = members.map((user) =>
            <ListItem key={user.userId} style={{padding:"0", margin:"0", borderBottom:"1px solid #E0E0E0"}}>
                <GroupMemberListItem groupMember={user}/>
            </ListItem>
        )
        
        return (
            
            <div className="group-home">
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
                        {this.memberCardRenderer(memberList)}
                    </div>
                </div>

            </div>
            )
    }

    infoCardRenderer() {
        return(
            <Card className="group-home-container">
                    <CardContent className="group-home-content-header">
                    <h1>{this.props.activeGroup.groupName}</h1>
                    </CardContent>
                    <Divider />
                    <CardContent className="group-home-content" style={{textAlign:"left"}}>
                    <h3> Description: {this.props.activeGroup.groupDescription}</h3>
                    <h3> Created By: {this.props.activeGroup.groupOwnerId}</h3>
                    <h3> Group Type: {this.props.activeGroup.groupType}</h3>
                    <h3> Member Count: Not Implemented</h3>
                    <hr/>
                    <h3> Group Code: {this.props.activeGroup.groupCode}</h3>
                </CardContent>
            </Card>
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

    memberCardRenderer(memberList) {
        return (
            <Card className="group-home-container" style={{height:"400px"}}>
                <CardContent className="group-home-content-header">
                    <h1>Members</h1>
                </CardContent>
                <Divider />
                <CardContent className="group-home-content-list" style={{maxHeight:"inherit", minHeight:"fit-content"}}>

                    <List style={{maxHeight:"400px", overflow:"auto", padding:"0"}}>
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

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getGroup:getGroup,
        getGroupMembers: getGroupMembers,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupHome);