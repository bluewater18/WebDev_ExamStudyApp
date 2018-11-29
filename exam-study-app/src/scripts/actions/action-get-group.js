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




export { getGroup, getAllGroups, getUserGroups };