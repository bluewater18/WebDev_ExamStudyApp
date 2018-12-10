import React from 'react';
import '../../styles/main.scss';
import PropTypes from 'prop-types';
import { Card, CardMedia } from '@material-ui/core';
import { IMAGE_PATH } from '../constants';

class AnswerItem extends React.Component {
    render() {
        return (
            <Card className="answer-item" >
                <div className="answer-user">
                    <CardMedia className="answer-user-img">
                    <img className="answer-user-img" src={IMAGE_PATH+'default_user.png'} alt="user profile"/>
                    </CardMedia>
                    <h3 className="answer-user-img-name">A Generic Man</h3>
                </div>
                <div className="answer-answer">
                    <div className="answer-answer-text">
                        <h2>{this.props.answer.answerTitle}</h2>
                        <h3>{this.props.answer.answerText}</h3>
                    </div>
                    <div className="answer-answer-footer">
                        rating: 10
                    </div>
                </div>
            </Card>
            
        )
    }
}

AnswerItem.propTypes = {
    answer: PropTypes.object.isRequired,
}

export default AnswerItem;