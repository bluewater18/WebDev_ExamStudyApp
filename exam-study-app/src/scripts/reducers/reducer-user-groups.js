import { actionConstants } from '../constants/index';

const initialState = {
groups: []
};

export default function userGroupsReducer(state = initialState, action) {
    
    switch (action.type) {
        case actionConstants.GET_USER_GROUPS_SUCCESS:
            return {groups: action.payload}
        default:
            return state;
    }
}
