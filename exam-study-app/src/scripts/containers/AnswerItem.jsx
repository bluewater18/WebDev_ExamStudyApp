import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../styles/main.scss';
import PropTypes from 'prop-types';
import { Card, CardMedia, IconButton, Popover, TextField, Button, InputLabel, Modal, } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { IMAGE_PATH } from '../constants';
import { editAnswer, deleteAnswer, upvoteAnswer, downvoteAnswer } from '../actions/action-resources';


class AnswerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editAnswerAnchor: null,
            deleteAnswerModal: false,
            title: "",
            text: "",
            image: null,

        }
    }

    editAnswerOpen = event => {
        this.setState({
            editAnswerAnchor: event.currentTarget,
        });
    }

    editAnswerClose = () => {
        this.setState({
            editAnswerAnchor: null,
        })
    }

    setDeleteAnswerModal = (val) => {
        this.setState({
            deleteAnswerModal: val
        })
    }

    handleDeleteAnswer = () => {
        this.setState({
            deleteAnswerModal: false,
        });
        this.props.deleteAnswer(this.props.answer.answerId, this.props.answer.questionId)
    }

    handleEditAnswerSubmit = () => {
        this.setState({
            title: "",
            text: "",
            image: null,
            editAnswerAnchor: null,
        })
        this.props.editAnswer({answerId: this.props.answer.answerId, answerTitle: this.state.title, answerText: this.state.text, image: this.state.image})
    }

    handleEditAnswerTitle = (newTitle) => {
        this.setState({
            title: newTitle,
        })
    }

    handleEditAnswerText = (newText) => {
        this.setState({
            text: newText
        })
    }

    handleEditAnswerImage = (newImage) => {
        this.setState({
            image: newImage
        })
    }

    handleUpvote = () => {
        this.props.upvoteAnswer(this.props.answer.answerId, this.props.user.id)
    }

    handleDownvote = () => {
        this.props.downvoteAnswer(this.props.answer.answerId, this.props.user.id)
    }

    render() {
        return (
            <Card className="answer-item" >
                {this.deleteConfirm()}
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
                    {this.renderActions()}
                    <IconButton style={{padding:"4px"}} onClick={()=> this.handleUpvote()}>
                        <ThumbUpIcon style={{fontSize:"16px"}}/>
                    </IconButton>
                    <IconButton style={{padding:"4px"}} onClick={()=> this.handleDownvote()}>
                        <ThumbDownIcon style={{fontSize:"16px"}}/>
                    </IconButton>
                        <h3>rating: {0 + this.props.answer.answerUpvotes - this.props.answer.answerDownvotes}</h3>
                    </div>
                </div>
            </Card>
            
        )
    }

    renderActions(){
        const { editAnswerAnchor } = this.state;
        const open = Boolean(editAnswerAnchor);

        if(this.props.user.id === this.props.answer.userId)
        return(
            <div className="answer-answer-footer-owner-actions">
                <IconButton
                    aria-owns={open ? 'add-resource-popper' : undefined}
                    aria-haspopup="true"
                    onClick={(evt) => {this.editAnswerOpen(evt)}}
                    style={{padding:"4px"}}
                    >
                    <EditIcon style={{fontSize:"16px"}}/>
                </IconButton>
                <Popover
                    id="add-resource-popper"
                    open={open}
                    anchorEl={editAnswerAnchor}
                    onClose={this.editAnswerClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    >
                    <div className="resource-popover">
                        <h2 style={{textAlign:"center"}}>Edit Question</h2>
                        <TextField
                            required
                            value={this.state.title}
                            onChange={evt => this.handleEditAnswerTitle(evt.target.value)}
                            id="edit-answer-title"
                            label="Answer Title"
                            className="register-textfield"
                            margin="normal"
                        />
                        <TextField
                            required
                            value={this.state.text}
                            onChange={evt => this.handleEditAnswerText(evt.target.value)}
                            id="edit-answer-text"
                            label="answer-text"
                            className="register-textfield"
                            margin="normal"
                            multiline
                        />
                        <InputLabel htmlFor="edit-answer-photo-file" style={{textAlign:"left", fontSize:"1.3rem", padding:"15px 0 5px 0"}}>
                                Answer Image:
                        </InputLabel>
                        <input
                            accept="image/*"
                            style={{display:"none"}}
                            id="edit-answer-photo-file"
                            type="file"
                            onChange={evt => this.handleEditAnswerImage(evt.target.files[0])}
                        />
                        <label htmlFor="edit-answer-photo-file">
                            <Button variant="contained" component="span" style={{margin:"theme.spacing.unit"}}>
                                {(this.state.image === null?"Upload A File":"Upload A Different File")}
                            </Button>
                        </label>
                        <Button onClick={() => {this.handleEditAnswerSubmit()}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%" }}>
                            Submit
                        </Button>
                       
                    </div>
                </Popover>
                <IconButton
                    style={{padding:"4px"}}
                    onClick={() => this.setDeleteAnswerModal(true)}
                >
                    <DeleteIcon style={{fontSize:"16px"}}/>
                </IconButton>
            </div>
        )
    }

    deleteConfirm() {
        return(
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.deleteAnswerModal}
            onClose={() => this.setDeleteAnswerModal(false)}
            >
                <div style={{top:"50%", left:"50%", transform:"translate(-50%, -50%)", position:"absolute", textAlign:"center", background:"white", padding:"1rem"}} className="group-home-delete-modal">
                    <h1 style={{color:"black"}}>
                        Are you sure you want to delete this Answer
                        <br/>
                        This action cannot be undone
                    </h1>
                    <Button variant="contained"  style={{margin:"5px", fontSize:"1.2rem", color:"red"}} onClick={()=> this.handleDeleteAnswer()}>
                            I'm Sure
                    </Button>
                    <Button style={{margin:"5px", fontSize:"1.2rem", color:"primary"}} onClick={()=> this.setDeleteAnswerModal(false)}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        )
    }
}

AnswerItem.propTypes = {
    answer: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        editAnswer: editAnswer,
        deleteAnswer: deleteAnswer,
        upvoteAnswer: upvoteAnswer,
        downvoteAnswer: downvoteAnswer,

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerItem);