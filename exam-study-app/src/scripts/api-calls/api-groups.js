import { createFetch, base, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

async function apiCreateGroup(group) {
    return new Promise((resolve, reject) => {
        const fetchCreateGroup = createFetch(
            base(API_BASE_PATH),
            method(POST),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(group), 'application/json'),
        );
        fetchCreateGroup('/group').then((res) => {
            res.json().then((data) => {
                resolve(data);
            })
        }).catch((err) => {
        console.log(err);
        reject(err);
        })
    })
}

export {apiCreateGroup};