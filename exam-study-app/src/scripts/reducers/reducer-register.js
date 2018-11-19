import { actionConstants } from '../constants/index';

const initialState = {
    registerStepperState: 0,
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.REGISTER_STEPPER_FORWARD:
            return Object.assign({}, state, {
                registerStepperState: action.payload + 1 //send the current steeper state with the action
            });
        case actionConstants.REGISTER_STEPPER_BACK:
            return Object.assign({}, state, {
                registerStepperState: action.payload + 1
            });
        default:
            return state;

    }
}
