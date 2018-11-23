import { IconButton, Typography, Toolbar, AppBar, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import React from 'react';
import PropTypes from 'prop-types';
import toggleLeftDrawer from '../actions/action-toggle-left-drawer';
import logout from '../actions/action-logout';
import NavDrawer from './NavDrawer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
                            <MenuIcon color="secondary" fontSize="large" />
                        </IconButton>
                        <div className="nav-app-bar-title-spacer" style={{ flex: "1" }}/>
                        {this.linkHelpRender()}
                        
                        <Link to="/help">
                            <IconButton className={classes.helpButton} color="inherit" aria-label="Help" >
                                <HelpIcon color="secondary" fontSize="large" />
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
        if (!this.props.user.isAuthenticated) {
            return (
                <div className="title-links" style={{ display: "inherit" }}>
                    <Link to="/login">
                        <Button className="nav-app-bar-title-button">
                            <Typography variant="title" className="nav-app-bar-title-link" >
                                Log In
                            </Typography>
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button className="nav-app-bar-title-button">
                            <Typography variant="title" className="nav-app-bar-title-link" >
                                Register
                            </Typography>
                        </Button>
                    </Link>
                </div>
            );
        } else {
            return(
                <div className="title-links" style={{ display: "inherit" }}>
                    <Button onClick={()=>{this.props.logout()}} className="nav-app-bar-title-button">
                        <Typography variant="title" className="nav-app-bar-title-link" >
                            Log Out
                        </Typography>
                    </Button>           
                </div>
            )

        }
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
    return bindActionCreators({ 
        toggleLeftDrawer: toggleLeftDrawer,
        logout:logout
        }, dispatch);
}

const styled = withStyles(styles)(NavAppBar);
export default connect(mapStateToProps, mapDispatchToProps)(styled)

