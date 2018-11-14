//reducers/index
import { combineReducers } from 'redux';
import userReducer from './reducer-user';
import uiReducer from './reducer-ui'


const rootReducer = combineReducers({
    user: userReducer,
    ui: uiReducer,
});

export default rootReducer;