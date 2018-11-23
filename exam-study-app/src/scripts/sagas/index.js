//sagas/index
import { all, fork } from 'redux-saga/effects';
import sagaRegister from './saga-register';
import sagaLogin from './saga-login';
import sagaLogout from './saga-logout';

export default function* root() {
    yield all([
        fork(sagaRegister),
        fork(sagaLogin),
        fork(sagaLogout),
    ])
}