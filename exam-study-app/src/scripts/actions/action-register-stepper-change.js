import { actionConstants } from '../constants/index';
const changeRegisterStepper = (nextStepperState) => {
    return {
        type: actionConstants.REGISTER_STEPPER_CHANGE,
        payload: nextStepperState
    }
}

export default changeRegisterStepper;