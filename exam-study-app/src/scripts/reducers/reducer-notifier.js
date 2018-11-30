import { actionConstants } from '../constants/index';

const initialState = {
    show: false,
    notificationType: null,
    message: null,

};

export default function notifierReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.SHOW_NOTIFIER:
            return Object.assign({}, state, {
                show: true,
                type: action.payload.type,
                message: action.payload.message,
            });
        case actionConstants.CLOSE_NOTIFIER:
            return Object.assign({} , state, {
                show: false,
            })

        default:
            return state;
        
    }
}
