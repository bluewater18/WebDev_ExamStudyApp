import { apiAddQuestion } from '../api-calls/api-questions';
import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest } from 'redux-saga/effects';
import history from '../../history';

function* addQuestion({payload}) {
    try {
        let question = payload;
        let createdQuestion = yield call(apiAddQuestion, question);
        yield put({ type: actionConstants.ADD_QUESTION_SUCCESS, payload: createdQuestion });
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'success', message: 'New Question Added Successfully!'}})
        
    } catch (err) {
        console.log(err)
        yield put({ type: actionConstants.ADD_QUESTION_FAILURE})
    }
}




export default function* root() {
    yield all([
        takeLatest(actionConstants.ADD_QUESTION, addQuestion),


    ]);
}