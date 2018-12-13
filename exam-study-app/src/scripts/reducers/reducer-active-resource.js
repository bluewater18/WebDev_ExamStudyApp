import { actionConstants } from '../constants/index';
import { object } from 'prop-types';

const initialState = {
    resourceId: null,
    groupId: null,
    userId: null,
    resourceName: null,
    resourceType: null,
    resourceQuestions: null,
};

export default function activeResourceReducer(state = initialState, action) {
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
        case actionConstants.CLEAR_ACTIVE_RESOURCE:
            return initialState;
        case actionConstants.EDIT_RESOURCE_SUCCESS:
            if(state.resourceId === action.payload.resourceId)
                return Object.assign({}, state,{
                    resourceName: action.payload.resourceName,
                })
            else
                return state;
        case actionConstants.ADD_QUESTION_SUCCESS:
            return Object.assign({}, state, {
                resourceQuestions: state.resourceQuestions.concat([action.payload])
            })
        case actionConstants.EDIT_QUESTION_SUCCESS:
            return Object.assign({}, state, {
                resourceQuestions: state.resourceQuestions.map(x => x.questionId === action.payload.questionId ? action.payload: x)
            })
        case actionConstants.DELETE_QUESTION_SUCCESS:
            return Object.assign({}, state, {
                resourceQuestions: state.resourceQuestions.filter(x => x.questionId !== action.payload)
            })
        case actionConstants.ADD_ANSWER_SUCCESS:
            let newQ = Object.assign({}, state.resourceQuestions[state.resourceQuestions.findIndex(x => x.questionId === action.payload.questionId)])
            if(newQ.questionAnswers === null){
                newQ.questionAnswers = []
            }
            newQ.questionAnswers.push(action.payload)
            return Object.assign({}, state, {
                resourceQuestions: state.resourceQuestions.map(x => x.questionId === newQ.questionId ? newQ: x)
            })
        
        case actionConstants.EDIT_ANSWER_SUCCESS:
            let editQ = Object.assign({}, state.resourceQuestions[state.resourceQuestions.findIndex(x => x.questionId === action.payload.questionId)])
            editQ.questionAnswers= editQ.questionAnswers.map(a => a.answerId === action.payload.answerId? action.payload: a)
            return Object.assign({}, state, {
                resourceQuestions: state.resourceQuestions.map(x => x.questionId === editQ.questionId ? editQ: x)
            })

        case actionConstants.DELETE_ANSWER_SUCCESS:
            let delQ = Object.assign({}, state.resourceQuestions[state.resourceQuestions.findIndex(x => x.questionId == action.payload.questionId)])
            console.log(delQ)
            delQ.questionAnswers = delQ.questionAnswers.filter(a=> a.answerId !== action.payload.answerId)
            return Object.assign({}, state, {
                resourceQuestions: state.resourceQuestions.map(q => q.questionId === delQ.questionId ? delQ: q)
            })
        default:
            return state;
    }
}
