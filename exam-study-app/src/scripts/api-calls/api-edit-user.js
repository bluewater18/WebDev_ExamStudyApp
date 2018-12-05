import { createFetch, base, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

async function apiUpdateUser(user) {
    return new Promise((resolve) => { 
        const fetch = createFetch(
            base(API_BASE_PATH),
            method('PATCH'),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(user), 'application/json'),
        )
        fetch('/user/'+user.UserId).then((response) => {
            response.json().then((data) => {
                resolve(data);
            });
        }).catch((err) => {
            console.log(err)
        })
    })
}

async function apiUpdatePhoto(photo, id, type) {
    return new Promise((resolve, reject)=> {
        var formData = new FormData();
        formData.append('image', photo);
        const options = {
            method: 'POST',
            body: formData,
        }

        fetch(API_BASE_PATH+'/photos/'+id + '?pathType='+type, options).then((response) => {
            if(response.status === 201)
                response.json().then((data) => {
                        resolve(data);       
                });
            else
                reject(response);
        })

    })
}

export { apiUpdateUser, apiUpdatePhoto };