import { IconButton, Typography, Toolbar, AppBar, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import React from 'react';
import PropTypes from 'prop-types';
import toggleLeftDrawer from '../actions/action-toggle-left-drawer';
import NavDrawer from './NavDrawer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    rightButton: {
        marginRight: 20,
    },
};

class NavAppBar extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div >
                <AppBar style={{ position: "fixed !important", boxShadow: "none", backgroundColor: "transparent", display:"inline" }} color="primary">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                            onClick={() => { this.props.toggleLeftDrawer(true) }}>
                            <MenuIcon color="secondary" />
                        </IconButton>
                        <div className="nav-app-bar-title-spacer" style={{ flex: "1" }}/>
                        {this.linkHelpRender()}
                        
                        <Link to="/help">
                            <IconButton className={classes.helpButton} color="inherit" aria-label="Help" >
                                <HelpIcon color="secondary" />
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
                <div className="appbar-padding" color="secondary" style={{ height: "60px" }}/> 
                <NavDrawer/>
            </div>
        );
    };

    linkHelpRender() {
        if (this.props.user.isAuthenticated === false) {
            return (
                <div className="title-links" style={{ display: "inherit" }}>
                    <Link to="/login">
                        <Typography variant="title" color="inherit" className="nav-app-bar-title-link" >
                            Log In
                        </Typography>
                    </Link>
                    <Link to="/register">
                        <Typography variant="title" color="inherit" className="nav-app-bar-title-link" >
                            Register
                        </Typography>
                    </Link>
                </div>
            );
        };
    }
}


NavAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        ui: state.ui,
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleLeftDrawer: toggleLeftDrawer }, dispatch);
}

const styled = withStyles(styles)(NavAppBar);
export default connect(mapStateToProps, mapDispatchToProps)(styled)

