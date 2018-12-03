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

export { getAllUsers, addUserToGroup, leaveGroup };