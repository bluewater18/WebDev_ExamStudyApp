import { createFetch, base, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

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


export {apiAddQuestion, apiEditQuestion};