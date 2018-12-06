//reducers/index
import { combineReducers } from 'redux';
import userReducer from './reducer-user';
import uiReducer from './reducer-ui';
import registerReducer from './reducer-register';
import loginReducer from './reducer-login';
import editUserReducer from './reducer-edit-user';
import createGroupReducer from './reducer-create-group';
import activeGroupReducer from './reducer-active-group';
import userGroupsReducer from './reducer-user-groups';
import notifierReducer from './reducer-notifier';
import editGroupReducer from './reducer-edit-group';
import resourceListReducer from './reducer-resource-list';
import activeResourceReducer from './reducer-active-resource';

const rootReducer = combineReducers({
    user: userReducer,
    ui: uiReducer,
    register: registerReducer,
    login: loginReducer,
    editUser: editUserReducer,
    createGroup: createGroupReducer,
    activeGroup: activeGroupReducer,
    userGroups: userGroupsReducer,
    notifier: notifierReducer,
    editGroup: editGroupReducer,
    resourceList: resourceListReducer,
    activeResource: activeResourceReducer,
    
});

export default rootReducer;