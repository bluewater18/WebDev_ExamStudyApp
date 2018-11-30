import React from 'react';
import '../../styles/main.scss';

import PropTypes from 'prop-types';
import {IMAGE_PATH} from '../constants/index';
import {Divider} from '@material-ui/core';

class GroupMemberListItem extends React.Component {
    render() {
        return (
            <div className="group-member-list-item">
                <div className="group-member-list-item-div-img">
                    <img src={IMAGE_PATH+this.props.groupMember.userImageName}/>
                </div>
                <div className="group-member-list-item-div-name">
                    {this.props.groupMember.userName}
                </div >
                <div className="group-member-list-item-div-role">
                    {this.props.groupMember.memberType}
                </div>
            </div>
        )
    }
}

GroupMemberListItem.proptypes = {
    groupMember: PropTypes.object.isRequired,
}

export default GroupMemberListItem;