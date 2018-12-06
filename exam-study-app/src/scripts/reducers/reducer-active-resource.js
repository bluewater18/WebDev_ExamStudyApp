import { actionConstants } from '../constants/index';

const initialState = {
    resource: null
};

export default function activeGroupReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.GET_RESOURCE_SUCCESS:
            return Object.assign({}, state, {
                resource: action.payload.resource
            })
        default:
            return state;
    }
}
