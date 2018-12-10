import React from 'react';
import '../../styles/main.scss';
import { Card, CardContent, Button, TextField, InputLabel, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addQuestion } from '../actions/action-resources';

class AddQuestion extends React.Component {
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

    handleQuestionTitle(newTitle){
        this.setState({
            title: newTitle
        })
    }

    handleQuestionText(newText){
        this.setState({
            text: newText
        })
    }

    handleQuestionImage(newImage){
        this.setState({
            image: newImage
        })
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
                <h2 >Add a question</h2>
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
                        onChange={evt => this.handleQuestionTitle(evt.target.value)}
                        id="add-question-title"
                        label="Question Title"
                        className="register-textfield"
                        margin="normal"
                    />

                    <TextField
                        required
                        value={this.state.text}
                        onChange={evt => this.handleQuestionText(evt.target.value)}
                        id="add-question-text"
                        label="Question Text"
                        className="register-textfield"
                        margin="normal"
                        multiline={true}
                    />

                    <InputLabel htmlFor="create-group-photo-file" style={{textAlign:"left", fontSize:"1.3rem", padding:"15px 0 5px 0"}}>
                            Question Image:
                    </InputLabel>
                    <input
                        accept="image/*"
                        style={{display:"none"}}
                        id="add-question-photo-file"
                        type="file"
                        onChange={evt => this.handleQuestionImage(evt.target.files[0])}
                    />
                    <label htmlFor="add-question-photo-file">
                        <Button variant="contained" component="span" style={{margin:"theme.spacing.unit"}}>
                            {(this.state.image === null?"Upload A File":"Upload A Different File")}
                        </Button>
                    </label>

                    <Button onClick={() => {this.props.addQuestion({questionTitle:this.state.title, questionText:this.state.text, image:this.state.image, userId:this.props.user.id, resourceId: this.props.activeResource.resourceId})}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%" }}>
                        Add
                    </Button>
                </CardContent>

                <h2 onClick={()=>this.handleAdd(false)}>cancel</h2>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        activeResource: state.activeResource
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addQuestion: addQuestion
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);