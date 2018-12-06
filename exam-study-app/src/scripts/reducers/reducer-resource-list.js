import { actionConstants } from '../constants/index';

const initialState = {
    resources: []
};

export default function activeGroupReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.GET_RESOURCE_LIST_SUCCESS:
            return Object.assign({}, state, {
                resources: action.payload.resources
            })
        default:
            return state;
    }
}
