import { createFetch, base, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

async function apiRequestReset(email) {
    return new Promise((resolve, reject) => { 
        const fetch = createFetch(
            base(API_BASE_PATH),
            method('POST'),
        )
        fetch('/account/reset-password?email='+email).then((response) => {
            if(response.status >= 200 && response.status< 300)
                resolve();       
            else
                throw response;
        }).catch((err) => {
            console.log(err)
            reject()
        })
    })
}

async function apiResetPassword(payload) {
    return new Promise((resolve, reject) => { 
        const fetch = createFetch(
            base(API_BASE_PATH),
            method('PUT'),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(payload), 'application/json'),
        )
        fetch('/account/reset-password').then((response) => {
            if(response.status === 200)
                resolve();       
            else
                throw response;
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}

export { apiRequestReset, apiResetPassword};