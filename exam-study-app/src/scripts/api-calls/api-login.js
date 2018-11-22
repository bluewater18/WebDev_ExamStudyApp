import { createFetch, base, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

async function apiLogin(user) {
    return new Promise((resolve) => { 
        const fetch = createFetch(
            base(API_BASE_PATH),
            method('POST'),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(user), 'application/json'),
        )
        fetch('/login').then((response) => {
            response.json().then((data) => {
                resolve(data);
            });
        }).catch((err) => {
            console.log(err)
        })
    })
}

export { apiLogin };