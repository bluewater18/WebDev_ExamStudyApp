﻿//constants/index
const API_BASE_PATH = 'http://localhost:52940/api'

const actionConstants = {
    LOGIN_SUCCESS: "LOG_IN_SUCCESS",
    LOGIN_FAILURE: "LOG_IN_FAILURE",
    REGISTER_STEPPER_CHANGE: "REGISTER_STEPPER_CHANGE",
    LEFT_DRAWER_TOGGLE: "LEFT_DRAWER_TOGGLE",
    REGISTER_USER: "REGISTER_USER",
    REGISTER_NAME_UPDATE: "REGISTER_NAME_UPDATE",
    REGISTER_EMAIL_UPDATE: "REGISTER_EMAIL_UPDATE",
    REGISTER_PASSWORD_UPDATE: "REGISTER_PASSWORD_UPDATE",
    REGISTER_COMPLETE: "REGISTER_COMPLETE",
};

export { actionConstants, API_BASE_PATH };