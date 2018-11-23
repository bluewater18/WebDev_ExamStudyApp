import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest } from 'redux-saga/effects';
import history from '../../history';

export function* logout() {
    yield put({ type: actionConstants.LOGOUT_USER, payload: null });
    yield call(history.push,'/');
}

export default function* root() {
    yield all([
        takeLatest(actionConstants.LOGOUT, logout),
    ]);
}