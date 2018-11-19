//sagas/index
import { all, fork } from 'redux-saga/effects';
import sagaRegister from './saga-register'

export default function* root() {
    yield all([
        fork(sagaRegister),
    ])
}