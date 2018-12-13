import { apiAddAnswer, apiEditAnswer, apiDeleteAnswer, apiUpvoteAnswer, apiDownvoteAnswer } from '../api-calls/api-answers';
import { apiUpdatePhoto } from '../api-calls/api-edit-user';
import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest, } from 'redux-saga/effects';

function* addAnswer({payload}) {
    try {
        let answer = payload;
        let createdAnswer = yield call(apiAddAnswer, answer);
        if(answer.image !== null && answer.image !== undefined){
            let createdPhoto = yield call(apiUpdatePhoto, answer.image, createdAnswer.answerId, "answer" )
            createdAnswer.questionImageName = createdPhoto.AnswerPhotoPath;
        }
        
        yield put({ type: actionConstants.ADD_ANSWER_SUCCESS, payload: createdAnswer });
        yield put({ type: actionConstants.SHOW_NOTIFIER, payload:{type: 'success', message: 'New Answer Added Successfully!'}})
        
    } catch (err) {
        console.log(err)
        yield put({ type: actionConstants.ADD_ANSWER_FAILURE})
    }
}

function* deleteAnswer({payload}) {
    try{
        let answerId = payload.answerId;
        let questionId = payload.questionId;
        yield call(apiDeleteAnswer, answerId)
        yield put({ type: actionConstants.DELETE_ANSWER_SUCCESS, payload: {answerId: answerId, questionId: questionId} })
    } catch (err) {
        console.log(err)
        yield put({ type: actionConstants.DELETE_ANSWER_FAILURE })
    }
}

function* editAnswer({payload}) {
    try {
        let answer = payload;
        let updatedAnswer = yield call(apiEditAnswer, answer)
        if(answer.image !== null && answer.image !== undefined) {
            let updatedPhoto = yield call(apiUpdatePhoto, answer.image, updatedAnswer.answerId, "answer" )
            updatedAnswer.questionImageName = updatedPhoto.AnswerPhotoPath;
        }
        yield put({type:actionConstants.EDIT_ANSWER_SUCCESS, payload: updatedAnswer})
    } catch(err) {
        console.log(err)
        yield put({type: actionConstants.EDIT_ANSWER_FAILURE})
    } 
}

function* upvoteAnswer({payload}) {
    try{
        let answerId = payload.answerId;
        let userId = payload.userId;
        let questionId = payload.questionId
        yield call(apiUpvoteAnswer, answerId, userId)
        yield put({type: actionConstants.UPVOTE_ANSWER_SUCCESS, payload: {answerId: answerId, questionId: questionId}})
    } catch (err) {
        console.log(err)
        yield put({type: actionConstants.UPVOTE_ANSWER_FAILURE})
    }
}

function* downvoteAnswer({payload}) {
    try{
        let answerId = payload.answerId;
        let userId = payload.userId;
        let questionId = payload.questionId;
        yield call(apiDownvoteAnswer, answerId, userId)
        yield put({type: actionConstants.DOWNVOTE_ANSWER_SUCCESS, payload: {answerId: answerId, questionId: questionId}})
    } catch (err) {
        console.log(err)
        yield put({type: actionConstants.DOWNVOTE_ANSWER_FAILURE})
    }
}



export default function* root() {
    yield all([
        takeLatest(actionConstants.ADD_ANSWER, addAnswer),
        takeLatest(actionConstants.EDIT_ANSWER, editAnswer),
        takeLatest(actionConstants.DELETE_ANSWER, deleteAnswer),
        takeLatest(actionConstants.UPVOTE_ANSWER, upvoteAnswer),
        takeLatest(actionConstants.DOWNVOTE_ANSWER, downvoteAnswer),
    ]);
}