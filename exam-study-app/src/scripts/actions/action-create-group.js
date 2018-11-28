import { actionConstants } from '../constants/index';
const createGroupName = (name) => {
    return {
        type: actionConstants.CREATE_GROUP_NAME,
        payload: name
    }
}

const createGroupDescription = (desc) => {
    return {
        type: actionConstants.CREATE_GROUP_DESCRIPTION,
        payload: desc
    }
}

const createGroupType = (type) => {
    return {
        type: actionConstants.CREATE_GROUP_TYPE,
        payload: type
    }
}

const createGroupOwner = (owner) => {

        return {
            type: actionConstants.CREATE_GROUP_OWNER,
            payload: owner
        }  
}

const createGroupPhoto = (photo) => {

    return {
        type: actionConstants.CREATE_GROUP_IMAGE,
        payload: photo
    }  
}

const createGroupComplete = (group) => {
    return {
        type: actionConstants.CREATE_GROUP_COMPLETE,
        payload: group
    }
}


export { createGroupName, createGroupDescription, createGroupType, createGroupOwner, createGroupPhoto, createGroupComplete };