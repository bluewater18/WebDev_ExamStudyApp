import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <Background/>

                <div className="home-title">
                    <h1>Exam Study</h1>
                </div>
            </div>
        )
    }
}

export default Home;