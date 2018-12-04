import React from 'react';
import '../../styles/main.scss';

import PropTypes from 'prop-types';
import {IMAGE_PATH} from '../constants/index';
import { IconButton } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

class GroupMemberListItem extends React.Component {
    render() {
        return (
            <div className="group-member-list-item">
                <div className="group-member-list-item-div-img">
                    <img alt="user profile" src={IMAGE_PATH+this.props.groupMember.userImageName}/>
                </div>
                <div className="group-member-list-item-div-name">
                    {this.props.groupMember.userName}
                </div >
                <div className="group-member-list-item-div-role">
                    {this.props.groupMember.memberType}
                </div>
                {this.renderButton()}

            </div>
        )
    }

    renderButton() {
        if(this.props.isAdmin && this.props.groupMember.memberType !== "OWNER"){
            return(
                <div className="group-member-list-item-div-button">
                    <IconButton onClick={() => this.props.removeUser(this.props.groupMember)}>
                        <RemoveCircleOutlineIcon/>
                    </IconButton>
                </div>
            )
        }
    }
}


GroupMemberListItem.proptypes = {
    groupMember: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    removeUser: PropTypes.func.isRequired,
}

export default GroupMemberListItem;