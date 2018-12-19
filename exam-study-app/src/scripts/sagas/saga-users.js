import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import {apiGetAllUsers, apiAddUserToGroup, apiLeaveGroup, apiJoinGroupWithCode} from '../api-calls/api-users'
import history from '../../history';

export function* getAllUsers() {
    try{
        let user = yield select((state) => state.user)
        let users = yield call(apiGetAllUsers, user.token);
        yield put({type:actionConstants.GET_ALL_USERS_SUCCESS, payload: users});
    } catch(err) {
        console.log(err)
        yield put({type:actionConstants.GET_ALL_USERS_FAILURE, payload: null})
    }
}

export function* addUserToGroup({payload}) {
    try{
        let user = yield select((state) => state.user)
        yield call(apiAddUserToGroup, payload.groupId, payload.user.userId, user.token)
        payload.user.memberType = "MEMBER"
        yield put({type: actionConstants.ADD_USER_TO_GROUP_SUCCESS, payload:payload.user})
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'success', message: 'User added to group'}})
    } catch(err) {
        console.log(err);
        yield put({type:actionConstants.ADD_USER_TO_GROUP_FAILURE, payload: null})
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'error', message: 'User could not be added to group'}})
    }
}


export function* userLeaveGroup({payload}) {
    try{
        let user = yield select((state) => state.user)
        yield call(apiLeaveGroup, payload.groupId, payload.user.id, user.token)
        yield put({type: actionConstants.LEAVE_GROUP_SUCCESS, payload: payload.user})
        yield call(history.push,'/');
        yield put({ type: actionConstants.SHOW_NOTIFIER, payload:{type:"success", message:"Successfully Left group"}})
        yield put({type: actionConstants.LEFT_DRAWER_TOGGLE, payload:true})
    } catch(err) {
        console.log(err);
        yield put({type: actionConstants.LEAVE_GROUP_FAILURE, payload: null})
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'error', message: 'Error leaving group'}})
    }
}
export function* removeUserFromGroup({payload}) {
    try{
        let user = yield select((state) => state.user)
        yield call(apiLeaveGroup, payload.groupId, payload.user.userId, user.token)
        yield put({type: actionConstants.REMOVE_USER_FROM_GROUP_SUCCESS, payload: payload.user})
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'success', message: 'User removed from group'}})
    } catch(err) {
        console.log(err);
        yield put({type: actionConstants.REMOVE_USER_FROM_GROUP_FAILURE, payload: null})
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'error', message: 'Error removing user from group'}})
    }
}

export function* joinWithCode({payload}) {
    try{
        let user = yield select((state) => state.user)
        let group = yield call(apiJoinGroupWithCode, payload.code, payload.userId, user.token)
        yield put({type:actionConstants.JOIN_GROUP_WITH_CODE_SUCCESS})
        yield call(history.push, '/group/'+group.groupId)
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'success', message: 'Joined group successfully'}})
    } catch(err) {
        console.log(err);
        yield put({type: actionConstants.JOIN_GROUP_WITH_CODE_FAILURE})
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'error', message: 'Could not join group, please make sure the code is correct'}})
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