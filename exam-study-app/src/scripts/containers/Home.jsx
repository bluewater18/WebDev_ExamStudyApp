import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';

class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <Background/>
                <h1>Exam Study</h1>
                
            </div>
            )
    }
}

export default Home;