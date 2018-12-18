import React from 'react';
import '../../styles/main.scss';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import WorkIcon from '@material-ui/icons/Work';
import GroupIcon from '@material-ui/icons/Group';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import {IMAGE_PATH} from '../constants/index';


class MyGroupHelper extends React.Component {

    render() {
        return (
            <Card className="my-group-helper-container">
                <CardActionArea className="my-group-helper-header">
                    <CardMedia 
                        className="my-group-helper-media"
                        image={IMAGE_PATH + this.props.group.groupImageName}
                        title="Group Image"
                    />
                    <CardContent className="my-group-helper-content">
                        {this.cardContentRenderer()}
                    </CardContent>
                   
                </CardActionArea>
                <hr/>
                <CardActions className="my-group-helper-footer">
                    {this.cardActionsRenderer()}
                </CardActions>
            </Card>
        )
    }

    cardContentRenderer(){
        return(
            <div>
                <h2>{this.props.group.groupName}</h2>
                <h4>Created By: {this.props.group.groupOwnerId}</h4>
                <h4>--</h4>
                <h3>{this.props.group.groupType}</h3>
            </div>
        )
    }

    cardActionsRenderer() {
        return(
            <div className="my-group-helper-footer-actions">
                <div>
                    <WorkIcon fontSize="small"/>
                </div>
                <div>
                {/* <IconButton>
                    <SettingsIcon fontSize="small"/>
                </IconButton> */}
                </div>
                <div >
                    <IconButton>
                        <GroupIcon fontSize="small"/>
                        <h3 style={{display:"inline", margin:"0"}}>{this.props.group.groupMemberCount}</h3>
                    </IconButton>
                    
                </div>
            </div>
        )
    }
}
MyGroupHelper.proptypes = {
    group: PropTypes.object.isRequired,
}

export default MyGroupHelper;