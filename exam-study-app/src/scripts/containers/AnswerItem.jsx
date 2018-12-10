import React from 'react';
import '../../styles/main.scss';
import PropTypes from 'prop-types';
import { Card, CardMedia, IconButton } from '@material-ui/core';
import { IMAGE_PATH } from '../constants';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';


class AnswerItem extends React.Component {
    render() {
        return (
            <Card className="answer-item" >
                <div className="answer-user">
                    <CardMedia className="answer-user-img">
                    <img className="answer-user-img" src={IMAGE_PATH+this.props.answer.userImageName} alt="user profile"/>
                    </CardMedia>
                    <h3 className="answer-user-img-name">{this.props.answer.userName}</h3>
                </div>
                <div className="answer-answer">
                    <div className="answer-answer-text">
                        <h2>{this.props.answer.answerTitle}</h2>
                        <h3>{this.props.answer.answerText}</h3>
                    </div>
                    <div className="answer-answer-footer">
                    <IconButton style={{padding:"4px"}}>
                        <ThumbUpIcon style={{fontSize:"16px"}}/>
                    </IconButton>
                    <IconButton style={{padding:"4px"}}>
                        <ThumbDownIcon style={{fontSize:"16px"}}/>
                    </IconButton>
                        <h3>rating: {0 + this.props.answer.answerUpvotes - this.props.answer.answerDownvotes}</h3>
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