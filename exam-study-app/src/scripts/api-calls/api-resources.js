import { createFetch, base, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

async function apiCreateResource(resource) {
    return new Promise((resolve, reject) => {
        const fetchCreateResource = createFetch(
            base(API_BASE_PATH),
            method('POST'),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(resource), 'application/json'),
        );
        fetchCreateResource('/resource').then((res) => {
            res.json().then((data) => {
                resolve(data);
            })
        }).catch((err) => {
        console.log(err);
        reject(err);
        })
    })
}


async function apiGetResources(groupId) {
    return new Promise((resolve, reject) => {
        const fetchGetResource = createFetch(
            base(API_BASE_PATH),
            method("GET"),
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


async function apiGetResource(resourceId) {
    return new Promise((resolve, reject) => {
        const fetchGetResource = createFetch(
            base(API_BASE_PATH),
            method("GET"),
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



async function apiEditResource(resource) {
    return new Promise((resolve, reject) => {
        const fetchEditResource = createFetch(
            base(API_BASE_PATH),
            method("PUT"),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(resource), 'application/json'),
        )
        fetchEditResource('/resource/'+resource.resourceId).then((res) => {
            if(res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err) => 
            reject(err))
    })

}


async function apiDeleteResource(resourceId) {
    return new Promise((resolve, reject) => {
        const fetchDeleteResource = createFetch(
            base(API_BASE_PATH),
            method("DELETE")
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