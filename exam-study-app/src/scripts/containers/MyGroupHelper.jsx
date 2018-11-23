import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';

class MyGroups extends React.Component {
    render() {
        return (
            <div className="my-groups">
                <Background/>
                <div className="my-groups-header">
                    <img></img>
                    <h1>My Groups</h1>
                </div>
                <div className="my-groups-display">
                
                    {/*For X in users groups display MyGroupHelper container */}
                </div>
                
                
            </div>
            )
    }
}

export default MyGroups;