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

export {fetchResourceList, fetchActiveResource};