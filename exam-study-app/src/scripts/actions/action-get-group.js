import { actionConstants } from '../constants/index';
const getGroup = (groupId) => {
    return {
        type: actionConstants.GET_GROUP,
        payload: groupId
    }
}

const getAllGroups = () => {
    return {
        type: actionConstants.GET_ALL_GROUPS,

    }
}

const getUserGroups = (userId) => {
    return {
        type: actionConstants.GET_USER_GROUPS,
        payload: userId
    }
}

const getGroupMembers = (groupId) => {
    return {
        type: actionConstants.GET_GROUP_MEMBERS,
        payload: groupId
    }
}

const deleteGroup = (groupId) => {
    return {
        type: actionConstants.DELETE_GROUP,
        payload: {groupId: groupId}
    }
}


export { getGroup, getAllGroups, getUserGroups, getGroupMembers, deleteGroup};