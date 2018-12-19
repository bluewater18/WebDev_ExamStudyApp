import { apiUpdateUser, apiUpdatePhoto } from '../api-calls/api-edit-user';
import { actionConstants } from '../constants/index'
import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import history from '../../history';

export function* editUser({ payload }) {
    try {
        let user = yield select((state) => state.user)
        payload.userDetails.UserId = payload.userId;
        let photo = payload.photo;
        payload.userDetails.UserPhoto = null;
        let editedUser = yield call(apiUpdateUser, payload.userDetails, user.token);

    
        if(payload.photo!== null && photo !== null && photo !== undefined){
            console.log(photo)
            let res = yield call(apiUpdatePhoto, photo, payload.userId, 'user');
            editedUser.userImageName = res.UserPhotoPath;
            
        }
        yield put({ type: actionConstants.SHOW_NOTIFIER, payload:{type:"success", message:"Edited details successsfully"}})
        yield put({ type: actionConstants.EDIT_USER_SUCCESS, payload: editedUser });
        yield put({type:actionConstants.EDIT_USER_RESET_FIELDS})

    } catch (err) {
        yield put({ type: actionConstants.EDIT_USER_FAILURE })
        yield put({ type: actionConstants.SHOW_NOTIFIER, payload:{type:"error", message:"Details could not be edited"}})
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