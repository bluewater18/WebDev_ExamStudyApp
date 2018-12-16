import { createFetch, base, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

async function apiLogin(user) {
    return new Promise((resolve, reject) => { 
        const fetch = createFetch(
            base(API_BASE_PATH),
            method('POST'),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(user), 'application/json'),
        )
        fetch('/account/login').then((response) => {
            if(response.status >= 200 && response.status< 300)
                response.json().then((data) => {
                        resolve(data);       
                });
            else
                throw response;
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}

export { apiLogin };