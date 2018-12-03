import { createFetch, base, method } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

async function apiGetAllUsers() {
    return new Promise((resolve, reject)=> {
        const fetchGetAllUsers = createFetch(
            base(API_BASE_PATH),
            method("GET"),
        )
        fetchGetAllUsers('/user').then((res) => {
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

async function apiAddUserToGroup(userId, groupId) {
    return new Promise((resolve, reject) => {
        const fetchAddUserToGroup = createFetch(
            base(API_BASE_PATH),
            method("POST"),
        )
        fetchAddUserToGroup('/group/members/join?groupId=' + groupId +'&userId=' + userId +'&type=MEMBER').then((res) => {
            if(res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err)=> reject(err))
    })  
}

async function apiLeaveGroup(groupId, userId) {
    return new Promise((resolve, reject) => {
        const fetchLeaveGroup = createFetch(
            base(API_BASE_PATH),
            method("POST"),
        )
        fetchLeaveGroup('/group/members/leave?groupId='+groupId+'&userId='+userId).then((res) => {
            if (res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err) => reject(err))
    })
}



export {apiGetAllUsers, apiAddUserToGroup, apiLeaveGroup};