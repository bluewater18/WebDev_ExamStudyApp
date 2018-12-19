import { apiRegister } from '../api-calls/api-register';
import { apiUpdatePhoto } from '../api-calls/api-edit-user';
import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest } from 'redux-saga/effects';
import history from '../../history';

export function* registerUser({ payload }) {
    try {
        let user = yield call(apiRegister, payload);
        try{
            let id = user.userId;
            let photo = payload.UserPhoto;
            let apiPhoto = yield call(apiUpdatePhoto, photo, id, "user");
            user.userImageName = apiPhoto.UserPhotoPath;
        }catch(err){console.log(err)}
        yield put({ type: actionConstants.REGISTER_SUCCESS, payload: user });
        yield put({type:actionConstants.REGISTER_STEPPER_RESET})
        yield put({type:actionConstants.REGISTER_STEPPER_RESET_FIELDS})

    } catch (err) {
        yield put({ type: actionConstants.REGISTER_FAILURE })
    }
}

export function* registerSuccess({ payload }) {
    try{
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'success', message: 'Welcome ' +payload.UserName + ' you have registered successfully'}})
        yield call (history.push,'/')
        yield put({type: actionConstants.REGISTER_SUCCESS_POST_SAGA, payload: payload});
        yield put({type: actionConstants.LEFT_DRAWER_TOGGLE, payload:true})
    }catch(err){
            console.log(err)
    }
}

export default function* root() {
    yield all([
        takeLatest(actionConstants.REGISTER_COMPLETE, registerUser),
        takeLatest(actionConstants.REGISTER_SUCCESS, registerSuccess)
    ]);
}