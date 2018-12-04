import { createFetch, base, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

async function apiCreateGroup(group) {
    console.log('creating group call')
    return new Promise((resolve, reject) => {
        const fetchCreateGroup = createFetch(
            base(API_BASE_PATH),
            method('POST'),
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

async function apiUpdateGroupPhoto(photo, id) {
    return new Promise((resolve, reject)=> {
        var formData = new FormData();
        formData.append('image', photo);
        const options = {
            method: 'POST',
            body: formData,
        }

        fetch(API_BASE_PATH+'/photos/'+id + '?pathType=group', options).then((response) => {
            if(response.status === 201)
                response.json().then((data) => {
                        resolve(data.groupPhotoPath);       
                });
            else
                reject(response);
        })

    })
}

async function apiGetGroup(groupId) {
    return new Promise((resolve, reject) => {
        const fetchGetGroup = createFetch(
            base(API_BASE_PATH),
            method("GET"),
        )
        
        fetchGetGroup('/group/'+groupId).then((res) => {
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

async function apiGetAllGroups() {
    return new Promise((resolve, reject)=> {
        const fetchGetAllGroups = createFetch(
            base(API_BASE_PATH),
            method("GET"),
        )
        fetchGetAllGroups('/group').then((res) => {
            if(res.status === 200)
                res.json().then((data) =>
                resolve(data))
            else
                reject(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

async function apiGetUserGroups({payload}) {
    return new Promise((resolve, reject) => {
        const fetchGetUserGroups = createFetch(
            base(API_BASE_PATH),
            method("GET"),
        )
        fetchGetUserGroups('/group/joined?userId='+payload).then((res) =>{
            if(res.status === 200)
                res.json().then((data) =>
                resolve(data))
            else
                reject(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

async function apiGetMembersFromGroup( groupId) { 
    return new Promise((resolve, reject) => {
        const fetchGetMembersFromGroup = createFetch(
            base(API_BASE_PATH),
            method("GET")
        )
        fetchGetMembersFromGroup('/group/members/'+groupId).then((res) =>{
            if(res.status === 200)
                res.json().then((data) =>
                    resolve(data))
            else 
                reject(res)
        }).catch((err) =>
            reject(err)
        )
    })
}

async function apiEditGroup(group) {
    return new Promise((resolve, reject) => {
        const fetchEditGroup = createFetch(
            base(API_BASE_PATH),
            method("PUT"),
            header('Content-Type', 'application/json'),
            body(JSON.stringify(group), 'application/json'),
        )
        fetchEditGroup('/group/'+group.groupId).then((res) => {
            if(res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err) => 
            reject(err))
    })

}


async function apiDeleteGroup(groupId) {
    return new Promise((resolve, reject) => {
        const fetchDeleteGroup = createFetch(
            base(API_BASE_PATH),
            method("DELETE")
        )

        fetchDeleteGroup('/group/'+groupId).then((res) => {
            if(res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err) => reject(err))
    })
}



export {apiCreateGroup, apiUpdateGroupPhoto, apiGetGroup, apiGetAllGroups, apiGetUserGroups, apiGetMembersFromGroup, apiEditGroup, apiDeleteGroup,};