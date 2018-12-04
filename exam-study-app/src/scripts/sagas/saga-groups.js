import { apiCreateGroup, apiUpdateGroupPhoto, apiGetGroup, apiGetUserGroups, apiGetAllGroups, apiGetMembersFromGroup, apiDeleteGroup, apiEditGroup } from '../api-calls/api-groups';
import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest } from 'redux-saga/effects';
import history from '../../history';

function* createGroup({payload}) {
    try {
        let group = payload.group;
        let photo = payload.group.groupPhoto;
        group.groupPhoto = null;
        group.groupOwnerId = payload.userId;
        let createdGroup = yield call(apiCreateGroup, group);
        if(photo !== null){
            group.groupImageName = yield call(apiUpdateGroupPhoto, photo, createdGroup.groupId)
        }
        yield put({ type: actionConstants.CREATE_GROUP_SUCCESS, payload: createdGroup });
        yield put({type:actionConstants.CREATE_GROUP_RESET_FIELDS})
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type:'success', message:createdGroup.groupName+ ' Created Successfully! '}})

    } catch (err) {
        console.log(err)
        yield put({ type: actionConstants.CREATE_GROUP_FAILURE })
    }
}

function* createGroupSuccess({payload}) {
    yield call (history.push,'/group/'+payload.groupId);      
}

function* getGroup({payload}) {
    try {
        let group = yield call(apiGetGroup, payload);
        yield put({type: actionConstants.GET_GROUP_SUCCESS, payload: group})
    } catch(err){
        console.log(err)
        yield put({type: actionConstants.GET_GROUP_FAILURE})
    }
}

function* getAllGroups() {
    try {
        let groups = yield call(apiGetAllGroups)
        yield put({ type: actionConstants.GET_ALL_GROUPS_SUCCESS, payload:groups})
    } catch(err){
        console.log(err);
        yield put({type: actionConstants.GET_ALL_GROUPS_FAILURE})
    }
}

function* getUserGroups(userId) {
    try {
        let groups = yield call(apiGetUserGroups, userId)
        yield put({ type: actionConstants.GET_USER_GROUPS_SUCCESS, payload:groups})
    } catch(err) {
        console.log(err);
        yield put({ type: actionConstants.GET_USER_GROUPS_FAILURE})
    }
}

function* getMembers({payload}){
    try{
        let members = yield call(apiGetMembersFromGroup, payload)
        yield put({type: actionConstants.GET_GROUP_MEMBERS_SUCCESS, payload: members})
    } catch (err) {
        console.log(err);
        yield put({type: actionConstants.GET_GROUP_MEMBERS_FAILURE})
    }
}

function* deleteGroup({payload}) {
    try {
        yield call(apiDeleteGroup, payload.groupId)
        yield put({type: actionConstants.DELETE_GROUP_SUCCESS})
        yield call(history.push, '/')
        yield put({type: actionConstants.LEFT_DRAWER_TOGGLE, payload: true})
    } catch (err){
        console.log(err)
        yield put({type: actionConstants.DELETE_GROUP_FAILURE})
    }
}

function* editGroup({payload}) {
    try{
        yield call(apiEditGroup, payload)
        yield put({type: actionConstants.EDIT_GROUP_SUCCESS, payload: null})
        yield call(history.push, "/group/"+payload.groupId)
    } catch(err){
        console.log(err)
        yield put({type:actionConstants.EDIT_GROUP_FAILURE})
    }
}

function* editGroupInit({payload}) {
    yield put({type: actionConstants.EDIT_GROUP_INIT_PS, payload: payload})
    yield call(history.push, "/group/"+payload.groupId+"/edit")
}

export default function* root() {
    yield all([
        takeLatest(actionConstants.CREATE_GROUP_COMPLETE, createGroup),
        takeLatest(actionConstants.CREATE_GROUP_SUCCESS, createGroupSuccess),
        takeLatest(actionConstants.GET_GROUP, getGroup),
        takeLatest(actionConstants.GET_ALL_GROUPS, getAllGroups),
        takeLatest(actionConstants.GET_USER_GROUPS, getUserGroups),
        takeLatest(actionConstants.GET_GROUP_MEMBERS, getMembers),
        takeLatest(actionConstants.DELETE_GROUP, deleteGroup),
        takeLatest(actionConstants.EDIT_GROUP_INIT, editGroupInit),
        takeLatest(actionConstants.EDIT_GROUP_COMPLETE, editGroup),

    ]);
}