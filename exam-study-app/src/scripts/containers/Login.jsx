import React from 'react';
import '../../styles/main.scss';
import Background from '../components/Background';
import { Card, CardActions, CardContent, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
class Home extends React.Component {
    render() {
        return (
            <div className="Help">
                <Background />
                <Card className="Help-Card">
                    <CardContent>
                        <AccountCircleIcon fontSize="large" />
                        <Typography variant="h4" component="h2" className="Help-Card-Title">
                            Log In
                        </Typography>
                        <br />
                        <hr />

                    </CardContent>
                    <CardActions style={{ display:"flex" }}>
                        <Button>
                            Log In
                        </Button>
                        <hr />
                        <Link to="/register">
                            <Button style={{ justifySelf: "right", fontSize: "xsmall" }} >
                                Don't have an account? Register Here
                            </Button>
                        </Link>
                    </CardActions>
                </Card>

            </div>
        )
    }
}

export default Home;