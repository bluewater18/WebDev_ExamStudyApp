import React from 'react';
import '../../styles/main.scss';
import { toggleResourceDrawer } from '../actions/action-ui';
import { Drawer, List, ListItem, Paper, Divider, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ResourceListItem from './ResourceListItem';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { fetchResourceList } from '../actions/action-resources';
import PropTypes from 'prop-types';

class ResourceNavDrawer extends React.Component {

    componentDidMount(){
        this.props.fetchResourceList(this.props.groupId);
    }

    render() {

        if(this.props.ui.resourceDrawerOpen)
        return (
            <div>
                
                <Paper
                    style={{height:"100%", position:"absolute", left:"0", width:"240px"}} 
                    open={this.props.ui.resourceDrawerOpen} 
                    onClose={() => { this.props.toggleResourceDrawer(false) }}
                    variant={"persistent"}
                >
                <div style={{display:"flex"}}>
                    <h1 style={{flex:"3"}}>Resources:</h1>
                    <div style={{flex:"1"}}>
                    <IconButton
                        onClick={()=> this.props.toggleResourceDrawer(false)}>
                        
                        <ArrowBackIosIcon/>
                    </IconButton>
                    </div>
                </div>
                    <Divider/>
                        {this.resourceList()}
                </Paper>

            </div>
        )
        return(null)
    }

    resourceList() {
        const resources = this.props.resourceList.resources;
        const resourceList = resources.map((resource) =>
            // <ListItem key={resource.resourceId} style={{padding:"0", margin:"0", borderBottom:"1px solid #E0E0E0"}}>
                <ResourceListItem key={resource.resourceId} resource={resource} />
            // </ListItem>
        )
        return(
            <List>
                {/*amp resource to resourceListItems*/}
                {resourceList}
            </List>
        )
    }
}

ResourceNavDrawer.propTypes = {
    groupId: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
    return {
        ui: state.ui,
        resourceList: state.resourceList,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        toggleResourceDrawer: toggleResourceDrawer,
        fetchResourceList: fetchResourceList,

      }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ResourceNavDrawer);