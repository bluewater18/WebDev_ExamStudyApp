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
import toggleLeftDrawer from '../actions/action-toggle-left-drawer'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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


        return (
            <div>
                <Drawer open={this.props.ui.leftDrawerOpen} onClose={() => { this.props.toggleLeftDrawer(false) }}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => { this.props.toggleLeftDrawer(false) }}
                        onKeyDown={() => { this.props.toggleLeftDrawer(false) }}
                    >
                        <div className="listHead" style={{ padding: "20px" }}>
                            <h1> Generic Menu </h1>
                        </div>
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
        ui: state.ui
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleLeftDrawer: toggleLeftDrawer }, dispatch);
}

const styled = withStyles(styles)(NavDrawer)
export default connect(mapStateToProps, mapDispatchToProps)(styled);