import { createFetch, base, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';
import { promises } from 'fs';

async function apiAddQuestion(question) {
    return new Promise((resolve, reject) => {
        const fetchAddQuestion = createFetch(
            base(API_BASE_PATH),
            method('POST'),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(question), 'application/json'),
        );
        fetchAddQuestion('/resource/'+question.resourceId+'/question').then((res) => {
            if(res.status === 201)
                res.json().then((data) => {
                    resolve(data);
            })
            else
                reject(res)
        }).catch((err) => {
        console.log(err);
        reject(err);
        })
    })
}


async function apiEditQuestion(question) {
    return new Promise((resolve, reject) => {
        const fetchEditQuestion = createFetch(
            base(API_BASE_PATH),
            method("PUT"),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(question), 'application/json'),
        )
        fetchEditQuestion('/resource/'+question.resourceId+'/qusetion/'+question.questionId).then((res) => {
            if(res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err) => 
            reject(err))
    })

}

async function apiDeleteQuestion( questionId) {
    return new Promise((resolve, reject) => {
        const fetchDeleteQuestion =  createFetch(
            base(API_BASE_PATH),
            method("DELETE"),
        )
        fetchDeleteQuestion('/resource/question/'+questionId).then((res) => {
            if(res.status === 200)
                resolve()
            else 
                reject(res)
        }).catch((err) =>
            reject(err))
    })
}

async function apiUpvoteQuestion(questionId) {
    return new Promise((resolve, reject) => {
        const fetchUpvoteQuestion = createFetch(
            base(API_BASE_PATH),
            method("POST"),
        )
        fetchUpvoteQuestion('/resource/question/upvote/'+questionId).then((res) => {
            if(res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err) => 
            reject(err))
    })  
}


async function apiDownvoteQuestion(questionId) {
    return new Promise((resolve, reject) => {
        const fetchDownvoteQuestion = createFetch(
            base(API_BASE_PATH),
            method("POST"),
        )
        fetchDownvoteQuestion('/resource/question/downvote/'+questionId).then((res) => {
            if(res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err) => 
            reject(err))
    })  
}

export {apiAddQuestion, apiEditQuestion, apiDeleteQuestion, apiUpvoteQuestion, apiDownvoteQuestion};