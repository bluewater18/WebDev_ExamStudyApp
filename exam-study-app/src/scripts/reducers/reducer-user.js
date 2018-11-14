import { actionConstants } from '../constants/index';

const initialState = {
    isAuthenticated: false,
    status: 'idle',
    token: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.LOGIN_SUCCESS:
            return {
                isAuthenticated: true,
                status: 'active',
                token: action.payload.token,
            }
        default:
            return state
    }
}