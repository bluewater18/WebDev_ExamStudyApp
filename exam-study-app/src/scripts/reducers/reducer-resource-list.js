import { actionConstants } from '../constants/index';

const initialState = {
    resources: []
};

export default function activeGroupReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.GET_RESOURCE_LIST_SUCCESS:
            return Object.assign({}, state, {
                resources: action.payload
            })
        case actionConstants.EDIT_RESOURCE_SUCCESS:
            let tempNew = [action.payload]
            return Object.assign({}, state, {
                resources: state.resources.map(obj => tempNew.find(o => o.resourceId === obj.resourceId) || obj)
            })
        case actionConstants.DELETE_RESOURCE_SUCCESS:
            return Object.assign({}, state, {
                resources: state.resources.filter(function( obj ) {
                    return obj.resourceId !== action.payload
                })
            })
        case actionConstants.CREATE_RESOURCE_SUCCESS:
        return Object.assign({}, state, {
            resources: state.resources.concat([action.payload])
        })
        default:
            return state;
    }
}
