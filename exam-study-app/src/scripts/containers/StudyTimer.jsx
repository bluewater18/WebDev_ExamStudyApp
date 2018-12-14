import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';

class StudyTimer extends React.Component {
    render() {
        return (
            <div className="study-timer">
                <Background/>

                <div className="study-timer-title">
                    <h1>Study Timer [WIP]</h1>
                </div>
            </div>
        )
    }
}

export default StudyTimer;