import { actionConstants } from '../constants/index';

const initialState = {
    isEditing: false,
};

export default function editGroupReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.EDIT_GROUP_RESET_FIELDS:
            return initialState;
        default:
            return state;

    }
}
