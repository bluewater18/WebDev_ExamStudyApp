import { actionConstants } from '../constants/index';

const initialState = {
    GroupName: '',
    GroupDescription: '',
    GroupType: '',
    GroupOwner: null,
    GroupPhoto: null,
};

export default function createGroupReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.CREATE_GROUP_NAME:
            return Object.assign({}, state, {
                GroupName: action.payload
            });
        case actionConstants.CREATE_GROUP_DESCRIPTION:
            return Object.assign({}, state, {
                GroupDescription: action.payload
            });
        case actionConstants.CREATE_GROUP_TYPE:
            return Object.assign({}, state, {
                GroupType: action.payload
            })
            case actionConstants.CREATE_GROUP_OWNER:
            return Object.assign({}, state, {
                GroupOwner: action.payload
            })        
            case actionConstants.CREATE_GROUP_IMAGE:
            return Object.assign({}, state, {
                GroupPhoto: action.payload
            })
        case actionConstants.CREATE_GROUP_RESET_FIELDS:
            return initialState;
        default:
            return state;
    }
}
