import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest } from 'redux-saga/effects';
import {apiGetAllUsers, apiAddUserToGroup} from '../api-calls/api-users'

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
        yield call(apiAddUserToGroup, payload.groupId, payload.userId)
        yield put({type: actionConstants.ADD_USER_TO_GROUP_SUCCESS, payload:null})
    } catch(err) {
        console.log(err);
        yield put({type:actionConstants.ADD_USER_TO_GROUP_FAILURE, payload: null})
    }
}

export default function* root() {
    yield all([
        takeLatest(actionConstants.GET_ALL_USERS, getAllUsers),
        takeLatest(actionConstants.ADD_USER_TO_GROUP, addUserToGroup)
    ]);
}