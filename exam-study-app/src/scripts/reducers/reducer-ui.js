import { actionConstants } from '../constants/index';

const initialState = {
    leftDrawerOpen: false,
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.LEFT_DRAWER_OPEN:
            return Object.assign({}, state, {
                leftDrawerOpen: true
            });
        case actionConstants.LEFT_DRAWER_CLOSE:
            return Object.assign({}, state, {
                leftDrawerOpen: false
            });
        default:
            return state;
        
    }
}
