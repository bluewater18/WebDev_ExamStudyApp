//reducers/index
import { combineReducers } from 'redux';
import userReducer from './reducer-user';
import uiReducer from './reducer-ui';
import registerReducer from './reducer-register';
import loginReducer from './reducer-login';


const rootReducer = combineReducers({
    user: userReducer,
    ui: uiReducer,
    register: registerReducer,
    login: loginReducer,
});

export default rootReducer;