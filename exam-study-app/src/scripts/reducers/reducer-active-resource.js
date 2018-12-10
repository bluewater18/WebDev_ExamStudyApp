import { actionConstants } from '../constants/index';

const initialState = {
    resourceId: null,
    groupId: null,
    userId: null,
    resourceName: null,
    resourceType: null,
    resourceQuestions: null,
};

export default function activeGroupReducer(state = initialState, action) {
    switch (action.type) {
        case actionConstants.GET_RESOURCE_SUCCESS:
            return Object.assign({}, state, {
                resourceId: action.payload.resourceId,
                groupId: action.payload.groupId,
                userId: action.payload.userId,
                resourceName: action.payload.resourceName,
                resourceType: action.payload.resourceType,
                resourceQuestions: action.payload.resourceQuestions
            })
        case actionConstants.ADD_QUESTION_SUCCESS:
            return Object.assign({}, state,{
                resourceQuestions: state.resourceQuestions.concat(action.payload)
            })
        default:
            return state;
    }
}
