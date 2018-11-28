import apiCreateGroup from '../api-calls/api-groups';
import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest } from 'redux-saga/effects';
import history from '../../history';

export function* createGroup({ payload }) {
    try {
        //Call create group api
        
        yield put({ type: actionConstants.CREATE_GROUP_SUCCESS, payload: group });
        yield put({type:actionConstants.CREATE_GROUP_RESET_FIELDS})

    } catch (err) {
        yield put({ type: actionConstants.EDIT_USER_FAILURE })
    }
}

export function* createGroupSuccess(id) {
    yield call (history.push,'/group/'+id);      
}


export default function* root() {
    yield all([
        takeLatest(actionConstants.CREATE_GROUP_COMPLETE, createGroup),
        takeLatest(actionConstants.CREATE_GRIUP_SUCCESS, createGroupSuccess)
    ]);
}