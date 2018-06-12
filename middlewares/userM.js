"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userServices_1 = require("../models/services/userServices");
var constant_1 = require("../models/constants/constant");
var teamServices_1 = require("../models/services/teamServices");
var projectServices_1 = require("../models/services/projectServices");
var chatServices_1 = require("../models/services/chatServices");
var util_1 = require("../models/util/util");
var authenticationM_1 = require("./authenticationM");
var UserM = /** @class */ (function () {
    function UserM() {
    }
    UserM.login = function (req, callback) {
        callback({ success: true, code: 200, message: null, data: null });
    };
    UserM.checkUsername = function (req, callback) {
        var userName = req.validData.userName;
        userServices_1.UserS.isUserNameAvailable(userName)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (status) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    UserM.getProfile = function (req, callback) {
        var userId = req.thisUser.id;
        console.log(userId);
        userServices_1.UserS.getUserProfile(userId)
            .then(function (profile) {
            callback({ success: true, code: 200, message: null, data: profile });
        })
            .catch(function (errStatus) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    UserM.getUserProfile = function (req, callback) {
        var userId = req.thisUser.id;
        var friendId = req.validData.friendId;
        var request = null;
        chatServices_1.ChatS.getContact(userId, friendId)
            .then(function (contacts) {
            if (contacts.length > 0) {
                request = contacts[0].request;
            }
            return userServices_1.UserS.getUserProfile(friendId);
        })
            .then(function (profile) {
            var userR = null;
            if (profile) {
                userR = {
                    user: profile,
                    friendshipStatus: request ? (request == 'Undecided' ? 0 : (request == 'Accepted' ? 1 : 2)) : 3
                };
            }
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (errStatus) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    UserM.register = function (req, callback) {
        var user = req.validData;
        authenticationM_1.Authentication.hashPassword(req.validData.password)
            .then(function (hashedPassword) {
            req.validData.password = hashedPassword;
            return userServices_1.UserS.addUser(user);
        })
            .then(function () {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (errStatus) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    UserM.editProfile = function (req, callback) {
        var user = req.validData;
        var userId = req.thisUser.id;
        userServices_1.UserS.editUser(userId, user)
            .then(function () {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (errStatus) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    UserM.updateProfileImage = function (req, callback) {
        var userId = req.thisUser.id;
        var imageUrl = req.file.filename;
        userServices_1.UserS.setUserImage(userId, imageUrl)
            .then(function () {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (errStatus) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    UserM.addFriend = function (req, callback) {
        var userId = req.thisUser.id;
        var friendId = req.validData.friendId;
        userServices_1.UserS.addFriend(userId, friendId)
            .then(function () {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (errStatus) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    UserM.replyFriendRequest = function (req, callback) {
        var accepted = req.validData.accepted;
        var decision = constant_1.UserConst.REQUEST.REJECTED;
        var requestId = req.validData.requestId;
        if (accepted) {
            decision = constant_1.UserConst.REQUEST.ACCEPTED;
        }
        else {
            decision = constant_1.UserConst.REQUEST.REJECTED;
        }
        userServices_1.UserS.replyFriendRequest(requestId, decision)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    UserM.unfriend = function (req, callback) {
        var friendId = req.validData.friendId;
        var userId = req.thisUser.id;
        chatServices_1.ChatS.getContactId(userId, friendId)
            .then(function (contactId) {
            return userServices_1.UserS.replyFriendRequest(contactId, constant_1.UserConst.REQUEST.REMOVED);
        })
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    UserM.logout = function (req, callback) {
        var userId = req.thisUser.id;
        userServices_1.UserS.logout(userId)
            .then(function () {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (errStatus) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    UserM.getNotifications = function (req, callback) {
        var userId = req.thisUser.id;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        var notifications = {
            requests: [],
            unseenTasks: [],
            count: 0
        };
        userServices_1.UserS.getUnseenFriendRequests(userId)
            .then(function (friendRequests) {
            notifications.requests = notifications.requests.concat(friendRequests);
            return teamServices_1.TeamS.getUnseenTeamJoinRequests(userId);
        })
            .then(function (teamJoinRequests) {
            notifications.requests = notifications.requests.concat(teamJoinRequests);
            return projectServices_1.ProjectS.getUnseenTeamContributorJoinRequest(userId);
        })
            .then(function (teamContriubtorJoinRequests) {
            notifications.requests = notifications.requests.concat(teamContriubtorJoinRequests);
            return projectServices_1.ProjectS.getUnseenIndividualContributorJoinRequest(userId);
        })
            .then(function (individualContributorJoinRequests) {
            notifications.requests = notifications.requests.concat(individualContributorJoinRequests);
            return projectServices_1.ProjectS.getUnseenTasks(userId);
        })
            .then(function (unseenTasks) {
            notifications.unseenTasks = unseenTasks;
            notifications = util_1.UtilMethods.sliceCustom(notifications, ["requests", "unseenTasks"], offset, limit);
            callback({ success: true, code: 200, message: null, data: notifications });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    return UserM;
}());
exports.UserM = UserM;
