import { apiRegister } from '../api-calls/api-register';
import { actionConstants } from '../constants/index'
import { call, all, put, takeLatest } from 'redux-saga/effects';

export function* registerUser({ payload }) {
    try {
        console.log('a');
        let user = yield call(apiRegister, payload);
        console.log("returned from api: " + user);
        yield put({ type: actionConstants.REGISTER_SUCCESS, payload: user });
    } catch (err) {
        yield put({ type: actionConstants.REGISTER_FAILURE })
    }
}

export default function* root() {
    yield all([
        takeLatest(actionConstants.REGISTER_COMPLETE, registerUser),
    ]);
}