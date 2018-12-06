import React from 'react';
import '../../styles/main.scss';
import PropTypes from 'prop-types';
import { Card, CardContent, ListItem } from '@material-ui/core';


class ResourceListItem extends React.Component {
    render() {
        return (
            <ListItem style={{width:"90%", margin:"auto", padding:"0", height:"fit-content"}}>
                <Card className="resource-list-item" style={{width:"90%", margin:"auto !important", padding:"0"}}>
                    <CardContent style={{padding:"0 !important", margin: "0 !important"}}>
                        <h2>{this.props.resource.resourceName}</h2>
                        <h3>{this.props.resource.resourceType}</h3>
                    </CardContent>
                </Card>
            </ListItem>
        )
    }
}

ResourceListItem.propTypes = {
    resource: PropTypes.object.isRequired,
}

export default ResourceListItem;