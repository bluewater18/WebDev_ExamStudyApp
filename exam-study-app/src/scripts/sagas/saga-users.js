import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest } from 'redux-saga/effects';
import {apiGetAllUsers, apiAddUserToGroup, apiLeaveGroup, apiJoinGroupWithCode} from '../api-calls/api-users'
import history from '../../history';

export function* getAllUsers() {
    try{
    let users = yield call(apiGetAllUsers);
    yield put({type:actionConstants.GET_ALL_USERS_SUCCESS, payload: users});
    } catch(err) {
        console.log(err)
        yield put({type:actionConstants.GET_ALL_USERS_FAILURE, payload: null})
    }
}

export function* addUserToGroup({payload}) {
    try{
        yield call(apiAddUserToGroup, payload.groupId, payload.user.userId)
        payload.user.memberType = "MEMBER"
        yield put({type: actionConstants.ADD_USER_TO_GROUP_SUCCESS, payload:payload.user})
    } catch(err) {
        console.log(err);
        yield put({type:actionConstants.ADD_USER_TO_GROUP_FAILURE, payload: null})
    }
}


export function* userLeaveGroup({payload}) {
    try{
        yield call(apiLeaveGroup, payload.groupId, payload.user.id)
        yield put({type: actionConstants.LEAVE_GROUP_SUCCESS, payload: payload.user})
        yield call(history.push,'/');
        yield put({ type: actionConstants.SHOW_NOTIFIER, payload:{type:"success", message:"Successfully Left group"}})
        yield put({type: actionConstants.LEFT_DRAWER_TOGGLE, payload:true})
    } catch(err) {
        console.log(err);
        yield put({type: actionConstants.LEAVE_GROUP_FAILURE, payload: null})
    }
}
export function* removeUserFromGroup({payload}) {
    try{
        yield call(apiLeaveGroup, payload.groupId, payload.user.userId)
        yield put({type: actionConstants.REMOVE_USER_FROM_GROUP_SUCCESS, payload: payload.user})
    } catch(err) {
        console.log(err);
        yield put({type: actionConstants.REMOVE_USER_FROM_GROUP_FAILURE, payload: null})
    }
}

export function* joinWithCode({payload}) {
    try{
        let group = yield call(apiJoinGroupWithCode, payload.code, payload.userId)
        yield put({type:actionConstants.JOIN_GROUP_WITH_CODE_SUCCESS})
        yield call(history.push, '/group/'+group.groupId)
    } catch(err) {
        console.log(err);
        yield put({type: actionConstants.JOIN_GROUP_WITH_CODE_FAILURE})
    }
}

export default function* root() {
    yield all([
        takeLatest(actionConstants.GET_ALL_USERS, getAllUsers),
        takeLatest(actionConstants.ADD_USER_TO_GROUP, addUserToGroup),
        takeLatest(actionConstants.LEAVE_GROUP, userLeaveGroup),
        takeLatest(actionConstants.REMOVE_USER_FROM_GROUP, removeUserFromGroup),
        takeLatest(actionConstants.JOIN_GROUP_WITH_CODE, joinWithCode),
    ]);
}