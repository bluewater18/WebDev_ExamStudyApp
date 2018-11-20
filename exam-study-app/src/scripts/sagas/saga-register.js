import { apiRegister } from '../api-calls/api-register';
import { takeLatest } from 'redux-saga';
import { actionConstants } from '../constants/index'
import { call, all, put } from 'redux-saga/effects';

export function* registerUser({ payload }) {
    try {
        console.log('a')
        let token = yield call(apiRegister, payload)
        yield put({ type: actionConstants.REGISTER_SUCCESS, payload: token })
    } catch(err) {
        console.log (err)
    }
}

export default function* root() {
    yield all([
        takeLatest(actionConstants.REGISTER_COMPLETE, registerUser),
    ])
}