import { actionConstants } from '../constants/index';


const initialState = {
    isAuthenticated: false,
    id: 0,
    name: null,
    email: null,
    token: null,
    imagePath:null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.REGISTER_SUCCESS_POST_SAGA:
        case actionConstants.LOGIN_SUCCESS_POST_SAGA:
            return {
                isAuthenticated: true,
                id: action.payload.userId,
                name: action.payload.userName,
                email: action.payload.userEmail,
                token: action.payload.userToken,
                imagePath: action.payload.userImageName,
            };
        case actionConstants.REGISTER_FAILURE_POSTSAGA:
        case actionConstants.LOGIN_FAILURE_POSTSAGA:
        case actionConstants.LOGOUT_USER:
            return {
                isAuthenticated: false,
                id: 0,
                name: null,
                email: null,
                token: null,
                imagePath: null,
            }
        default:
            return state;
    }
};