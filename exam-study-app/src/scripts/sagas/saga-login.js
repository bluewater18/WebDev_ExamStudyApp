import { apiLogin } from '../api-calls/api-login';
import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest } from 'redux-saga/effects';
import history from '../../history';

export function* loginUser({ payload }) {
    try {
        let user = yield call(apiLogin, payload);
        yield put({ type: actionConstants.LOGIN_SUCCESS, payload: user });
    } catch (err) {
        yield put({ type: actionConstants.LOGIN_FAILURE, paylod: null });
    }
}

export function* loginSuccess({ payload }){
    try{
    yield call (history.push,'/');
    yield put({type: actionConstants.LOGIN_SUCCESS_POST_SAGA, payload: payload});
    yield put({type: actionConstants.LEFT_DRAWER_TOGGLE, payload:true})
    }catch(err){
        console.log(err)
    }
}
export default function* root() {
    yield all([
        takeLatest(actionConstants.LOGIN_SUBMIT, loginUser),
        takeLatest(actionConstants.LOGIN_SUCCESS, loginSuccess),
    ]);
}