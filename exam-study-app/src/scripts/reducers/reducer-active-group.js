import { actionConstants } from '../constants/index';

const initialState = {
    groupId: null,
    groupName: '',
    groupDescription: '',
    groupType: '',
    groupOwnerId: null,
    groupPhotoPath: '',
    groupCode: '',
    groupMembers: [],
    users:[],
};

export default function activeGroupReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.GET_GROUP_SUCCESS:
            return Object.assign({}, state, {
                groupId: action.payload.groupId,
                groupName: action.payload.groupName,
                groupDescription: action.payload.groupDescription,
                groupType: action.payload.groupType,
                groupOwnerId: action.payload.groupOwnerId,
                groupPhotoPath: action.payload.groupImageName,
                groupCode: action.payload.groupCode,
            })
        case actionConstants.GET_GROUP_MEMBERS_SUCCESS:
            return Object.assign({}, state , {
                groupMembers: action.payload
            })
        case actionConstants.GET_ALL_USERS_SUCCESS:
            return Object.assign({}, state, {
                users: action.payload
            })
        default:
            return state;
    }
}
