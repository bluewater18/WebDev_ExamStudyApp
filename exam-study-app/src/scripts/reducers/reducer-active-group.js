import { actionConstants } from '../constants/index';

const initialState = {
    groupId: null,
    groupName: '',
    groupDescription: '',
    groupType: '',
    groupOwnerId: null,
    groupOwnerName: '',
    groupPhotoPath: '',
    groupCode: '',
    groupMemberCount: null,
    groupMembers: [],
    groupAdmins: [],
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
                groupOwnerName: action.payload.groupOwnerName,
                groupPhotoPath: action.payload.groupImageName,
                groupCode: action.payload.groupCode,
                groupMemberCount: action.payload.groupMemberCount,
                groupAdmins: action.payload.groupAdminIds
            })
        case actionConstants.GET_GROUP_MEMBERS_SUCCESS:
            return Object.assign({}, state , {
                groupMembers: action.payload
            })
        case actionConstants.GET_ALL_USERS_SUCCESS:
            return Object.assign({}, state, {
                users: action.payload
            })
        case actionConstants.ADD_USER_TO_GROUP_SUCCESS:
            return Object.assign({}, state, {
                groupMembers: state.groupMembers.concat([action.payload])
            })
        case actionConstants.REMOVE_USER_FROM_GROUP_SUCCESS:
        case actionConstants.LEAVE_GROUP_SUCCESS:
            return Object.assign({}, state, {
                groupMembers: state.groupMembers.filter(function(ele){
                    return ele.userId !== action.payload.id && ele.userId !== action.payload.userId
                })
            })
        default:
            return state;
    }
}
