"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authorizationMR_1 = require("../../middlewares/authorizationMR");
exports.requiredAuthorization = {
    // chat
    getMessages: [authorizationMR_1.Authorization.verifyFriendship],
    updateMessageSeen: [authorizationMR_1.Authorization.verifyMessageReceiver],
    sendMessage: [authorizationMR_1.Authorization.verifyFriendship],
    editMessage: [authorizationMR_1.Authorization.verifyMessageSender],
    forwardMessage: [authorizationMR_1.Authorization.verifyMessageRecSend],
    deleteMessage: [authorizationMR_1.Authorization.verifyMessageSender],
    getFriendLastSeenTime: [authorizationMR_1.Authorization.verifyFriendship]
    // team
};
