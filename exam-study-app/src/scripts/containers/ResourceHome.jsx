import React from 'react';
import '../../styles/main.scss';
import ResourceNavBar from './ResourceNavDrawer';
import Resource from './Resource';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleResourceDrawer } from '../actions/action-ui';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const drawerWidth = 240;


const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: 0,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: "5px 24px 0px 24px",
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
  });

class ResourceHome extends React.Component {
    render() {
        const { groupId, resourceId } = this.props.match.params;
        const{classes } = this.props;
        return (
            <div className="resource-home">
                <ResourceNavBar groupId={groupId}/>
                <main className={classNames(classes.content, {
                    [classes.contentShift]: this.props.ui.resourceDrawerOpen,
                })}>
                    <h1 onClick={() => {this.props.toggleResourceDrawer(true)}}>Open Resource List (temporary)</h1>
                    <Resource resourceId={resourceId}/>  
                </main>
            </div>
        )
    }
}

ResourceHome.propTypes = {
    classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        ui: state.ui
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        toggleResourceDrawer: toggleResourceDrawer,
        }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResourceHome));