import { createFetch, base, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

async function apiAddAnswer(answer) {
    return new Promise((resolve, reject) => {
        const fetchAddAnswer = createFetch(
            base(API_BASE_PATH),
            method('POST'),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(answer), 'application/json'),
        );
        fetchAddAnswer('/resource/question/'+answer.questionId+"/answer").then((res) => {
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


async function apiEditAnswer(answer) {
    return new Promise((resolve, reject) => {
        const fetchEditAnswer = createFetch(
            base(API_BASE_PATH),
            method("PUT"),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(answer), 'application/json'),
        )
        fetchEditAnswer('/resource/question/answer/'+answer.answerId).then((res) => {
            if(res.status === 200)
                res.json().then((data) => {
                    resolve(data);
                })
            else
                reject(res)
        }).catch((err) => 
            reject(err))
    })

}

async function apiDeleteAnswer(answerId) {
    return new Promise((resolve, reject) => {
        const fetchDeleteAnswer =  createFetch(
            base(API_BASE_PATH),
            method("DELETE"),
        )
        fetchDeleteAnswer('/resource/question/answer'+answerId).then((res) => {
            if(res.status === 200)
                resolve()
            else 
                reject(res)
        }).catch((err) =>
            reject(err))
    })
}

async function apiUpvoteAnswer(answerId) {
    return new Promise((resolve, reject) => {
        const fetchUpvoteAnswer = createFetch(
            base(API_BASE_PATH),
            method("POST"),
        )
        fetchUpvoteAnswer('/resource/question/answer/upvote/'+answerId).then((res) => {
            if(res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err) => 
            reject(err))
    })  
}


async function apiDownvoteAnswer(answerId) {
    return new Promise((resolve, reject) => {
        const fetchDownvoteAnswer = createFetch(
            base(API_BASE_PATH),
            method("POST"),
        )
        fetchDownvoteAnswer('/resource/answer/downvote/'+answerId).then((res) => {
            if(res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err) => 
            reject(err))
    })  
}

export {apiAddAnswer, apiEditAnswer, apiDeleteAnswer, apiUpvoteAnswer, apiDownvoteAnswer};