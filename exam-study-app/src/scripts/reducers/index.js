//reducers/index
import { combineReducers } from 'redux';
import userReducer from './reducer-user';
import uiReducer from './reducer-ui';
import registerReducer from './reducer-register';
import loginReducer from './reducer-login';
import editUserReducer from './reducer-edit-user';


const rootReducer = combineReducers({
    user: userReducer,
    ui: uiReducer,
    register: registerReducer,
    login: loginReducer,
    editUser: editUserReducer,
});

export default rootReducer;