import { createFetch, base, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

async function apiRegister(user) {
    return new Promise((resolve) => { 
        const fetch = createFetch(
            base(API_BASE_PATH),
            method('POST'),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(user), 'application/json'),
        )
        fetch('/user').then((response) => {
            response.json().then((data) => {
                resolve(data);
            });
        }).catch((err) => {
            console.log(err)
        })
    })
}

async function apiUpdatePhoto(photo, id) {
    return new Promise((resolve, reject)=> {
        const data = new URLSearchParams();
        var formData = new FormData();
        formData.append('img', photo);
        formData.append('type', "user");
        for(const pair of formData){
            data.append(pair[0],pair[1]);
        }
        
        const fetch = createFetch(
            base(API_BASE_PATH),
            method('POST'),
            body(data),
        )
        fetch('/photos/'+id).then((response) => {
            if(response.status == 201)
                response.json().then((data) => {
                        resolve(data);       
                });
            else
                reject(response);
        })

    })
}

export { apiRegister, apiUpdatePhoto };