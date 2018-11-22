import { apiLogin } from '../api-calls/api-login';
import { actionConstants } from '../constants/index';
import { push } from 'react-router-redux';
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

export function* loginSuccess(){
    try{
    yield call (history.push('/'))
    //yield put(push('/hi'));
    yield put({type: actionConstants.LOGIN_SUCCESS_POST_SAGA, payload:null});
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