import { apiCreateResource, apiGetResource, apiGetResources, apiEditResource, apiDeleteResource } from '../api-calls/api-resources';
import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest, select} from 'redux-saga/effects';
import history from '../../history';

function* createResource({payload}) {
    try {
        let user = yield select((state) => state.user)
        let resource = payload;
        resource.userId = payload.userId;
        let createdResource = yield call(apiCreateResource, resource, user.token);
        yield put({ type: actionConstants.CREATE_RESOURCE_SUCCESS, payload: createdResource });
        yield call(history.push,'/group/'+payload.groupId+'/resource/'+createdResource.resourceId);
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type:'success', message:createdResource.resourceName+ ' Created Successfully! '}})
        
    } catch (err) {
        console.log(err)
        yield put({ type: actionConstants.CREATE_RESOURCE_FAILURE })
    }
}


function* getResource({payload}) {
    try {
        let user = yield select((state) => state.user)
        let resource = yield call(apiGetResource, payload, user.token);
        yield put({type: actionConstants.GET_RESOURCE_SUCCESS, payload: resource})
    } catch(err){
        console.log(err)
        yield put({type: actionConstants.GET_RESOURCE_FAILURE})
    }
}

function* getResourceList({payload}) {
    try {
        let user = yield select((state) => state.user)
        let resources = yield call(apiGetResources, payload, user.token)
        yield put({ type: actionConstants.GET_RESOURCE_LIST_SUCCESS, payload:resources})
    } catch(err){
        console.log(err);
        yield put({type: actionConstants.GET_RESOURCE_LIST_FAILURE})
    }
}


function* deleteResource({payload}) {
    try {
        let user = yield select((state) => state.user)
        yield call(apiDeleteResource, payload.resourceId, user.token)
        yield put({type: actionConstants.DELETE_RESOURCE_SUCCESS, payload:payload.resourceId})
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'success', message: 'Resource Deleted'}})
        if(payload.sendHome){
            yield call(history.push,'/group/'+payload.groupId);
        }
    } catch (err){
        console.log(err)
        yield put({type: actionConstants.DELETE_RESOURCE_FAILURE})
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'error', message: 'Could not delete resource'}})
    }
}

function* editResource({payload}) {
    try{
        let user = yield select((state) => state.user)
        let updatedResource = yield call(apiEditResource, payload, user.token)
        yield put({type: actionConstants.EDIT_RESOURCE_SUCCESS, payload: updatedResource})
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'success', message: 'Resource edited successfully'}})
    } catch(err){
        console.log(err)
        yield put({type:actionConstants.EDIT_RESOURCE_FAILURE})
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'error', message: 'Could not edit resource'}})
    }
}



export default function* root() {
    yield all([
        takeLatest(actionConstants.GET_RESOURCE_LIST, getResourceList),
        takeLatest(actionConstants.GET_RESOURCE, getResource),
        takeLatest(actionConstants.CREATE_RESOURCE_SUBMIT, createResource),
        takeLatest(actionConstants.EDIT_RESOURCE_SUBMIT, editResource),
        takeLatest(actionConstants.DELETE_RESOURCE, deleteResource),
    ]);
}