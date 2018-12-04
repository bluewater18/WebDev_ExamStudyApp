import { actionConstants } from '../constants/index';

const initialState = {
    groupId: null,
    groupName: '',
    groupDescription: '',
    groupType: '',
    groupPhoto: null
};

export default function editGroupReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.EDIT_GROUP_INIT_PS:
            return({
                groupId: action.payload.groupId,
                groupName: action.payload.groupName,
                groupDescription: action.payload.groupDescription,
                groupType: action.payload.groupType,
                groupPhoto: null,
            })
        case actionConstants.EDIT_GROUP_NAME:
            return Object.assign({}, state, {
                groupName: action.payload
            });
        case actionConstants.EDIT_GROUP_DESCRIPTION:
            return Object.assign({}, state, {
                groupDescription: action.payload
            });
        case actionConstants.EDIT_GROUP_TYPE:
            return Object.assign({}, state, {
                groupType: action.payload
            })
            case actionConstants.EDIT_GROUP_OWNER:
            return Object.assign({}, state, {
                groupOwner: action.payload
            })        
            case actionConstants.EDIT_GROUP_IMAGE:
            return Object.assign({}, state, {
                groupPhoto: action.payload
            })
        default:
            return state;

    }
}
