import { actionConstants } from '../constants/index';
const fetchResourceList = (groupId) => {
    return {
        type: actionConstants.GET_RESOURCE_LIST,
        payload: groupId
    }
}

const fetchActiveResource = (resourceId)=> {
    return{
        type: actionConstants.GET_RESOURCE,
        payload: resourceId
    }
}

const addResource = (resource) => {
    return{
        type:actionConstants.CREATE_RESOURCE_SUBMIT,
        payload: resource
    }
}

const editResource = (resource) => {
    return {
        type: actionConstants.EDIT_RESOURCE_SUBMIT,
        payload: resource
    }
} 

const deleteResource = (resourceId, activeResourceId, groupId) => {
    return { 
        type: actionConstants.DELETE_RESOURCE,
        payload: {resourceId: resourceId, sendHome: activeResourceId===resourceId, groupId: groupId}
    }
}

const addQuestion = (question) => {
    return{
        type: actionConstants.ADD_QUESTION, 
        payload: question
    }
}

const editQuestion = (question) => {
    return {
        type: actionConstants.EDIT_QUESTION,
        payload: question
    }
}

const deleteQuestion = (questionId) => {
    return { 
        type: actionConstants.DELETE_QUESTION,
        payload: questionId
    }
}

const addAnswer = (answer) => {
    return {
        type: actionConstants.ADD_ANSWER,
        payload: answer
    }
}

const editAnswer = (answer) => {
    return {
        type: actionConstants.EDIT_ANSWER,
        payload: answer
    }
}

const deleteAnswer = (answerId, questionId) => {
    return {
        type: actionConstants.DELETE_ANSWER,
        payload: {answerId: answerId, questionId: questionId}
    }
}

const upvoteAnswer = (answerId, userId)=> {
    return {
        type: actionConstants.UPVOTE_ANSWER,
        payload: {answerId: answerId, userId: userId}
    }
}

const downvoteAnswer = (answerId, userId)=> {
    return {
        type: actionConstants.DOWNVOTE_ANSWER,
        payload: {answerId: answerId, userId: userId}
    }
}

const goToResource = (groupId, resourceId) => {
    return{
        type: actionConstants.GO_TO_RESOURCE,
        payload: {groupId: groupId, resourceId: resourceId}
    }
}

export {fetchResourceList, fetchActiveResource, addResource, editResource, deleteResource, addQuestion, editQuestion, deleteQuestion, addAnswer, editAnswer, deleteAnswer, upvoteAnswer, downvoteAnswer, goToResource};