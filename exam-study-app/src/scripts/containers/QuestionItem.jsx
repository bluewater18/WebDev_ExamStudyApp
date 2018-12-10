import React from 'react';
import '../../styles/main.scss';
import PropTypes from 'prop-types';
import { Card, CardMedia } from '@material-ui/core';
import AnswerItem from './AnswerItem';
import { IMAGE_PATH } from '../constants';


class QuestionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnswer: false,
            showAnswers: false,
        }
    }

    handleShowAnswer(show){
        this.setState({
            showAnswer: show
        })
    }

    handleShowAnswers(show){
        this.setState({
            showAnswers: show
        })
    }

    handleHideAnswers(show){
        this.setState({
            showAnswer: show,
            showAnswers: show
        })
    }

    render() {
        return (
            <Card className="question-item" >
                <div className="question-question">
                    <CardMedia className="question-question-img">
                        <img  alt="question" src={IMAGE_PATH+this.props.question.questionImageName}/>
                    </CardMedia>
                    
                    <div className="question-question-text">
                        <h2>{this.props.question.questionTitle}</h2>
                        <h4>{this.props.question.questionText}</h4>
                    </div>

                </div>
                {this.renderAnswers()}
                {this.renderQuestionFooter()}
            </Card>
            
        )
    }

    renderAnswers(){
        const answers = this.props.question.questionAnswers;
        if(answers !== null){
            const answerElements = answers.map((answer) =>
                <AnswerItem key={answer.answerId} answer={answer} />
            )
        if(this.state.showAnswer && !this.state.showAnswers)
            return(
                <div className="question-answers">
                    {answerElements[0]}
                </div>
            )
        if(this.state.showAnswers)
            return(
                <div className="question-answers">
                    {answerElements}
                </div>
            )
        }
        return(null);
    }

    renderQuestionFooter(){
        let showAnswer = null;
        let showAnswers = null;
        let hideAnswers = null;
        let addAnAnswer = <h3 onClick={() => this.handleAddAnswer()}>Add An Answer</h3>;
        if(!this.state.showAnswer && !this.state.showAnswers)
            showAnswer = <h3 onClick={() => this.handleShowAnswer(true)}>show top answer</h3>
        if(this.state.showAnswer && !this.state.showAnswers)
            showAnswers = <h3 onClick={() => this.handleShowAnswers(true)}>show all answers</h3>
        if(this.state.showAnswer && this.state.showAnswers)
            hideAnswers = <h3 onClick={() => this.handleHideAnswers(false)}>hide answers</h3>
        
        if(true)
        return(
            <div className="question-footer" >
                {showAnswer}
                {showAnswers}
                {hideAnswers}
                {addAnAnswer}
            </div>
        )
    }
}

QuestionItem.propTypes = {
    question: PropTypes.object.isRequired,
}

export default QuestionItem;