import { actionConstants } from '../constants/index';

const changeLoginEmail = (newEmail) => {
    return {
        type: actionConstants.LOGIN_EMAIL_UPDATE,
        payload: newEmail
    }
}

const changeLoginPassword = (newPass) => {
    return {
        type: actionConstants.LOGIN_PASSWORD_UPDATE,
        payload: newPass
    }
}

const submitLogin = (userDetails) => {
    return {
        type: actionConstants.LOGIN_SUBMIT,
        payload: userDetails
    }
}

export { changeLoginEmail, changeLoginPassword, submitLogin };