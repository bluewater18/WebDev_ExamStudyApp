﻿import { apiCreateGroup, apiUpdateGroupPhoto, apiGetGroup, apiGetUserGroups, apiGetAllGroups, apiGetMembersFromGroup, apiJoinGroupWithCode } from '../api-calls/api-groups';
import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest } from 'redux-saga/effects';
import history from '../../history';

export function* createGroup({payload}) {
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

export function* createGroupSuccess({payload}) {
    yield call (history.push,'/group/'+payload.groupId);      
}

export function* getGroup({payload}) {
    try {
        let group = yield call(apiGetGroup, payload);
        yield put({type: actionConstants.GET_GROUP_SUCCESS, payload: group})
    } catch(err){
        console.log(err)
        yield put({type: actionConstants.GET_GROUP_FAILURE})
    }
}

export function* getAllGroups() {
    try {
        let groups = yield call(apiGetAllGroups)
        yield put({ type: actionConstants.GET_ALL_GROUPS_SUCCESS, payload:groups})
    } catch(err){
        console.log(err);
        yield put({type: actionConstants.GET_ALL_GROUPS_FAILURE})
    }
}

export function* getUserGroups(userId) {
    try {
        let groups = yield call(apiGetUserGroups, userId)
        yield put({ type: actionConstants.GET_USER_GROUPS_SUCCESS, payload:groups})
    } catch(err) {
        console.log(err);
        yield put({ type: actionConstants.GET_USER_GROUPS_FAILURE})
    }
}

export function* getMembers({payload}){
    try{
        let members = yield call(apiGetMembersFromGroup, payload)
        yield put({type: actionConstants.GET_GROUP_MEMBERS_SUCCESS, payload: members})
    } catch (err) {
        console.log(err);
        yield put({type: actionConstants.GET_GROUP_MEMBERS_FAILURE})
    }
}

export function* joinWithCode({payload}) {
    try{
        yield call(apiJoinGroupWithCode, payload)
        yield put({type:actionConstants.JOIN_GROUP_WITH_CODE_SUCCESS})
    } catch(err) {
        console.log(err);
        yield put({type: actionConstants.JOIN_GROUP_WITH_CODE_FAILURE})
    }
}

export default function* root() {
    yield all([
        takeLatest(actionConstants.CREATE_GROUP_COMPLETE, createGroup),
        takeLatest(actionConstants.CREATE_GROUP_SUCCESS, createGroupSuccess),
        takeLatest(actionConstants.GET_GROUP, getGroup),
        takeLatest(actionConstants.GET_ALL_GROUPS, getAllGroups),
        takeLatest(actionConstants.GET_USER_GROUPS, getUserGroups),
        takeLatest(actionConstants.GET_GROUP_MEMBERS, getMembers),
        takeLatest(actionConstants.JOIN_GROUP_WITH_CODE, joinWithCode),
    ]);
}