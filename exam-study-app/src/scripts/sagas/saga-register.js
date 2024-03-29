﻿import { apiRegister, apiUpdatePhoto } from '../api-calls/api-register';
import { actionConstants } from '../constants/index'
import { call, all, put, takeLatest } from 'redux-saga/effects';
import history from '../../history';

export function* registerUser({ payload }) {
    try {
        let user = yield call(apiRegister, payload);
        try{
            let id = user.userId;
            let photo = payload.UserPhoto;
            let apiPhoto = yield call(apiUpdatePhoto, photo, id);
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