import React from 'react';
import '../../styles/main.scss';
import { Card, CardContent, Button, TextField, InputLabel, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAnswer } from '../actions/action-resources';
import PropTypes from 'prop-types';

class AddAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adding:false,
            title:"",
            text:"",
            image:null,
        }
    }

    handleAdd(newState){
        this.setState({
            adding: newState,
        })
    }

    handleAnswerTitle(newTitle){
        this.setState({
            title: newTitle
        })
    }

    handleAnswerText(newText){
        this.setState({
            text: newText
        })
    }

    handleAnswerImage(newImage){
        this.setState({
            image: newImage
        })
    }

    handleAddAnswer(){
        this.setState({
            adding:false,
            title:"",
            text:"",
            image:null,
        })
        this.props.addAnswer(
            {
                questionId: this.props.questionId,
                answerTitle: this.state.title,
                answerText: this.state.text,
                userId: this.props.user.id,
                image: this.state.image,
            }
        );
    }

    render() {
        return(
            <Card>
                {this.renderHelper()}
            </Card>
        )
    }

    renderHelper(){
        if(!this.state.adding)
            return this.renderBasic()
        return this.renderAdding()
    }

    renderBasic(){
        return(
            <div onClick={()=>this.handleAdd(true)}>
                <AddIcon/>
                <h2 >Add an answer</h2>
            </div>
        )
        
    }

    renderAdding(){
        return(
            <div>
                <CardContent className={"login-card-content"} style={{paddingBottom: "0", paddingTop: "5px" }}>
                    <TextField
                        required
                        value={this.state.title}
                        onChange={evt => this.handleAnswerTitle(evt.target.value)}
                        id="add-answer-title"
                        label="Answer Title"
                        className="register-textfield"
                        margin="normal"
                    />

                    <TextField
                        required
                        value={this.state.text}
                        onChange={evt => this.handleAnswerText(evt.target.value)}
                        id="add-answer-text"
                        label="Answer Text"
                        className="register-textfield"
                        margin="normal"
                        multiline={true}
                    />

                    <InputLabel htmlFor="add-answer-photo-file" style={{textAlign:"left", fontSize:"1.3rem", padding:"15px 0 5px 0"}}>
                            Answer Image:
                    </InputLabel>
                    <input
                        accept="image/*"
                        style={{display:"none"}}
                        id="add-answer-photo-file"
                        type="file"
                        onChange={evt => this.handleAnswerImage(evt.target.files[0])}
                    />
                    <label htmlFor="add-answer-photo-file">
                        <Button variant="contained" component="span" style={{margin:"theme.spacing.unit"}}>
                            {(this.state.image === null?"Upload A File":"Upload A Different File")}
                        </Button>
                    </label>

                    <Button onClick={() => {this.handleAddAnswer()}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%" }}>
                        Add
                    </Button>
                </CardContent>

                <h2 onClick={()=>this.handleAdd(false)}>cancel</h2>
            </div>
        )
    }
}

AddAnswer.propTypes = {
    questionId: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addAnswer: addAnswer,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAnswer);