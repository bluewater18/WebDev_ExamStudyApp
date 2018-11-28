import { actionConstants } from '../constants/index';

const initialState = {
    UserName: '',
    UserEmail: '',
    UserPassword: '',
    UserPhoto: null,
};

export default function editUserReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.EDIT_USER_NAME_UPDATE:
            return Object.assign({}, state, {
                UserName: action.payload
            });
        case actionConstants.EDIT_USER_EMAIL_UPDATE:
            return Object.assign({}, state, {
                UserEmail: action.payload
            });
        case actionConstants.EDIT_USER_PASSWORD_UPDATE:
            return Object.assign({}, state, {
                UserPassword: action.payload
            })
        case actionConstants.EDIT_USER_IMAGE_UPDATE:
            return Object.assign({}, state, {
                UserPhoto: action.payload
            })
        case actionConstants.EDIT_USER_RESET_FIELDS:
            return initialState;
        default:
            return state;

    }
}
