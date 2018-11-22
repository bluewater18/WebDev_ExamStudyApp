import { actionConstants } from '../constants/index';

const initialState = {
    UserEmail: '',
    UserPassword: '',
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.LOGIN_EMAIL_UPDATE:
            return Object.assign({}, state, {
                UserEmail: action.payload
            });
        case actionConstants.LOGIN_PASSWORD_UPDATE:
            return Object.assign({}, state, {
                UserPassword: action.payload
            })
        default:
            return state;
    }
}