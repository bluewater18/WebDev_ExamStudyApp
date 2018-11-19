import { createFetch, base, accept, parse, method, header, body } from 'http-client';
import { API_BASE_PATH } from '../constants/index';

function* apiRegister(user) {
    const fetch = createFetch(
        base(API_BASE_PATH),
        method('POST'),
        header('Content-Type', 'application/json'),
         body(JSON.stringify(user), 'application/json'),
    )

    fetch('/user').then((res) => {
        console.log('user created')
    }).catch((err) => {
        console.log(err)
        })
    
}

export { apiRegister };