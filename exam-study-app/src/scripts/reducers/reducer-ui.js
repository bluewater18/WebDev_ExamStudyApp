import { actionConstants } from '../constants/index';

const initialState = {
    leftDrawerOpen: false,
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.LEFT_DRAWER_TOGGLE:
            return Object.assign({}, state, {
                leftDrawerOpen: action.payload
            });
        default:
            return state;
        
    }
}
