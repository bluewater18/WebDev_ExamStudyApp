
import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest } from 'redux-saga/effects';
import history from '../../history';
import { apiRequestReset, apiResetPassword } from '../api-calls/api-reset-password';

function* requestReset({ payload }) {
    try {
        yield call( history.push, '/' );
        yield put({ type: actionConstants.SHOW_NOTIFIER, payload:{type:"info", message:"An email directing you on how to reset your password is being prepared"}})
        yield call( apiRequestReset, payload.email );
        yield put({ type: actionConstants.REQUEST_RESET_PASSWORD_SUCCESS});
        yield put({ type: actionConstants.SHOW_NOTIFIER, payload:{type:"success", message:"Email has been sent"}})

    } catch (err) {
        yield put({ type: actionConstants.REQUEST_RESET_PASSWORD_FAILURE});
        yield put({ type: actionConstants.SHOW_NOTIFIER, payload:{type:"error", message:"Error Sending Email, please check the email adress was correct"}})
        
    }
}

function* resetPassword({ payload }){
    try {
        yield call(apiResetPassword, payload);
        yield put({ type: actionConstants.RESET_PASSWORD_SUCCESS});
        yield call( history.push, '/login' );
        yield put({ type: actionConstants.SHOW_NOTIFIER, payload:{type:"success", message:"password changed successfully. Please log in to continue"}})
    } catch (err) {
        yield put({ type: actionConstants.RESET_PASSWORD_FAILURE, payload: null });
    }
}
export default function* root() {
    yield all([
        takeLatest(actionConstants.REQUEST_RESET_PASSWORD, requestReset),
        takeLatest(actionConstants.RESET_PASSWORD, resetPassword),
    ]);
}