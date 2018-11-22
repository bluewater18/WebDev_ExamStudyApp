//sagas/index
import { all, fork } from 'redux-saga/effects';
import sagaRegister from './saga-register';
import sagaLogin from './saga-login';

export default function* root() {
    yield all([
        fork(sagaRegister),
        fork(sagaLogin),
    ])
}