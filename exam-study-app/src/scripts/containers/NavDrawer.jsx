import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import toggleLeftDrawer from '../actions/action-toggle-left-drawer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { Link } from 'react-router-dom'
const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class NavDrawer extends React.Component {

    render() {
        const { classes } = this.props;
        const sideList = (
            <div className={classes.list}>
                <List>
                    <Link key="menu-demo" to="/demo">
                        <ListItem button key={"yelloBtn"}>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary={"yello"} />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <Link key={"menu-home" + index} to = "/" >
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
        );

        const userSection = (
            <div className="nav-drawer-user" >
                <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=350" alt="user profile" width="150" height="150" className="nav-drawer-user-img" />
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
                        {/*<div className="listHead" style={{ padding: "20px" }}>
                            <h1> Exam Study </h1>
                        </div>*/}
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