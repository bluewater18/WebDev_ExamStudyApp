import { actionConstants } from '../constants/index';

const initialState = {
    leftDrawerOpen: false,
    registerStepperState: 0,
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.LEFT_DRAWER_TOGGLE:
            return Object.assign({}, state, {
                leftDrawerOpen: action.payload
            });
        case actionConstants.REGISTER_STEPPER_CHANGE:
            return Object.assign({}, state, {
                registerStepperState: action.payload //send the current steeper state with the action
            });
        default:
            return state;
        
    }
}
