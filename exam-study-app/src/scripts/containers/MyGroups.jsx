import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import MyGroupHelper from '../containers/MyGroupHelper';
import {IMAGE_PATH} from '../constants';
import { bindActionCreators } from 'redux';
import { getUserGroups } from '../actions/action-get-group';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
class MyGroups extends React.Component {
    componentDidMount() {
        this.props.getUserGroups(this.props.user.id)
    }

    
    render() {
        
        const groups = this.props.userGroups.groups;
        const elements = groups.map((group) =>
            <Link key={group.groupId} to={"/group/"+group.groupId} style={{all:"unset"}}>
                <MyGroupHelper group={group} />
            </Link>   
            )       

        return (
            <div className="my-groups">
                <Background/>
                <div className="my-groups-header">
                    <img src={IMAGE_PATH+this.props.user.imagePath} alt="user profile" width="150" height="150" />
                    <h1 style={{fontSize:"xx-large"}}>My Groups</h1>
                </div>
                <div className="my-groups-content">
                    {elements}
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
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGroups);