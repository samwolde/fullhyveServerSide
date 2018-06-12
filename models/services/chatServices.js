"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db/db");
var util_1 = require("../util/util");
var constant_1 = require("../constants/constant");
var chatDb_1 = require("../db/chatDb");
var ChatS = /** @class */ (function () {
    function ChatS() {
    }
    ChatS.getContactId = function (userId, friendId, request) {
        if (request === void 0) { request = ''; }
        return new Promise(function (resolve, reject) {
            chatDb_1.ChatDb.getContactId(userId, [friendId], request)
                .then(function (contacts) {
                if (contacts.length > 0) {
                    resolve(contacts[0].id);
                }
                else {
                    resolve(null);
                }
            });
        });
    };
    ChatS.getContactIds = function (userId, friendIds, request) {
        if (request === void 0) { request = ''; }
        return new Promise(function (resolve, reject) {
            var contactIds = [];
            chatDb_1.ChatDb.getContactId(userId, friendIds, request)
                .then(function (contacts) {
                if (contacts.length > 0) {
                    for (var _i = 0, contacts_1 = contacts; _i < contacts_1.length; _i++) {
                        var contact = contacts_1[_i];
                        contactIds.push(contact.id);
                    }
                    resolve(contactIds);
                }
                else {
                    resolve([]);
                }
            });
        });
    };
    ChatS.getContact = function (userId, friendId, request) {
        if (request === void 0) { request = ''; }
        return db_1.DB.Contact.findAll({
            where: db_1.DB.Sequelize.or(db_1.DB.Sequelize.and({
                userId: userId,
                friendId: friendId,
            }, db_1.DB.Sequelize.or({
                request: constant_1.UserConst.REQUEST.ACCEPTED
            }, {
                request: {
                    like: request == '' ? '%%' : "%" + request + "%"
                }
            })), db_1.DB.Sequelize.and({
                userId: friendId,
                friendId: userId,
            }, db_1.DB.Sequelize.or({
                request: constant_1.UserConst.REQUEST.ACCEPTED
            }, {
                request: {
                    like: request == '' ? '%%' : "%" + request + "%"
                }
            })))
        });
    };
    ChatS.getContactIdFromMessageId = function (messageId) {
        return new Promise(function (resolve, reject) {
            db_1.DB.Message.findById(messageId)
                .then(function (message) {
                if (message) {
                    resolve(message.ContactId);
                }
                reject(404);
            });
        });
    };
    ChatS.getFriendLastSeenTime = function (friendId) {
        return new Promise(function (resolve, reject) {
            chatDb_1.ChatDb.getLastSeenTime(friendId)
                .then(function (result) {
                if (result) {
                    resolve({ online: true, timestamp: result.logOutTime });
                }
                else {
                    resolve({ online: false, timestamp: result.logOutTime });
                }
            });
        });
    };
    ChatS.getLastOnline = function (friendId) {
        return new Promise(function (resolve, reject) {
            db_1.DB.UserLog.findOne({
                where: {
                    userId: friendId,
                    logOutTime: null
                }
            })
                .then(function (log) {
                if (log) {
                    if (log.logOutTime != null) {
                        var now = new Date();
                        var logOutTime = new Date(log.logOutTime);
                        var timeDiff = (now - logOutTime) / 1000; //in seconds
                        if (timeDiff % 60 > 0) {
                            var min = timeDiff % 60;
                            if (min >= 60) {
                                var hr = min % 60;
                                if (hr > 24) {
                                    var days = hr % 24;
                                    if (days > 30) {
                                        resolve(logOutTime.getDate() + "/" + (logOutTime.getMonth() + 1) + "/" + logOutTime.getFullYear());
                                    }
                                    else {
                                        resolve(Math.floor(days) + " " + (Math.floor(days) <= 1 ? "day" : "days"));
                                    }
                                }
                                else {
                                    resolve(Math.floor(hr) + " " + (Math.floor(hr) <= 1 ? "hour" : "hours"));
                                }
                            }
                            else {
                                resolve(Math.floor(min) + " " + (Math.floor(min) <= 1 ? "minute" : "minutes"));
                            }
                        }
                        else {
                            resolve("just now");
                        }
                    }
                    else {
                        resolve("online");
                    }
                }
                else {
                    resolve("long time");
                }
            });
        });
    };
    ChatS.getMessages = function (userId, contactIds, seen, lastMsgId) {
        if (seen === void 0) { seen = true; }
        if (lastMsgId === void 0) { lastMsgId = 0; }
        return new Promise(function (resolve, reject) {
            chatDb_1.ChatDb.getMessages(userId, contactIds, seen, lastMsgId)
                .then(function (msgs) {
                msgs = util_1.UtilMethods.getMessagesAttr(msgs);
                resolve(msgs);
            });
        });
    };
    ChatS.getChatMessages = function (userId, friendId, offset, limit, seen, lastMsgId) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.UserConst.USERS_SEARCH_LIMIT; }
        if (seen === void 0) { seen = true; }
        if (lastMsgId === void 0) { lastMsgId = 0; }
        return new Promise(function (resolve, reject) {
            var messagesReturn = { messages: [], count: 0 };
            ChatS.getContactId(userId, friendId, constant_1.UserConst.REQUEST.ACCEPTED)
                .then(function (contactId) {
                return chatDb_1.ChatDb.getMessages(userId, [contactId], seen, lastMsgId);
            })
                .then(function (msgs) {
                messagesReturn = util_1.UtilMethods.sliceCustom({ messages: msgs, count: 0 }, ["messages"], offset, limit);
                messagesReturn.messages = util_1.UtilMethods.getMessagesAttr(messagesReturn.messages);
                resolve(messagesReturn);
            });
        });
    };
    ChatS.countUnseenMessages = function (friendId, contactId) {
        return new Promise(function (resolve, reject) {
            db_1.DB.Message.count({
                where: {
                    senderId: friendId,
                    ContactId: contactId,
                    seen: false
                }
            }).then(function (unseenMessages) { return resolve(unseenMessages); })
                .catch(function (err) { return reject(500); });
        });
    };
    ChatS.getUsersIdList = function (userId, request) {
        if (request === void 0) { request = [constant_1.UserConst.REQUEST.ACCEPTED]; }
        return new Promise(function (resolve, reject) {
            return db_1.DB.Contact.findAll({
                where: db_1.DB.Sequelize.and(db_1.DB.Sequelize.or({
                    userId: userId,
                }, {
                    friendId: userId,
                }), {
                    request: {
                        in: request
                    }
                })
            }).then(function (friends) {
                var friendsList = [];
                if (friends.length > 0) {
                    for (var _i = 0, friends_1 = friends; _i < friends_1.length; _i++) {
                        var friend = friends_1[_i];
                        if (friend.get('userId') != userId) {
                            friendsList.push(friend.get('userId'));
                        }
                        else {
                            friendsList.push(friend.get('friendId'));
                        }
                    }
                    resolve(friendsList);
                }
                else {
                    resolve([]);
                }
            });
        });
    };
    ChatS.getFriendsInfo = function (friends, userId) {
        return new Promise(function (resolve, reject) {
            var returnFriends = [];
            var _loop_1 = function (friend) {
                ChatS.getContactId(userId, friend.id)
                    .then(function (contactId) {
                    return Promise.all([ChatS.countUnseenMessages(friend.id, contactId), ChatS.getMessages(userId, [contactId]), ChatS.getLastOnline(friend.id)]);
                })
                    .then(function (result) {
                    var unseenMessages = result[0];
                    var message = result[1];
                    var lastOnline = result[2];
                    friend.online = lastOnline == 'online' ? true : false;
                    friend.lastOnline = lastOnline;
                    friend.unseenMessages = unseenMessages;
                    friend.lastMessage = message.length > 0 ? message[0] : null;
                })
                    .then(function () {
                    if (friends.indexOf(friend) == friends.length - 1) {
                        resolve(friends);
                    }
                });
            };
            for (var _i = 0, friends_2 = friends; _i < friends_2.length; _i++) {
                var friend = friends_2[_i];
                _loop_1(friend);
            }
            if (friends.length < 1) {
                resolve([]);
            }
        });
    };
    ChatS.getFriendsFromDb = function (friendsList, name) {
        return new Promise(function (resolve, reject) {
            if (name && name.trim() != '') {
                var nameCriteria = name.trim().split(' ');
                var firstName = nameCriteria.length > 0 ? nameCriteria[0] : "";
                var lastName = nameCriteria.length > 1 ? nameCriteria[1] : "";
                if (nameCriteria.length > 2) {
                    resolve([]);
                }
                if (nameCriteria.length == 1) {
                    nameCriteria = [nameCriteria[0], nameCriteria[0]];
                    db_1.DB.User.findAll({
                        attributes: ['id', 'firstName', 'lastName', 'image', 'title', 'description'],
                        where: db_1.DB.Sequelize.and([
                            {
                                id: friendsList
                            },
                            db_1.DB.Sequelize.or({
                                firstName: {
                                    like: "%" + firstName + "%"
                                },
                            }, {
                                lastName: {
                                    like: "%" + lastName + "%"
                                }
                            })
                        ]),
                        include: [db_1.DB.Skill]
                    })
                        .then(function (friends) {
                        var formatedFriends = util_1.UtilMethods.getUserAttr(friends);
                        resolve(formatedFriends);
                    })
                        .catch(function (err) {
                        reject(500);
                    });
                }
                else {
                    db_1.DB.User.findAll({
                        attributes: ['id', 'firstName', 'lastName', 'image', 'title', 'description'],
                        where: {
                            id: friendsList,
                            firstName: {
                                like: "%" + firstName + "%"
                            },
                            lastName: {
                                like: "%" + lastName + "%"
                            }
                        },
                        include: [db_1.DB.Skill]
                    })
                        .then(function (friends) {
                        var formatedFriends = util_1.UtilMethods.getUserAttr(friends);
                        resolve(formatedFriends);
                    })
                        .catch(function (err) {
                        reject(500);
                    });
                }
            }
            else {
                db_1.DB.User.findAll({
                    attributes: ['id', 'firstName', 'lastName', 'image', 'title', 'description'],
                    where: {
                        id: {
                            in: friendsList
                        }
                    },
                    include: [db_1.DB.Skill]
                })
                    .then(function (friends) {
                    var formatedFriends = util_1.UtilMethods.getUserAttr(friends);
                    resolve(formatedFriends);
                })
                    .catch(function (err) {
                    reject(500);
                });
            }
        });
    };
    ChatS.getUsers = function (userId, request, name) {
        if (request === void 0) { request = [constant_1.UserConst.REQUEST.ACCEPTED]; }
        return new Promise(function (resolve, reject) {
            return ChatS.getUsersIdList(userId, request)
                .then(function (friendsList) {
                if (friendsList.length > 0) {
                    return ChatS.getFriendsFromDb(friendsList, name);
                }
                else {
                    return [];
                }
            })
                .then(function (friends) {
                resolve(friends);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    ChatS.getChatFriends = function (userId, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.UserConst.USERS_SEARCH_LIMIT; }
        return new Promise(function (resolve, reject) {
            var friendsReturn = { friends: [], count: 0 };
            return ChatS.getUsers(userId)
                .then(function (friends) {
                if (friends.length > 0) {
                    return ChatS.getFriendsInfo(friends, userId);
                }
                return [];
            })
                .then(function (friends) {
                friendsReturn = util_1.UtilMethods.sliceCustom({ friends: friends, count: 0 }, ["friends"], offset, limit);
                resolve(friendsReturn);
            });
        });
    };
    ChatS.searchUsers = function (userId, name, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.UserConst.USERS_SEARCH_LIMIT; }
        var nameCriteria = name.trim().split(' ');
        var usersReturn = {
            users: [],
            count: 0
        };
        return new Promise(function (resolve, reject) {
            ChatS.getUsers(userId, [constant_1.UserConst.REQUEST.UNDECIDED, constant_1.UserConst.REQUEST.REJECTED], name)
                .then(function (users) {
                usersReturn.users = users;
                usersReturn = util_1.UtilMethods.sliceCustom(usersReturn, ["users"], offset, limit);
                resolve(usersReturn);
            });
        });
    };
    ChatS.sendMessage = function (contactIds, senderId, content) {
        return new Promise(function (resolve, reject) {
            var messageIds = [];
            var _loop_2 = function (i) {
                db_1.DB.Message.create({
                    message: content,
                    senderId: senderId,
                    contactId: contactIds[i]
                })
                    .then(function (message) {
                    messageIds.push({
                        contactId: contactIds[i],
                        messageId: message.id
                    });
                    if (i >= contactIds.length) {
                        resolve(messageIds);
                    }
                });
            };
            for (var i = 0; i < contactIds.length; i++) {
                _loop_2(i);
            }
        });
    };
    ChatS.sendChatMessage = function (userId, friendId, message) {
        return new Promise(function (resolve, reject) {
            ChatS.getContactId(userId, friendId)
                .then(function (contactId) {
                return ChatS.sendMessage(contactId, userId, message);
            })
                .then(function (result) {
                if (result) {
                    resolve({ msgId: result[0].messageId });
                }
                resolve(null);
            });
        });
    };
    ChatS.updateSeen = function (userId, contactId, messageId) {
        return new Promise(function (resolve, reject) {
            db_1.DB.Message.update({
                seen: true
            }, {
                where: {
                    id: {
                        lte: messageId
                    },
                    ContactId: contactId,
                    senderId: {
                        ne: userId
                    }
                }
            }).then(function () {
                resolve(200);
            }).catch(function () {
                reject(500);
            });
        });
    };
    ChatS.editMessage = function (messageId, content) {
        return new Promise(function (resolve, reject) {
            db_1.DB.Message.update({
                content: content
            }, {
                where: {
                    id: messageId
                }
            }).then(function () {
                resolve(200);
            }).catch(function () {
                reject(500);
            });
        });
    };
    ChatS.deleteMessage = function (messageId) {
        return new Promise(function (resolve, reject) {
            db_1.DB.Message.destroy({
                where: {
                    id: messageId
                }
            }).then(function () {
                resolve(200);
            }).catch(function () {
                reject(500);
            });
        });
    };
    ChatS.forwardMessage = function (userId, friendIds, messageId) {
        return new Promise(function (resolve, reject) {
            var contactIds = [];
            ChatS.getContactIds(userId, friendIds)
                .then(function (contactIds) {
                contactIds = contactIds;
                return db_1.DB.Message.findById(messageId);
            })
                .then(function (msg) {
                if (msg) {
                    var content = msg.get('content');
                    return ChatS.sendMessage(contactIds, userId, content);
                }
                else {
                    reject(404);
                }
            })
                .then(function (messageIds) {
                resolve({ messageId: messageId });
            });
        });
    };
    // managing methods
    ChatS.getUnseenReceivedMessages = function (userId) {
        return new Promise(function (resolve, reject) {
            ChatS.getUsersIdList(userId)
                .then(function (friendsId) {
                if (friendsId.length > 0) {
                    return chatDb_1.ChatDb.getMessageNotification(friendsId);
                }
                return [];
            })
                .then(function (messages) {
                var messagesReturn = [];
                if (messages.length > 0) {
                    messagesReturn = util_1.UtilMethods.getUnseenMessagesAttr(messages);
                }
                resolve(messagesReturn);
            });
        });
    };
    // authorization
    ChatS.checkFriendship = function (userId, friendId) {
        return new Promise(function (resolve, reject) {
            chatDb_1.ChatDb.checkFriendship(userId, friendId)
                .then(function (contact) {
                if (contact) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    ChatS.checkMessageSender = function (userId, messageId) {
        return new Promise(function (resolve, reject) {
            chatDb_1.ChatDb.checkMessageSender(userId, messageId)
                .then(function (message) {
                if (message) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    ChatS.checkMessageRecSend = function (contactId, messageId) {
        return new Promise(function (resolve, reject) {
            chatDb_1.ChatDb.checkMessageRecSend(contactId, messageId)
                .then(function (message) {
                if (message) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    return ChatS;
}());
exports.ChatS = ChatS;
