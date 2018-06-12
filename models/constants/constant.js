"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serviceValues_1 = require("../models/serviceValues");
//module.exports.DB = "projecttracker1";
var DBConst = /** @class */ (function () {
    function DBConst() {
    }
    DBConst.DB_NAME = "projecttrackerfinal";
    DBConst.DB_USER = "root";
    DBConst.DB_PASSWORD = "";
    DBConst.HOST = "localhost";
    DBConst.DB_SERVER = "mysql";
    return DBConst;
}());
exports.DBConst = DBConst;
var AuthConst = /** @class */ (function () {
    function AuthConst() {
    }
    AuthConst.SECRET = "thisissecret";
    return AuthConst;
}());
exports.AuthConst = AuthConst;
exports.UserConst = {
    START_ID: 0,
    USERS_SEARCH_LIMIT: 30,
    USERS_FAST_SEARCH_LIMIT: 10,
    REQUEST: {
        ACCEPTED: 'Accepted',
        REJECTED: 'Rejected',
        UNDECIDED: 'Undecided',
        REMOVED: 'Removed'
    },
    DEFAULT_IMAGE: '43d18e7ae2a93e2865121de8d8f84b68'
};
exports.TeamConst = {
    START_ID: 0,
    TEAMS_SEARCH_LIMIT: 30,
    TEAMS_FAST_SEARCH_LIMIT: 10,
    MEMBERS_SEARCH_LIMIT: 30,
    DEFAULT_IMAGE: '43d18e7ae2a93e2865121de8d8f84b68'
};
exports.ProjectConst = {
    START_ID: 0,
    PROJECTS_SEARCH_LIMIT: 30,
    PROJECTS_FAST_SEARCH_LIMIT: 10,
    TASK_STATUS: {
        'approve': serviceValues_1.TaskStatus.Approved,
        'revise': serviceValues_1.TaskStatus.Revise
    },
    DEFAULT_IMAGE: '43d18e7ae2a93e2865121de8d8f84b68'
};
exports.AnnouncementConst = {
    START_ID: 0,
    ANNOUNCEMENT_SHOWN_ONCE: 30
};
exports.StatConst = {
    TEAM_PERFORMANCE_DURATION: 2,
};
exports.ExcludeAuthentication = {
    signin: true,
    signup: true,
    checkUserName: true
};
