import React from 'react';
import '../../styles/main.scss';
import { toggleResourceDrawer } from '../actions/action-ui';
import { Drawer, List, ListItem, Paper, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ResourceListItem from './ResourceListItem';

class ResourceNavDrawer extends React.Component {
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
                    <h1>Resources:</h1>
                    <Divider/>
                        {this.resourceList()}
                </Paper>

            </div>
        )
        return(null)
    }

    resourceList() {
        return(
            <List>
                {/*amp resource to resourceListItems*/}
                <ResourceListItem resource={{resourceName:"test name", resourceTpe: "Q&A"}}/>
            </List>
        )
    }
}

function mapStateToProps(state) {
    return {
        ui: state.ui,
        resourceList: state.resouceList,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        toggleResourceDrawer: toggleResourceDrawer,
      }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ResourceNavDrawer);