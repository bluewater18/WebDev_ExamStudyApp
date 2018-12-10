﻿//constants/index
const SERVER_PATH = 'http://localhost:52940';
const API_BASE_PATH = SERVER_PATH + '/api';
const IMAGE_PATH = SERVER_PATH + '/images/';

const groupTypes = {
    EXAM_STUDY: "Exam Study",
    STUDY_SESSIONS: "Study Sessions",
    ASSIGNMENT_HELP: "Assignment Help",
}

const actionConstants = {
    //API RETURNS
    //LOGIN
    LOGIN_EMAIL_UPDATE: "LOGIN_EMAIL_UPDATE",
    LOGIN_PASSWORD_UPDATE: "LOGIN_PASSWORD_UPDATE",
    LOGIN_SUBMIT: "LOGIN_SUBMIT",
    LOGOUT: "LOGOUT",
    LOGOUT_USER:"LOGOUT_USER",
    LOGIN_SUCCESS: "LOG_IN_SUCCESS",
    LOGIN_SUCCESS_POST_SAGA: "LOG_IN_SUCCESS_POST_SAGA",
    LOGIN_FAILURE: "LOG_IN_FAILURE",
    LOGIN_FAILURE_POST_SAGA: "LOG_IN_FAILURE_POST_SAGA",

    EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
    EDIT_USER_SUCCESS_POST_SAGA: "EDIT_USER_SUCCESS_POST_SAGA",
    EDIT_USER_FAILURE: "EDIT_USER_FAILURE",
    EDIT_USER_FAILURE_POST_SAGA: "EDIT_USER_FAILURE_POST_SAGA",

    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_SUCCESS_POST_SAGA: "REGISTER_SUCCESS_POST_SAGA",
    REGISTER_FAILURE: "REGITSER_FAILURE",
    REGITSER_FAILURE_POST_SAGA: "REGITSER_FAILURE_POST_SAGA",


    //API CALLS
    REGISTER_USER: "REGISTER_USER",

    //UI
    LEFT_DRAWER_TOGGLE: "LEFT_DRAWER_TOGGLE",
    LEFT_DRAWER_TOGGLE_PS: "LEFT_DRAWER_TOGGLE_PS",
    RESOURCE_DRAWER_TOGGLE: "RESOURCE_DRAWER_TOGGLE",
    RESOURCE_DRAWER_TOGGLE_PS: "RESOURCE_DRAWER_TOGGLE_PS",
    EDIT_USER_MODAL_TOGGLE: "EDIT_USER_MODAL_TOGGLE",
    
    //REGISTRATION
    REGISTER_NAME_UPDATE: "REGISTER_NAME_UPDATE",
    REGISTER_EMAIL_UPDATE: "REGISTER_EMAIL_UPDATE",
    REGISTER_PASSWORD_UPDATE: "REGISTER_PASSWORD_UPDATE",
    REGISTER_IMAGE_UPDATE: "REGISTER_IMAGE_UPDATE",
    REGISTER_STEPPER_CHANGE: "REGISTER_STEPPER_CHANGE",
    REGISTER_STEPPER_RESET: "REGISTER_STEPPER_RESET",
    REGISTER_STEPPER_RESET_FIELDS: "REGISTER_STEPPER_RESET_FIELDS",
    REGISTER_COMPLETE: "REGISTER_COMPLETE",

    //EDIT USER
    EDIT_USER_NAME_UPDATE: "EDIT_USER_NAME_UPDATE",
    EDIT_USER_EMAIL_UPDATE: "EDIT_USER_EMAIL_UPDATE",
    EDIT_USER_PASSWORD_UPDATE: "EDIT_USER_PASSWORD_UPDATE",
    EDIT_USER_IMAGE_UPDATE: "EDIT_USER_IMAGE_UPDATE",
    EDIT_USER_STEPPER_CHANGE: "EDIT_USER_STEPPER_CHANGE",
    EDIT_USER_RESET_FIELDS: "EDIT_USER_RESET_FIELDS",
    EDIT_USER_COMPLETE: "EDIT_USER_COMPLETE",



    //CREATE GROUP
    CREATE_GROUP_NAME: "CREATE_GROUP_NAME",
    CREATE_GROUP_DESCRIPTION: "CREATE_GROUP_DESCRIPTION",
    CREATE_GROUP_TYPE: "CREATE_GROUP_TYPE",
    CREATE_GROUP_OWNER: "CREATE_GROUP_OWNER",
    CREATE_GROUP_IMAGE: "CREATE_GROUP_IMAGE",
    CREATE_GROUP_RESET_FIELDS: "CREATE_GROUP_RESET_FIELDS",
    CREATE_GROUP_COMPLETE: "CREATE_GROUP_COMPLETE",
    CREATE_GROUP_SUCCESS: "CREATE_GROUP_SUCCESS",
    CREATE_GROUP_FAILURE: "CREATE_GROUP_FAILURE",

    //EDIT GROUP
    EDIT_GROUP_INIT: "EDIT_GROUP_INIT",
    EDIT_GROUP_INIT_PS: "EDIT_GROUP_INIT_PS",
    EDIT_GROUP_NAME: "EDIT_GROUP_NAME",
    EDIT_GROUP_DESCRIPTION: "EDIT_GROUP_DESCRIPTION",
    EDIT_GROUP_TYPE: "EDIT_GROUP_TYPE",
    EDIT_GROUP_IMAGE: "EDIT_GROUP_IMAGE",
    EDIT_GROUP_RESET_FIELDS: "EDIT_GROUP_RESET_FIELDS",
    EDIT_GROUP_COMPLETE: "EDIT_GROUP_COMPLETE",
    EDIT_GROUP_SUCCESS: "EDIT_GROUP_SUCCESS",
    EDIT_GROUP_FAILURE: "EDIT_GROUP_FAILURE",

    //GROUPS
    GET_GROUP: "GET_GROUP",
    GET_GROUP_SUCCESS: "GET_GROUP_SUCCESS",
    GET_GROUP_FAILURE: "GET_GROUP_FAILURE",
    GET_ALL_GROUPS: "GET_ALL_GROUPS",
    GET_ALL_GROUPS_SUCCESS: "GET_ALL_GROUPS_SUCCESS",
    GET_ALL_GROUPS_FAILURE: "GET_ALL_GROUPS_FAILURE",
    GET_USER_GROUPS: "GET_USER_GROUPS",
    GET_USER_GROUPS_SUCCESS: "GET_USER_GROUPS_SUCCESS",
    GET_USER_GROUPS_FAILURE: "GET_USER_GROUPS_FAILURE",
    GET_GROUP_MEMBERS: "GET_GROUP_MEMBERS",
    GET_GROUP_MEMBERS_SUCCESS: "GET_GROUP_MEMBERS_SUCCESS",
    GET_GROUP_MEMBERS_FAILURE: "GET_GROUP_MEMBERS_FAILURE",
    JOIN_GROUP_WITH_CODE: "JOIN_GROUP_WITH_CODE",
    JOIN_GROUP_WITH_CODE_SUCCESS: "JOIN_GROUP_WITH_CODE_SUCCESS",
    JOIN_GROUP_WITH_CODE_FAILURE: "JOIN_GROUP_WITH_CODE_FAILURE",

    //RESOURCES
    GET_RESOURCE_LIST: "GET_RESOURCE_LIST",
    GET_RESOURCE_LIST_SUCCESS: "GET_RESOURCE_LIST_SUCCESS",
    GET_RESOURCE_LIST_FAILURE: "GET_RESOURCE_LIST_FAILURE",
    GET_RESOURCE: "GET_RESOURCE",
    GET_RESOURCE_SUCCESS: "GET_RESOURCE_SUCCESS",
    GET_RESOURCE_FAILURE: "GET_RESOURCE_FAILURE",
    CREATE_RESOURCE_SUBMIT: "CREATE_RESOURCE_SUBMIT",
    CREATE_RESOURCE_SUCCESS: "CREATE_RESOURCE_SUCCESS",
    CREATE_RESOURCE_FAILURE: "CREATE_RESOURCE_FAILURE",
    EDIT_RESOURCE_SUBMIT: "EDIT_RESOURCE_SUBMIT",
    EDIT_RESOURCE_SUCCESS: "EDIT_RESOURCE_SUCCESS",
    EDIT_RESOURCE_FAILURE: "EDIT_RESOURCE_FAILURE",
    DELETE_RESOURCE: "DELETE_RESOURCE",
    DELETE_RESOURCE_SUCCESS: "DELETE_RESOURCE_SUCCESS",
    DELETE_RESOURCE_FAILURE: "DELETE_RESOURCE_FAILURE",

    ADD_QUESTION: "ADD_QUESTION",
    ADD_QUESTION_SUCCESS: "ADD_QUESTION_SUCCESS",
    ADD_QUESTION_FAILURE: "ADD_QUESTION_FAILURE",
    DELETE_QUESTION: "DELETE_QUESTION",
    DELETE_QUESTION_SUCCESS: "DELETE_QUESTION_SUCCESS",
    DELETE_QUESTION_FAILURE: "DELETE_QUESTION_FAILURE",
    EDIT_QUESTION: "EDIT_QUESTION",
    EDIT_QUESTION_SUCCESS: "EDIT_QUESTION_SUCCESS",
    EDIT_QUESTION_FAILURE: "EDIT_QUESTION_FAILURE",

    UPVOTE_QUESTION: "UPVOTE_QUESTION",
    UPVOTE_QUESTION_SUCCESS: "UPVOTE_QUESTION_SUCCESS",
    UPVOTE_QUESTION_FAILURE: "UPVOTE_QUESTION_FAILURE",
    DOWNVOTE_QUESTION: "DOWNVOTE_QUESTION",
    DOWNVOTE_QUESTION_SUCCESS: "DOWNVOTE_QUESTION_SUCCESS",
    DOWNVOTE_QUESTION_FAILURE: "DOWNVOTE_QUESTION_FAILURE",




    GET_ALL_USERS: "GET_ALL_USERS",
    GET_ALL_USERS_SUCCESS: "GET_ALL_USERS_SUCCESS",
    GET_ALL_USERS_FAILURE: "GET_ALL_USERS_FAILURE",


    ADD_USER_TO_GROUP:"ADD_USER_TO_GROUP",
    ADD_USER_TO_GROUP_SUCCESS:"ADD_USER_TO_GROUP_SUCCESS",
    ADD_USER_TO_GROUP_FAILURE:"ADD_USER_TO_GROUP_FAILURE",

    LEAVE_GROUP: "LEAVE_GROUP",
    LEAVE_GROUP_SUCCESS: "LEAVE_GROUP_SUCCESS",
    LEAVE_GROUP_FAILURE: "LEAVE_GROUP_FAILURE",

    REMOVE_USER_FROM_GROUP: "REMOVE_USER_FROM_GROUP",
    REMOVE_USER_FROM_GROUP_SUCCESS: "REMOVE_USER_FROM_GROUP_SUCCESS",
    REMOVE_USER_FROM_GROUP_FAILURE: "REMOVE_USER_FROM_GROUP_FAILURE",

    DELETE_GROUP: "DELETE_GROUP",
    DELETE_GROUP_SUCCESS: "DELETE_GROUP_SUCCESS",
    DELETE_GROUP_FAILURE: "DELETE_GROUP_FAILURE",

    SHOW_NOTIFIER: "SHOW_NOTIFIER",
    CLOSE_NOTIFIER: "CLOSE_NOTIFIER",
};

export { actionConstants, API_BASE_PATH, IMAGE_PATH, groupTypes };