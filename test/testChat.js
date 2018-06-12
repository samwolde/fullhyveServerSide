"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chatServices_1 = require("../models/services/chatServices");
var TestChat = /** @class */ (function () {
    function TestChat() {
    }
    TestChat.init = function () {
        // let userId = 1;
        // ChatS.getChatFriends(userId).then((friends)=>{
        //     console.log(friends);
        // }).catch((err)=>{
        //     console.log(500);
        // });
        //ChatS.getFriendsFromDb([],undefined,userId);
        chatServices_1.ChatS.getUnseenReceivedMessages(1)
            .then(function (messages) {
            console.log(messages);
        });
    };
    return TestChat;
}());
exports.TestChat = TestChat;
