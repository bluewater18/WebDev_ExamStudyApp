import { actionConstants } from '../constants/index';

const getAllUsers = () => {
    return {
        type: actionConstants.GET_ALL_USERS,
    }
}

const addUserToGroup = (user, group) => {
    return {
        type:actionConstants.ADD_USER_TO_GROUP,
        payload: {userId:user, groupId:group}
    }
}

export { getAllUsers, addUserToGroup };