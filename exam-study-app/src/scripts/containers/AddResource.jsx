import React from 'react';
import '../../styles/main.scss';
import { Card, Button, TextField, IconButton, Popover  } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addResource } from '../actions/action-resources';
import PropTypes from 'prop-types';

class AddAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addAnchor:null,
            name:"",
        }
    }

    addResourceName(newTitle){
        this.setState({
            name: newTitle
        })
    }

    openAddPopper = event => {
        this.setState({
            addAnchor: event.currentTarget,
        })
    }

    closeAddPopper = () => {
        this.setState({
            addAnchor:null,
        })
    }



    handleAddResource(){
        this.setState({
            addAnchor:null,
            name:"",

        })
        this.props.addResource(
            {
                groupId: this.props.groupId,
                resourceName: this.state.name,
                userId: this.props.user.id,
            }
        );
    }
    

    render() {
        const { addAnchor } = this.state;
        const open = Boolean(addAnchor);
        return(
            
            <Card className="resource-list-item" style={{margin:"auto", padding:"4px 4px 4px 4px",  width:"90%"}}>
                <IconButton 
                    aria-owns={open ? 'add-resource-popper' : undefined}
                    onClick={(evt) => this.openAddPopper(evt)}
                    style={{margin:"auto"}}
                >
                    <AddIcon fontSize="small"/>
                </IconButton>
                <Popover
                    id="add-resource-popper"
                    open={open}
                    anchorEl={addAnchor}
                    onClose={this.closeAddPopper}
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
                        <h2 style={{textAlign:"center"}}>Edit Resource</h2>
                    
                        <TextField
                            required
                            value={this.state.name}
                            onChange={evt => this.addResourceName(evt.target.value)}
                            id="edit-resource-name"
                            label="Resource Name"
                            className="register-textfield"
                            margin="normal"
                        />
                        <Button onClick={() => {this.handleAddResource()}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%" }}>
                            Sumbit
                        </Button>
                    </div>
                </Popover>
            </Card>
        )
    }
}

AddAnswer.propTypes = {
    groupId: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addResource: addResource,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAnswer);