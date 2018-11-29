import { actionConstants } from '../constants/index';

const initialState = {
groups: []
};

export default function activeGroupReducer(state = initialState, action) {
    
    switch (action.type) {
        case actionConstants.GET_ALL_GROUPS_SUCCESS:
            console.log(action.payload)
            return {groups: action.payload}
        default:
            return state;
    }
}
