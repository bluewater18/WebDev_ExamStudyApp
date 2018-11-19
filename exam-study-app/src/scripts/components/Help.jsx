import React from 'react';
import { Card, CardActions, CardContent, Typography, Button, } from '@material-ui/core';
import { Link } from 'react-router-dom';


class Help extends React.Component {
    render() {
        return (
            <div className="Help" >
                <div className="Hero-Background" />
                    <Card className="Help-Card">
                    <CardContent>
                        <Typography variant="h4" component="h2" className="Help-Card-Title">
                                Exam Study
                                </Typography>
                        <Typography className="Help-Card-Title-Sub" color="textSecondary">
                                about
                                </Typography>
                        <br/>
                        <hr/>
                        <Typography component="p" className="Help-Card-Content">
                                This web application is designed to help students study collaboratively online with ease.
                                <br />
                                To get started simply sign up for an account and create a group to invite classmates and friends to study.
                                <br />
                            </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: "center" }}>
                        <Link to="/register">
                            <Button style={{ justifySelf: "center", fontSize: "small" }} >
                                Sign Me Up
                            </Button>
                        </Link>
                    </CardActions>
                    </Card>
            </div>
        );
    }
}



export default Help;