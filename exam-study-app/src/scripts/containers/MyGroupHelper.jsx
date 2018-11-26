import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import WorkIcon from '@material-ui/icons/Work';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton, Button } from '@material-ui/core';


class MyGroupHelper extends React.Component {
    render() {
        return (
            <Card className="my-group-helper-container">
                <CardActionArea className="my-group-helper-header">
                    <CardMedia 
                        className="my-group-helper-media"
                        image="https://images.pexels.com/photos/450059/pexels-photo-450059.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
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
                <h2>Cosc 367</h2>
                <h4>Created By: Matt Jones</h4>
                <h4>--</h4>
                <h3>Exam Prep</h3>
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
                <IconButton>
                    <SettingsIcon fontSize="small"/>
                </IconButton>
                </div>
                <div >
                    <IconButton>
                        <GroupIcon fontSize="small"/>
                        <h3 style={{display:"inline", margin:"0"}}>65</h3>
                    </IconButton>
                    
                </div>
            </div>
        )
    }
}

export default MyGroupHelper;