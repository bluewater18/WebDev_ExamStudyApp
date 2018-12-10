import React from 'react';
import '../../styles/main.scss';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import AnswerItem from './AnswerItem';
import { IMAGE_PATH } from '../constants';


class QuestionItem extends React.Component {
    render() {
        return (
            <Card className="question-item" >
                <div className="question-question">
                    <CardMedia className="question-question-img">
                        <img  alt="question" src={IMAGE_PATH+'default_group.png'}/>
                    </CardMedia>
                    
                    <div className="question-question-text">
                        <h2>{this.props.question.questionTitle}</h2>
                        <h4>{this.props.question.questionText}</h4>
                    </div>

                </div>
                {this.renderAnswers()}
            </Card>
            
        )
    }

    renderAnswers(){
        const answers = this.props.question.questionAnswers;
        if(answers !== null){
        const answerElements = answers.map((answer) =>
            <AnswerItem key={answer.answerId} answer={answer} />
        )
        return(
            <div className="question-answers">
                {answerElements}
            </div>
        )
        }
        return(null);
    }
}

QuestionItem.propTypes = {
    question: PropTypes.object.isRequired,
}

export default QuestionItem;