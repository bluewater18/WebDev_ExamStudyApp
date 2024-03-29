﻿import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import toggleLeftDrawer from '../actions/action-toggle-left-drawer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {IMAGE_PATH} from '../constants';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AdjustIcon from '@material-ui/icons/Adjust';
import GroupIcon from '@material-ui/icons/Group';

import { Link } from 'react-router-dom'
const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    listItemText:{
        fontSize: 'medium',
    }
};

class NavDrawer extends React.Component {

    render() {
        const { classes } = this.props;
        const sideList = (
            <div className={classes.list}>
                <List>
                    <Link key="menu-daily-goals" to="/daily-goals">
                        <ListItem style={{fontSize:"medium !important"}} button key={"daily-goals-btn"}>
                            <ListItemIcon><AdjustIcon /></ListItemIcon>
                            <ListItemText primary={<span className="menu-list-item-text">Daily Goals</span>} />
                        </ListItem>
                    </Link>
                    <Link key="menu-my-calendar" to="/my-calendar">
                        <ListItem button key={"my-calendar-button"}>
                            <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                            <ListItemText primary={<span className="menu-list-item-text">My Calendar</span>} />
                        </ListItem>
                    </Link>
                    <Link key="menu-study-timer" to="/study-timer">
                        <ListItem button key={"study-timer-button"}>
                            <ListItemIcon><HourglassEmptyIcon /></ListItemIcon>
                            <ListItemText primary={<span className="menu-list-item-text">Study Timer</span>} />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link key="My Groups" to="/my-groups">
                        <ListItem button key={"my-groups-btn"}>
                            <ListItemIcon><GroupIcon /></ListItemIcon>
                            <ListItemText primary={ <span className="menu-list-item-text"> My Groups</span>} />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
            </div>
        );

        const userSection = (
            <div className="nav-drawer-user" >
                <img src={IMAGE_PATH+this.props.user.imagePath} alt="user profile" width="150" height="150" className="nav-drawer-user-img" />
                <br />
                <div style={{ height:"49px"}}>
                    <div style={{ float: "left" }}>
                        <Typography variant="title" style={{ marginLeft: "25px", marginTop: "17px", fontSize: "medium" }}> 
                            {this.props.user.name}
                        </Typography>
                    </div>
                    <div style={{ float:"right"}}>
                        <IconButton className="nav-drawer-user-settings" color="inherit" aria-label="Settings">
                            <SettingsIcon color="secondary" />
                         </IconButton>
                    </div>
                </div>
            </div>
            )


        return (
            <div>
                <Drawer open={this.props.ui.leftDrawerOpen} onClose={() => { this.props.toggleLeftDrawer(false) }}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => { this.props.toggleLeftDrawer(false) }}
                        onKeyDown={() => { this.props.toggleLeftDrawer(false) }}
                    >
                        {userSection}
                        <Divider />
                        {sideList}
                    </div>
                </Drawer>

            </div>
        );
    }
}

NavDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        ui: state.ui,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleLeftDrawer: toggleLeftDrawer }, dispatch);
}

const styled = withStyles(styles)(NavDrawer)
export default connect(mapStateToProps, mapDispatchToProps)(styled);