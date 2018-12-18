import { apiAddQuestion, apiEditQuestion, apiDeleteQuestion, } from '../api-calls/api-questions';
import { apiUpdatePhoto } from '../api-calls/api-edit-user';
import { actionConstants } from '../constants/index';
import { call, all, put, takeLatest, select} from 'redux-saga/effects';

function* addQuestion({payload}) {
    try {
        let user = yield select((state) => state.user)
        let question = payload;
        let createdQuestion = yield call(apiAddQuestion, question, user.token);
        if(question.image !==  null && question.image !== undefined){
            let createdPhoto = yield call(apiUpdatePhoto, question.image, createdQuestion.questionId, "question" )
            createdQuestion.questionImageName = createdPhoto.QuestionPhotoPath;
        }
        
        yield put({ type: actionConstants.ADD_QUESTION_SUCCESS, payload: createdQuestion });
        yield put({type: actionConstants.SHOW_NOTIFIER, payload:{type: 'success', message: 'New Question Added Successfully!'}})
        
    } catch (err) {
        console.log(err)
        yield put({ type: actionConstants.ADD_QUESTION_FAILURE})
    }
}

function* deleteQuestion({payload}) {
    try{
        let user = yield select((state) => state.user)
        let questionId = payload;
        yield call(apiDeleteQuestion, questionId, user.token)
        yield put({ type: actionConstants.DELETE_QUESTION_SUCCESS, payload: questionId })
    } catch (err) {
        console.log(err)
        yield put({ type: actionConstants.DELETE_QUESTION_FAILURE })
    }
}

function* editQuestion({payload}) {
    try {
        let user = yield select((state) => state.user)
        let question = payload;
        let updatedQuestion = yield call(apiEditQuestion, question, user.token)
        if(question.image !==  null && question.image !== undefined){
            let updatedPhoto = yield call(apiUpdatePhoto, question.image, updatedQuestion.questionId, "question" )
            updatedQuestion.questionImageName = updatedPhoto.QuestionPhotoPath;
        }
        
        yield put({type:actionConstants.EDIT_QUESTION_SUCCESS, payload: updatedQuestion})
    } catch(err) {
        console.log(err)
        yield put({type: actionConstants.EDIT_QUESTION_FAILURE})
    } 
}


export default function* root() {
    yield all([
        takeLatest(actionConstants.ADD_QUESTION, addQuestion),
        takeLatest(actionConstants.EDIT_QUESTION, editQuestion),
        takeLatest(actionConstants.DELETE_QUESTION, deleteQuestion),
    ]);
}