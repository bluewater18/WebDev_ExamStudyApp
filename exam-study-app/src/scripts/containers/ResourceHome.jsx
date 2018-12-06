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
      width: 200,
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
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  });

class ResourceHome extends React.Component {
    render() {
        const{classes, theme } = this.props;
        return (
            <div className="resource-home">
                <ResourceNavBar />
                <main className={classNames(classes.content, {
                    [classes.contentShift]: this.props.ui.resourceDrawerOpen,
                })}>
                    <Resource />
                        <h1 onClick={() => {this.props.toggleResourceDrawer(true)}}>Resource Home</h1>
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