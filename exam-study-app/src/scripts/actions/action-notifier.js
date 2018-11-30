import { actionConstants } from '../constants/index';

const closeNotifier = () => {
    return {
        type: actionConstants.CLOSE_NOTIFIER,
    }
}


export { closeNotifier, };