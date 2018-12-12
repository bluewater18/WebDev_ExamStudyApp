import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../styles/main.scss';
import PropTypes from 'prop-types';
import { Card, CardMedia, IconButton, Modal, Button, Popover, TextField, InputLabel } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AnswerItem from './AnswerItem';
import { IMAGE_PATH } from '../constants';
import AddAnswer from './AddAnswer';
import { editQuestion, deleteQuestion } from '../actions/action-resources';


class QuestionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnswer: false,
            showAnswers: false,

            editQuestionAnchor: null,
            deleteQuestionModal: false,
            title: "",
            text: "",
            image: null,

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

    editQuestionOpen = event => {
        this.setState({
            editQuestionAnchor: event.currentTarget,
        });
    }

    editQuestionClose = () => {
        this.setState({
            editQuestionAnchor: null,
        })
    }

    setDeleteQuestionModal = (val) => {
        this.setState({
            deleteQuestionModal: val
        })
    }

    handleDeleteQuestion = () => {
        this.setState({
            deleteQuestionModal: false,
        });
        this.props.deleteQuestion(this.props.question.questionId)
    }

    handleEditQuestionSubmit = () => {
        this.setState({
            title: "",
            text: "",
            image: "",
            editQuestionAnchor: null,
        })
        this.props.editQuestion({questionId: this.props.question.questionId, questionTitle: this.state.title, questionText: this.state.text, image: this.state.image})
    }

    handleEditQuestionTitle = (newTitle) => {
        this.setState({
            title: newTitle,
        })
    }

    handleEditQuestionText = (newText) => {
        this.setState({
            text: newText
        })
    }

    handleEditQuestionImage = (newImage) => {
        this.setState({
            image: newImage
        })
    }



    render() {
        return (
            <Card className="question-item" >
                {this.deleteConfirm()}
                <div className="question-question">
                    <CardMedia className="question-question-img">
                        <img  alt="question" src={IMAGE_PATH+this.props.question.questionImageName}/>
                    </CardMedia>
                    
                    <div className="question-question-text">
                        <h2>{this.props.question.questionTitle}</h2>
                        <h4>{this.props.question.questionText}</h4>
                    </div>
                    {this.renderActions()}

                </div>
                <div className="question-answers">
                    {this.renderAnswers()}
                    {this.renderAddAnser()}
                </div>
                {this.renderQuestionFooter()}
            </Card>
            
        )
    }

    renderActions() {
        const { editQuestionAnchor } = this.state;
        const open = Boolean(editQuestionAnchor);

        if(this.props.user.id === this.props.question.userId )
        return(
            <div className="question-question-actions">
            <IconButton
                aria-owns={open ? 'add-resource-popper' : undefined}
                aria-haspopup="true"
                onClick={(evt) => {this.editQuestionOpen(evt)}}
                >
                <EditIcon/>
            </IconButton>
            <Popover
                id="add-resource-popper"
                open={open}
                anchorEl={editQuestionAnchor}
                onClose={this.editQuestionClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                >
                <div className="group-home-content-popover">
                    <h2 style={{textAlign:"center"}}>Edit Question</h2>
                    <hr/>
                    <TextField
                        required
                        value={this.state.title}
                        onChange={evt => this.handleEditQuestionTitle(evt.target.value)}
                        id="edit-question-title"
                        label="Question Title"
                        className="register-textfield"
                        margin="normal"
                    />
                    <TextField
                        required
                        value={this.state.text}
                        onChange={evt => this.handleEditQuestionText(evt.target.value)}
                        id="edit-question-text"
                        label="question-text"
                        className="register-textfield"
                        margin="normal"
                        multiline
                    />
                    <InputLabel htmlFor="add-answer-photo-file" style={{textAlign:"left", fontSize:"1.3rem", padding:"15px 0 5px 0"}}>
                            Answer Image:
                    </InputLabel>
                    <input
                        accept="image/*"
                        style={{display:"none"}}
                        id="add-answer-photo-file"
                        type="file"
                        onChange={evt => this.handleEditQuestionImage(evt.target.files[0])}
                    />
                    <label htmlFor="add-answer-photo-file">
                        <Button variant="contained" component="span" style={{margin:"theme.spacing.unit"}}>
                            {(this.state.image === null?"Upload A File":"Upload A Different File")}
                        </Button>
                    </label>
                    <Button onClick={() => {this.handleEditQuestionSubmit()}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%" }}>
                        Submit
                    </Button>
                </div>
            </Popover>
            <IconButton
                onClick={() => this.setDeleteQuestionModal(true)}
            >
                <DeleteIcon/>
            </IconButton>
        </div>
        )
        return(null)
    }

    renderAnswers(){
        const answers = this.props.question.questionAnswers;
        if(answers !== null){
            const answerElements = answers.map((answer) =>
                <AnswerItem key={answer.answerId} answer={answer} />
            )
        if(this.state.showAnswer && !this.state.showAnswers)
            return(
                 <div> 
                    {answerElements[0]}
                 </div>
            )
        if(this.state.showAnswers)
            return(
                <div>
                    {answerElements}
                </div>
            )
        }
        return(null);
    }

    renderAddAnser(){
        if(this.state.showAnswer || this.state.showAnswers){
            return(
                <AddAnswer questionId={this.props.question.questionId}/>
            )
        }
    }

    renderQuestionFooter(){
        let showAnswer = null;
        let showAnswers = null;
        let hideAnswers = null;
        //let addAnAnswer = <h3 onClick={() => this.handleAddAnswer(true)}>Add An Answer</h3>;
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
            </div>
        )
    }

    deleteConfirm() {
        return(
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.deleteQuestionModal}
            onClose={() => this.setDeleteQuestionModal(false)}
            >
                <div style={{top:"50%", left:"50%", transform:"translate(-50%, -50%)", position:"absolute", textAlign:"center", background:"white", padding:"1rem"}} className="group-home-delete-modal">
                    <h1 style={{color:"black"}}>
                        Are you sure you want to delete this Question
                        <br/>
                        This action cannot be undone
                    </h1>
                    <Button variant="contained"  style={{margin:"5px", fontSize:"1.2rem", color:"red"}} onClick={()=> this.handleDeleteQuestion()}>
                            I'm Sure
                    </Button>
                    <Button style={{margin:"5px", fontSize:"1.2rem", color:"primary"}} onClick={()=> this.de()}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        )
    }
}

QuestionItem.propTypes = {
    question: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        user: state.user,

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        editQuestion: editQuestion,
        deleteQuestion: deleteQuestion
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionItem);
