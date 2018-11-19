﻿import { actionConstants } from '../constants/index';

const initialState = {
    UserName: '',
    UserEmail: '',
    UserPassword: '',
};

export default function registerReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.REGISTER_NAME_UPDATE:
            return Object.assign({}, state, {
                UserName: action.payload
            });
        case actionConstants.REGISTER_EMAIL_UPDATE:
            return Object.assign({}, state, {
                UserEmail: action.payload
            });
        case actionConstants.REGISTER_PASSWORD_UPDATE:
            return Object.assign({}, state, {
                UserPassword: action.payload
            })
        default:
            return state;

    }
}
