import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';

class DailyGoals extends React.Component {
    render() {
        return (
            <div className="daily-goals">
                <Background/>

                <div className="daily-goals-title">
                    <h1>Daily Goals [WIP]</h1>
                </div>
            </div>
        )
    }
}

export default DailyGoals;