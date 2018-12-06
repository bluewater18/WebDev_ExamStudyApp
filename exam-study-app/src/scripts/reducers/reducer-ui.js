import { actionConstants } from '../constants/index';

const initialState = {
    leftDrawerOpen: false,
    registerStepperState: 0,
    resourceDrawerOpen: false,
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
        case actionConstants.REGISTER_STEPPER_RESET:
            return Object.assign({},state,{
                registerStepperState:0
            });
        case actionConstants.RESOURCE_DRAWER_TOGGLE:
            return Object.assign({}, state, {
                resourceDrawerOpen: action.payload
            });
        default:
            return state;
        
    }
}
