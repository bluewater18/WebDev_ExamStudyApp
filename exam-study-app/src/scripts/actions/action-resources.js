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

const deleteResource = (resourceId) => {
    return { 
        type: actionConstants.DELETE_RESOURCE,
        payload: resourceId
    }
}

const addQuestion = (question) => {
    return{
        type: actionConstants.ADD_QUESTION, 
        payload: question
    }
}

const goToResource = (groupId, resourceId) => {
    return{
        type: actionConstants.GO_TO_RESOURCE,
        payload: {groupId: groupId, resourceId: resourceId}
    }
}

export {fetchResourceList, fetchActiveResource, addResource, editResource, deleteResource, addQuestion, goToResource};