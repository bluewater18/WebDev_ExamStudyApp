import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import MyGroupHelper from '../containers/MyGroupHelper';
import {IMAGE_PATH} from '../constants';
import { bindActionCreators } from 'redux';
import { getUserGroups, getAllGroups } from '../actions/action-get-group';
import { connect } from 'react-redux';

class MyGroups extends React.Component {
    componentDidMount() {
        this.props.getAllGroups()
    }
    
    render() {
        const groups = this.props.userGroups.groups;
        const elements = groups.map((group) => 
            <li key={group.groupId}>{group.groupName}</li>
        )
        return (
            <div className="my-groups">
                <Background/>
                <div className="my-groups-header">
                    <img src={IMAGE_PATH+this.props.user.imagePath} alt="user profile" width="150" height="150" />
                    <h1 style={{fontSize:"xx-large"}}>My Groups</h1>
                </div>
                <div className="my-groups-content">
                    <MyGroupHelper/>
                    <MyGroupHelper/>
                    <MyGroupHelper/>
                    <MyGroupHelper/>
                    <MyGroupHelper/>
                    <MyGroupHelper/>
                    <ul>
                        {elements}
                    </ul>
                    
                </div>
                
                
            </div>
            )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        userGroups: state.userGroups
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserGroups: getUserGroups,
        getAllGroups: getAllGroups,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGroups);