import React from 'react';
import '../../styles/main.scss';
import { toggleResourceDrawer } from '../actions/action-ui';
import { Drawer, List, ListItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ResourceListItem from './ResourceListItem';

class ResourceNavDrawer extends React.Component {
    render() {
        return (
            <div>
                <Drawer 
                    style={{height:"80%"}} 
                    open={this.props.ui.resourceDrawerOpen} 
                    onClose={() => { this.props.toggleResourceDrawer(false) }}
                    variant={"persistent"}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => { this.props.toggleResourceDrawer(false) }}
                        onKeyDown={() => { this.props.toggleResourceDrawer(false) }}
                    >   

                        {this.resourceList()}
                        
                    </div>
                </Drawer>

            </div>
        )
    }

    resourceList() {
        return(
            <List>
                {/*amp resource to resourceListItems*/}
                <ListItem>
                    <ResourceListItem/>
                </ListItem>
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