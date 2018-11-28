import { actionConstants } from '../constants/index';
const changeEditName = (newName) => {
    return {
        type: actionConstants.EDIT_USER_NAME_UPDATE,
        payload: newName
    }
}

const changeEditEmail = (newEmail) => {
    return {
        type: actionConstants.EDIT_USER_EMAIL_UPDATE,
        payload: newEmail
    }
}

const changeEditPassword = (newPass) => {
    return {
        type: actionConstants.EDIT_USER_PASSWORD_UPDATE,
        payload: newPass
    }
}

const changeEditPhoto = (newPhoto) => {

        return {
            type: actionConstants.EDIT_USER_IMAGE_UPDATE,
            payload: newPhoto
        }
    
    
}

const editComplete = (userDetails, userId, photo) => {
    return {
        type: actionConstants.EDIT_USER_COMPLETE,
        payload: {userDetails:userDetails, userId:userId, photo:photo}
    }
}


export { changeEditName, changeEditEmail, changeEditPassword, changeEditPhoto, editComplete};