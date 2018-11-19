import { actionConstants } from '../constants/index';
const changeRegisterName = (newName) => {
    return {
        type: actionConstants.REGISTER_NAME_UPDATE,
        payload: newName
    }
}

const changeRegisterEmail = (newEmail) => {
    return {
        type: actionConstants.REGISTER_EMAIL_UPDATE,
        payload: newEmail
    }
}

const changeRegisterPassword = (newPass) => {
    return {
        type: actionConstants.REGISTER_PASSWORD_UPDATE,
        payload: newPass
    }
}

const registerComplete = (userDetails) => {
    return {
        type: actionConstants.REGISTER_COMPLETE,
        payload: userDetails
    }
}

const changeRegisterStepper = (nextStepperState) => {
    return {
        type: actionConstants.REGISTER_STEPPER_CHANGE,
        payload: nextStepperState
    }
}
export { changeRegisterName, changeRegisterEmail, changeRegisterPassword, registerComplete, changeRegisterStepper};