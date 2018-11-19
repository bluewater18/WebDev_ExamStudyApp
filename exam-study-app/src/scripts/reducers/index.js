//reducers/index
import { combineReducers } from 'redux';
import userReducer from './reducer-user';
import uiReducer from './reducer-ui';
import registerReducer from './reducer-register';


const rootReducer = combineReducers({
    user: userReducer,
    ui: uiReducer,
    register: registerReducer,
});

export default rootReducer;