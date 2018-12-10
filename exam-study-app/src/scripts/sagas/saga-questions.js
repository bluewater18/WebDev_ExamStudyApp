import { apiAddQuestion, apiEditQuestion, apiDeleteQuestion, apiUpvoteQuestion, apiDownvoteQuestion } from '../api-calls/api-questions';
import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest, } from 'redux-saga/effects';

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

function* deleteQuestion({payload}) {
    try{
        let questionId = payload;
        yield call(apiDeleteQuestion, questionId)
        yield put({ type: actionConstants.DELETE_QUESTION_SUCCESS, payload: questionId })
    } catch (err) {
        console.log(err)
        yield put({ type: actionConstants.DELETE_QUESTION_FAILURE })
    }
}

function* editQuestion({payload}) {
    try {
        let question = payload;
        yield call(apiEditQuestion, question)
        yield put({type:actionConstants.EDIT_QUESTION_SUCCESS})
    } catch(err) {
        console.log(err)
        yield put({type: actionConstants.EDIT_QUESTION_FAILURE})
    } 
}

function* upvoteQuestion({payload}) {
    try{
        let questionId = payload.questionId;
        let userId = payload.userId;
        yield call(apiUpvoteQuestion, questionId, userId)
        yield put({type: actionConstants.UPVOTE_QUESTION_SUCCESS})
    } catch (err) {
        console.log(err)
        yield put({type: actionConstants.UPVOTE_QUESTION_FAILURE})
    }
}

function* downvoteQuestion({payload}) {
    try{
        let questionId = payload.questionId;
        let userId = payload.userId;
        yield call(apiDownvoteQuestion, questionId, userId)
        yield put({type: actionConstants.DOWNVOTE_QUESTION_SUCCESS})
    } catch (err) {
        console.log(err)
        yield put({type: actionConstants.DOWNVOTE_QUESTION_FAILURE})
    }
}




export default function* root() {
    yield all([
        takeLatest(actionConstants.ADD_QUESTION, addQuestion),
        takeLatest(actionConstants.EDIT_QUESTION, editQuestion),
        takeLatest(actionConstants.deleteQuestion, deleteQuestion),
        takeLatest(actionConstants.UPVOTE_QUESTION, upvoteQuestion),
        takeLatest(actionConstants.DOWNVOTE_QUESTION, downvoteQuestion)

    ]);
}