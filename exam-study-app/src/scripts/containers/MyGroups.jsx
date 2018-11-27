import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import MyGroupHelper from '../containers/MyGroupHelper';

class MyGroups extends React.Component {
    render() {
        return (
            <div className="my-groups">
                <Background/>
                <div className="my-groups-header">
                    <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=350" alt="user profile" width="150" height="150" />
                    <h1 style={{fontSize:"xx-large"}}>My Groups</h1>
                </div>
                <div className="my-groups-content">
                    <MyGroupHelper/>
                    <MyGroupHelper/>
                    <MyGroupHelper/>
                    <MyGroupHelper/>
                    <MyGroupHelper/>
                    <MyGroupHelper/>
                </div>
                
                
            </div>
            )
    }
}

export default MyGroups;