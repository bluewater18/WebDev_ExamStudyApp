import { actionConstants } from '../constants/index';

const getAllUsers = () => {
    return {
        type: actionConstants.GET_ALL_USERS,
    }
}

const addUserToGroup = (user, group) => {
    return {
        type:actionConstants.ADD_USER_TO_GROUP,
        payload: {user:user, groupId:group}
    }
}

const leaveGroup = (user, groupId) => {
    return {
        type: actionConstants.LEAVE_GROUP,
        payload: {user:user, groupId: groupId}
    }
}

const removeUserFromGroup = (user, groupId) => {
    return {
        type: actionConstants.REMOVE_USER_FROM_GROUP,
        payload: {user:user, groupId: groupId}
    }
}

const joinGroupWithCode = (code, userId) => {
    return {
        type: actionConstants.JOIN_GROUP_WITH_CODE,
        payload: {code: code, userId: userId}
    }
}

export { getAllUsers, addUserToGroup, leaveGroup, removeUserFromGroup, joinGroupWithCode };