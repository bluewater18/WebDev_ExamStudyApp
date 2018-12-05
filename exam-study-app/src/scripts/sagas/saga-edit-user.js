import { apiUpdateUser, apiUpdatePhoto } from '../api-calls/api-edit-user';
import { actionConstants } from '../constants/index'
import { call, all, put, takeLatest } from 'redux-saga/effects';
import history from '../../history';

export function* editUser({ payload }) {
    try {
        console.log(payload.userDetails);
        payload.userDetails.UserId = payload.userId;
        let photo = payload.photo;
        payload.userDetails.UserPhoto = null;
        let user = yield call(apiUpdateUser, payload.userDetails);
        console.log(user)
        console.log(photo)
    
        if(payload.photo!== null && photo !== null && photo !== undefined){
            console.log(photo)
            let res = yield call(apiUpdatePhoto, photo, payload.userId, 'user');
            user.userImageName = res.UserPhotoPath;
            
        }
        
        yield put({ type: actionConstants.EDIT_USER_SUCCESS, payload: user });
        yield put({type:actionConstants.EDIT_USER_RESET_FIELDS})

    } catch (err) {
        yield put({ type: actionConstants.EDIT_USER_FAILURE })
    }
}

export function* editSuccess({ payload }) {
    try{
        yield call (history.push,'/')
        yield put({type: actionConstants.EDIT_USER_SUCCESS_POST_SAGA, payload: payload});
        yield put({type: actionConstants.LEFT_DRAWER_TOGGLE, payload:true})
    }catch(err){
            console.log(err)
    }
}

export default function* root() {
    yield all([
        takeLatest(actionConstants.EDIT_USER_COMPLETE, editUser),
        takeLatest(actionConstants.EDIT_USER_SUCCESS, editSuccess)
    ]);
}