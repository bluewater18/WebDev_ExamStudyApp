import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardContent, CardHeader, Typography, Button, withStyles, Grid } from '@material-ui/core'

const styles = {
    card: {
        minWidth: 275,
        maxWidth: 300,
        maxHeight: 500,
        float: "center"
        
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class Help extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className="Help" >
                <div className="Hero-Background" />
                    <Card className="Help-Card">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                About
                                </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                adjective
                                </Typography>
                            <Typography component="p">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
            </div>
        );
    }
}

Help.PropType = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help);