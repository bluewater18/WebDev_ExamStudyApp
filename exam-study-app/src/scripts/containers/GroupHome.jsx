import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import {getGroup} from '../actions/action-get-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IMAGE_PATH } from '../constants/index';

class GroupHome extends React.Component {
    componentDidMount() {
        const { groupId } = this.props.match.params;
        this.props.getGroup(groupId);
    }
    render() {
        
        return (
            
            <div className="my-groups">
                <Background/>
                <div className="my-groups-header" >
                    <img src={IMAGE_PATH + this.props.activeGroup.groupPhotoPath} alt="user profile" width="150" height="150" />
                    <h1 style={{fontSize:"xx-large"}}>{this.props.activeGroup.groupName}</h1>
                </div>
                <div className="my-groups-content">

                </div>

            </div>
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
        getGroup:getGroup
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupHome);