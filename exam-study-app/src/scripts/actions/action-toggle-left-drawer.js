import { actionConstants } from '../constants/index';
const toggleLeftDrawer = (drawerState) => {
    return {
        type: actionConstants.LEFT_DRAWER_TOGGLE,
        payload: drawerState
    }
}

export default toggleLeftDrawer;