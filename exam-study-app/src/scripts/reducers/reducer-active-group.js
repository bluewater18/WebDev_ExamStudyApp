import { actionConstants } from '../constants/index';

const initialState = {
    groupId: null,
    groupName: '',
    groupDescription: '',
    groupType: '',
    groupOwnerId: null,
    groupPhotoPath: '',
};

export default function activeGroupReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.GET_GROUP_SUCCESS:
            console.log(action.payload)
            return Object.assign({}, state, {
                groupId: action.payload.groupId,
                groupName: action.payload.groupName,
                groupDescription: action.payload.groupDescription,
                groupType: action.payload.groupType,
                groupOwnerId: action.payload.groupOwnerId,
                groupPhotoPath: action.payload.groupImageName,
            })
        default:
            return state;
    }
}
