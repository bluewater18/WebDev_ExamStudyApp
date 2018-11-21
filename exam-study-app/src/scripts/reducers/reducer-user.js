import { actionConstants } from '../constants/index';

const initialState = {
    isAuthenticated: false,
    id: 0,
    name: null,
    email: null,
    token: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.REGISTER_SUCCESS:
        case actionConstants.LOGIN_SUCCESS:
            return {
                isAuthenticated: true,
                id: action.payload.userId,
                name: action.payload.userName,
                email: action.payload.userEmail,
                token: action.payload.userToken,
            };
        case actionConstants.REGISTER_FAILURE:
        case actionConstants.LOGIN_FAILURE:
            return {
                isAuthenticated: false,
                id: 0,
                name: null,
                email: null,
                token: null,
            }
        default:
            return state;
    }
};