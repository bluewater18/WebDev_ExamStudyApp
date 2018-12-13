import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect } from 'react-redux';

import {goToResource, editResource, deleteResource} from '../actions/action-resources';

import '../../styles/main.scss';
import { Card, ListItem, IconButton, Popover, TextField, Button, Modal } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


class ResourceListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editResourceAnchor: null,
            deleteModalOpen: false,
            editResourceName: this.props.resource.resourceName,
          };
    }

    editResourceName = (newName) => {
        this.setState({
            editResourceName: newName
        })
    }
    editResourceSubmit = (resource) => {
        this.setState({
            editResourceAnchor: null,
        })
        
        this.props.editResource(resource);
    }
    openEditPopper = event => {
        this.setState({
            editResourceAnchor: event.currentTarget,
        });
    }
    closeEditPopper = () => {
        this.setState({
            editResourceAnchor: null,
          });
    }

    openDeleteModal = () => {
        this.setState({deleteModalOpen:true})
    }
    closeDeleteModal = () => {
        this.setState({deleteModalOpen:false})
    }

    handleDeleteResource = () => {
        this.props.deleteResource(this.props.resource.resourceId, this.props.activeResource.resourceId, this.props.resource.groupId)
    }

    render() {
        

        return (
            
            <ListItem style={{margin:"0 0 6px 0", padding:"0", height:"fit-content",}}>
                <Card className="resource-list-item" style={{margin:"auto", padding:"4px 4px 4px 4px",  width:"90%"}}>
                    {/* <CardContent style={{padding:"0", margin: "0"}}> */}
                        <Link className="resource-list-item-link" to={"/group/"+this.props.resource.groupId+"/resource/"+this.props.resource.resourceId} style={{all:"unset"}}>
                                <div >
                                <h2>{this.props.resource.resourceName}</h2>
                                <h3>{this.props.resource.resourceType}</h3>
                                </div>
                        </Link>
                        {this.resourceOwnerActions()}
                    {/* </CardContent> */}
                </Card>
            </ListItem>
            
        )
    }
    resourceOwnerActions() {
        const { editResourceAnchor } = this.state;
        const open = Boolean(editResourceAnchor);
        console.log("owner actions: " + this.props.user.id + " vs " + this.props.resource.userId)
        if(this.props.user.id === this.props.resource.userId)
        return(
            <div className="resource-list-item-actions">
                {this.deleteConfirm()}
                <IconButton 
                    aria-owns={open ? 'edit-resource-popper' : undefined}
                    onClick={(evt) => this.openEditPopper(evt)}
                >
                    <EditIcon fontSize="small"/>
                </IconButton>
                <Popover
                            id="edit-resource-popper"
                            open={open}
                            anchorEl={editResourceAnchor}
                            onClose={this.closeEditPopper}
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
                                    value={this.state.editResourceName}
                                    onChange={evt => this.editResourceName(evt.target.value)}
                                    id="edit-resource-name"
                                    label="Resource Name"
                                    className="register-textfield"
                                    margin="normal"
                                />
                                <Button onClick={() => {this.editResourceSubmit({resourceName:this.state.editResourceName, resourceId: this.props.resource.resourceId})}} style={{ paddingTop: "15px", paddingBottom: "15px", marginBottom:"5px", width: "80%" }}>
                                    Sumbit
                                </Button>
                            </div>
                        </Popover>
                <IconButton>
                    <DeleteIcon fontSize="small" onClick={() => this.openDeleteModal()}/>
                </IconButton>
            </div>
        )
    }

    deleteConfirm() {
        return(
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.deleteModalOpen}
            onClose={() => this.closeDeleteModal()}
            >
                <div style={{top:"50%", left:"50%", transform:"translate(-50%, -50%)", position:"absolute", textAlign:"center", background:"white", padding:"1rem"}} className="group-home-delete-modal">
                    <h1 style={{color:"black"}}>
                        Are you sure you want to delete this resource
                        <br/>
                        This action cannot be undone
                    </h1>
                    <Button variant="contained"  style={{margin:"5px", fontSize:"1.2rem", color:"red"}} onClick={()=> this.handleDeleteResource()}>
                            I'm Sure
                    </Button>
                    <Button style={{margin:"5px", fontSize:"1.2rem", color:"primary"}} onClick={()=> this.closeDeleteModal()}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        )
    }
}

ResourceListItem.propTypes = {
    resource: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        user:state.user,
        activeResource: state.activeResource,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goToResource: goToResource,
        editResource: editResource,
        deleteResource: deleteResource,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceListItem);