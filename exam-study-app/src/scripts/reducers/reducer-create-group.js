import { actionConstants } from '../constants/index';

const initialState = {
    groupName: '',
    groupDescription: '',
    groupType: '',
    groupOwnerId: null,
    groupPhoto: null,
    groupPhotoPath: '',
};

export default function createGroupReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.CREATE_GROUP_NAME:
            return Object.assign({}, state, {
                groupName: action.payload
            });
        case actionConstants.CREATE_GROUP_DESCRIPTION:
            return Object.assign({}, state, {
                groupDescription: action.payload
            });
        case actionConstants.CREATE_GROUP_TYPE:
            return Object.assign({}, state, {
                groupType: action.payload
            })
            case actionConstants.CREATE_GROUP_OWNER:
            return Object.assign({}, state, {
                groupOwner: action.payload
            })        
            case actionConstants.CREATE_GROUP_IMAGE:
            return Object.assign({}, state, {
                groupPhoto: action.payload
            })
        case actionConstants.CREATE_GROUP_RESET_FIELDS:
            return initialState;
        default:
            return state;
    }
}
