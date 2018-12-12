//sagas/index
import { all, fork } from 'redux-saga/effects';
import sagaRegister from './saga-register';
import sagaLogin from './saga-login';
import sagaLogout from './saga-logout';
import sagaEditUser from './saga-edit-user';
import sagaGroups from './saga-groups';
import sagaUsers from './saga-users';
import sagaResources from './saga-resources';
import sagaQuestions from './saga-questions';
import sagaAnswers from './saga-answers';

export default function* root() {
    yield all([
        fork(sagaRegister),
        fork(sagaLogin),
        fork(sagaLogout),
        fork(sagaEditUser),
        fork(sagaGroups),
        fork(sagaUsers),
        fork(sagaResources),
        fork(sagaQuestions),
        fork(sagaAnswers),
    ])
}