import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';

class MyCalendar extends React.Component {
    render() {
        return (
            <div className="my-calendar">
                <Background/>

                <div className="my-calendar-title">
                    <h1>My Calendar [WIP]</h1>
                </div>
            </div>
        )
    }
}

export default MyCalendar;