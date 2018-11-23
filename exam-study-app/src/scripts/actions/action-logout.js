import {actionConstants} from '../constants/index';

const logout = () => {
    return {
        type: actionConstants.LOGOUT,
        payload: null
    }
}

export default logout;