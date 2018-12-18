import { createFetch, base, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

async function apiCreateResource(resource, token) {
    return new Promise((resolve, reject) => {
        const fetchCreateResource = createFetch(
            base(API_BASE_PATH),
            method('POST'),
            header('Authorization', token),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(resource), 'application/json'),
        );
        fetchCreateResource('/resource').then((res) => {
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


async function apiGetResources(groupId, token) {
    return new Promise((resolve, reject) => {
        const fetchGetResource = createFetch(
            base(API_BASE_PATH),
            method("GET"),
            header('Authorization', token),
        )
        
        fetchGetResource('/resource?groupId='+groupId).then((res) => {
            if(res.status === 200)
                res.json().then((data)=>
                    resolve(data))
            else
                reject(res)
        }).catch((err) => {
            reject(err)
        })
    })
}


async function apiGetResource(resourceId, token) {
    return new Promise((resolve, reject) => {
        const fetchGetResource = createFetch(
            base(API_BASE_PATH),
            method("GET"),
            header('Authorization', token),
        )

        fetchGetResource('/resource/'+resourceId).then((res) => {
            if(res.status === 200)
                res.json().then((data)=>
                    resolve(data))
            else
                reject(res)
        }).catch((err) => 
            reject(err))
    })
}



async function apiEditResource(resource, token) {
    return new Promise((resolve, reject) => {
        const fetchEditResource = createFetch(
            base(API_BASE_PATH),
            method("PUT"),
            header('Authorization', token),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(resource), 'application/json'),
        )
        fetchEditResource('/resource/'+resource.resourceId).then((res) => {
            if(res.status === 200)
                res.json().then((data)=>
                    resolve(data))
            else
                reject(res)
        }).catch((err) => 
            reject(err))
    })

}


async function apiDeleteResource(resourceId, token) {
    return new Promise((resolve, reject) => {
        const fetchDeleteResource = createFetch(
            base(API_BASE_PATH),
            method("DELETE"),
            header('Authorization', token),
        )

        fetchDeleteResource('/resource/'+resourceId).then((res) => {
            if(res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err) => reject(err))
    })
}



export {apiCreateResource, apiDeleteResource, apiEditResource, apiGetResources, apiGetResource};