import { actionConstants } from '../constants/index';

const resetPassword = (newPass, key) => {
    return {
        type: actionConstants.RESET_PASSWORD,
        payload: {password: newPass, urlKey:key}
    }
}

const requestPasswordReset = (email) => {
    return {
        type: actionConstants.REQUEST_RESET_PASSWORD,
        payload: {email: email}
    }
}

export { resetPassword, requestPasswordReset};