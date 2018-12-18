import { createFetch, base, method, header } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

async function apiGetAllUsers(token) {
    return new Promise((resolve, reject)=> {
        const fetchGetAllUsers = createFetch(
            base(API_BASE_PATH),
            method("GET"),
            header('Authorization', token),
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

async function apiAddUserToGroup(userId, groupId, token) {
    return new Promise((resolve, reject) => {
        const fetchAddUserToGroup = createFetch(
            base(API_BASE_PATH),
            method("POST"),
            header('Authorization', token),
        )
        fetchAddUserToGroup('/group/members/join?groupId=' + groupId +'&userId=' + userId +'&type=MEMBER').then((res) => {
            if(res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err)=> reject(err))
    })  
}

async function apiLeaveGroup(groupId, userId, token) {
    return new Promise((resolve, reject) => {
        const fetchLeaveGroup = createFetch(
            base(API_BASE_PATH),
            method("POST"),
            header('Authorization', token),
        )
        fetchLeaveGroup('/group/members/leave?groupId='+groupId+'&userId='+userId).then((res) => {
            if (res.status === 200)
                resolve()
            else
                reject(res)
        }).catch((err) => reject(err))
    })
}


async function apiJoinGroupWithCode(code, userId, token) {
    return new Promise((resolve, reject) => {
        const fetchJoinGroupWithCode = createFetch(
            base(API_BASE_PATH),
            method('PUT'),
            header('Authorization', token),
        )
        fetchJoinGroupWithCode('/group/member/join?code='+code +"&userId="+ userId ).then((res)=>{
            if(res.status === 200)
                res.json().then((data) =>
                    resolve(data))
            else
                reject()
        }).catch((err) =>
            reject(err)
        )
    })
}



export {apiGetAllUsers, apiAddUserToGroup, apiLeaveGroup, apiJoinGroupWithCode};