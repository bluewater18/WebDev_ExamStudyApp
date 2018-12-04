import { actionConstants } from '../constants/index';
const editGroupInit = (group) => {
    return{
        type:actionConstants.EDIT_GROUP_INIT,
        payload: group
    }
}

const editGroupName = (name) => {
    return {
        type: actionConstants.EDIT_GROUP_NAME,
        payload: name
    }
}

const editGroupDescription = (desc) => {
    return {
        type: actionConstants.EDIT_GROUP_DESCRIPTION,
        payload: desc
    }
}

const editGroupType = (type) => {
    return {
        type: actionConstants.EDIT_GROUP_TYPE,
        payload: type
    }
}

const editGroupPhoto = (photo) => {

    return {
        type: actionConstants.EDIT_GROUP_IMAGE,
        payload: photo
    }  
}

const editGroupComplete = (group, userId) => {
    return {
        type: actionConstants.EDIT_GROUP_COMPLETE,
        payload: {group: group, userId: userId}
    }
}


export { editGroupInit, editGroupName, editGroupDescription, editGroupType, editGroupPhoto, editGroupComplete };