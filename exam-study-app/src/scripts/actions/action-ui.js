import { actionConstants } from '../constants/index';
const toggleLeftDrawer = (drawerState) => {
    return {
        type: actionConstants.LEFT_DRAWER_TOGGLE,
        payload: drawerState
    }

}

const toggleResourceDrawer = (drawerState) => {
    return {
        type: actionConstants.RESOURCE_DRAWER_TOGGLE,
        payload: drawerState
    }
}

export {toggleLeftDrawer, toggleResourceDrawer};