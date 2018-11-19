import { apiRegister } from '../api-calls/api-register';
import { takeLatest } from 'redux-saga';
import { actionConstants } from '../constants/index'
import { call, all } from 'redux-saga/effects';

export function* registerUser({ payload }) {
    try {
        console.log('a')
        yield call(apiRegister, payload)
        console.log('b')
    } catch(err) {
        console.log (err)
    }
}

export default function* root() {
    yield all([
        takeLatest(actionConstants.REGISTER_COMPLETE, registerUser),
    ])
}