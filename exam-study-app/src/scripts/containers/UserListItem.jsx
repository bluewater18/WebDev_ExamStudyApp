import React from 'react';
import '../../styles/main.scss';

import PropTypes from 'prop-types';
import {IMAGE_PATH} from '../constants/index';
import {Button} from '@material-ui/core';


class UserListItem extends React.Component {
    render() {
        return (
            <div className="user-list-item">
                <div className="user-list-item-div-img">
                    <img alt="user profile" src={IMAGE_PATH+this.props.user.userImageName}/>
                </div>
                <div className="group-member-list-item-div-name">
                    {this.props.user.userName}
                </div >
                <div className="user-list-item-button">
                    <Button onClick={() => this.props.addUser(this.props.user)}>
                        Add
                    </Button>
                </div>
            </div>
        )
    }
}

UserListItem.proptypes = {
    user: PropTypes.object.isRequired,
    addUser: PropTypes.func.isRequired,
}

export default UserListItem;