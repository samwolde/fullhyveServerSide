"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var serviceValues_1 = require("../models/serviceValues");
var constant_1 = require("../constants/constant");
var UtilMethods = /** @class */ (function () {
    function UtilMethods() {
    }
    UtilMethods.getTeamProjectAttr = function (values) {
        var returns = [];
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var i = values_1[_i];
            returns.push({
                id: i.get('id'),
                name: i.get('name'),
                image: i.get('image')
            });
        }
        return returns;
    };
    UtilMethods.getFastUserAttr = function (users) {
        var usersReturn = [];
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var i = users_1[_i];
            usersReturn.push({
                id: i.get('id'),
                name: i.get('firstName') + " " + i.get('lastName'),
                image: i.get('image')
            });
        }
        return usersReturn;
    };
    UtilMethods.getUserAttr = function (users) {
        var userReturn = [];
        for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {
            var user = users_2[_i];
            var skills = user.skills;
            var skill = [];
            for (var _a = 0, skills_1 = skills; _a < skills_1.length; _a++) {
                var b = skills_1[_a];
                skill.push(b.dataValues.skill);
            }
            userReturn.push({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                title: user.title,
                skills: skill,
                description: user.description
            });
        }
        return userReturn;
    };
    UtilMethods.getMinUserAttr = function (users) {
        var userReturn = [];
        for (var _i = 0, users_3 = users; _i < users_3.length; _i++) {
            var user = users_3[_i];
            userReturn.push({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
            });
        }
        return userReturn;
    };
    UtilMethods.getUserProfileAttr = function (users) {
        var userReturn = [];
        for (var _i = 0, users_4 = users; _i < users_4.length; _i++) {
            var user = users_4[_i];
            var skills = user.skills;
            var skill = [];
            for (var _a = 0, skills_2 = skills; _a < skills_2.length; _a++) {
                var b = skills_2[_a];
                skill.push(b.dataValues.skill);
            }
            userReturn.push({
                id: user.id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image,
                title: user.title,
                skills: skill,
                description: user.description,
            });
        }
        return userReturn;
    };
    UtilMethods.getMemberCount = function (members) {
        var memberCount = 0;
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var member = members_1[_i];
            if (member.TeamUsers.request == 'Accepted') {
                memberCount++;
            }
        }
        return memberCount;
    };
    UtilMethods.getTeamAttr = function (teams) {
        var teamsReturn = [];
        for (var _i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
            var a = teams_1[_i];
            var teamDetail = {};
            var team = a.get();
            var leaders = UtilMethods.getUserAttr([team.user]);
            teamDetail = {
                id: team.id,
                name: team.name,
                image: team.image,
                description: team.description,
                memberCount: UtilMethods.getMemberCount(team.members),
                leader: leaders[0]
            };
            teamsReturn.push(teamDetail);
        }
        return teamsReturn;
    };
    UtilMethods.getMinTeamAttr = function (teams) {
        var teamsReturn = [];
        for (var _i = 0, teams_2 = teams; _i < teams_2.length; _i++) {
            var team = teams_2[_i];
            var teamDetail = {};
            teamDetail = {
                id: team.id,
                name: team.name,
                image: team.image,
            };
            teamsReturn.push(teamDetail);
        }
        return teamsReturn;
    };
    UtilMethods.getContributorCount = function (project) {
        var contributorsId = {};
        for (var _i = 0, _a = project.teams; _i < _a.length; _i++) {
            var team = _a[_i];
            if (team.projectTeams.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                for (var _b = 0, _c = team.members; _b < _c.length; _b++) {
                    var user = _c[_b];
                    if (user.TeamUsers.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                        contributorsId[user.id] = true; // team members
                    }
                }
                contributorsId[team.leaderId] = true; // team leader
            }
        }
        for (var _d = 0, _e = project.individualMembers; _d < _e.length; _d++) {
            var individualMember = _e[_d];
            if (individualMember.projectUsers.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                contributorsId[individualMember.id] = true; // individual contributors
            }
        }
        return Object.keys(contributorsId).length;
    };
    UtilMethods.getProjectAttr = function (projects) {
        var projectsReturn = [];
        for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
            var project = projects_1[_i];
            var projectDetail = {};
            var leader = UtilMethods.getUserAttr([project.user]);
            var contributors = UtilMethods.getContributorCount(project);
            projectDetail = {
                id: project.id,
                name: project.name,
                image: project.image,
                description: project.description,
                field: project.field,
                leader: leader[0],
                contributorCount: contributors
            };
            projectsReturn.push(projectDetail);
        }
        return projectsReturn;
    };
    UtilMethods.getAnnouncementAttr = function (announcements, userId, lastSeenAnnouncementId, showReply) {
        if (showReply === void 0) { showReply = true; }
        var announcementReturn = [];
        for (var _i = 0, announcements_1 = announcements; _i < announcements_1.length; _i++) {
            var a = announcements_1[_i];
            var sender = UtilMethods.getUserAttr([a.user]);
            var seen = a.id > (lastSeenAnnouncementId == null ? constant_1.AnnouncementConst.START_ID : lastSeenAnnouncementId) ? false : true;
            var annR = void 0;
            annR = {
                mainMessage: {
                    id: a.id,
                    message: a.message,
                    timestamp: a.timestamp,
                    sent: a.userId == userId ? true : false,
                    seen: seen,
                    sender: sender[0]
                },
                replies: []
            };
            if (showReply) {
                var replies = a.get('replies');
                for (var _a = 0, replies_1 = replies; _a < replies_1.length; _a++) {
                    var b = replies_1[_a];
                    var rSender = UtilMethods.getUserAttr([a.user]);
                    annR.replies.push({
                        id: b.id,
                        message: b.message,
                        timestamp: b.timestamp,
                        sent: true,
                        seen: seen,
                        sender: rSender[0]
                    });
                }
            }
            announcementReturn.push(annR);
        }
        return announcementReturn;
    };
    UtilMethods.getTasksetAttr = function (sets) {
        var setsReturn = [];
        for (var _i = 0, sets_1 = sets; _i < sets_1.length; _i++) {
            var set = sets_1[_i];
            var setR = void 0;
            setR = {
                id: set.id,
                name: set.name,
                number: set.number,
                deadline: set.deadline,
                description: set.description,
                tasks: new serviceValues_1.Task(),
                completion: "Completed"
            };
            setsReturn.push(setR);
        }
        return setsReturn;
    };
    UtilMethods.getTaskAttr = function (tasks) {
        return __awaiter(this, void 0, void 0, function () {
            var tasksReturn, _i, tasks_1, task, taskR;
            return __generator(this, function (_a) {
                tasksReturn = [];
                for (_i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
                    task = tasks_1[_i];
                    taskR = void 0;
                    taskR = {
                        id: task.id,
                        number: task.number,
                        title: task.title,
                        description: task.description,
                        status: task.status,
                        deadline: task.deadline,
                        assignmentDate: task.assignmentDate,
                        assigner: UtilMethods.getUserAttr([task.assigner])[0],
                        assignee: UtilMethods.getUserAttr([task.assignee])[0],
                        assigneeTeam: UtilMethods.getTeamAttr([task.assigneeTeam])[0]
                    };
                    tasksReturn.push(taskR);
                }
                return [2 /*return*/, tasksReturn];
            });
        });
    };
    UtilMethods.getUnseenTasksAttr = function (projects) {
        var messagesReturn = [];
        for (var projectId in projects) {
            var proj = projects[projectId];
            messagesReturn.push({
                id: projectId,
                image: proj.image,
                comment: "You have been assigned " + proj.count + " new task" + (proj.count == 1 ? '' : 's') + " on project " + proj.name + ".",
                options: UtilMethods.getOptions(serviceValues_1.NotificationType.Assignment, projectId)
            });
        }
        return messagesReturn;
    };
    UtilMethods.getUnseenMessagesAttr = function (messages) {
        var messagesReturn = [];
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            var sender = UtilMethods.getUserAttr([message.user])[0];
            messagesReturn.push({
                message: {
                    id: message.id,
                    message: message.message,
                    timestamp: message.timestamp,
                    seen: message.seen,
                },
                sender: sender
            });
        }
        return messagesReturn;
    };
    UtilMethods.getMessagesAttr = function (messages) {
        var messagesReturn = [];
        for (var _i = 0, messages_2 = messages; _i < messages_2.length; _i++) {
            var message = messages_2[_i];
            messagesReturn.push({
                id: message.id,
                message: message.message,
                seen: message.seen,
                timestamp: message.timestamp
            });
        }
        return messagesReturn;
    };
    // notifications
    UtilMethods.getOptions = function (notificationType, id) {
        if (notificationType != serviceValues_1.NotificationType.Assignment) {
            return [
                {
                    navigate: false,
                    type: notificationType,
                    name: 'Accept',
                    id: id
                },
                {
                    navigate: false,
                    type: notificationType,
                    name: 'Decline',
                    id: id
                }
            ];
        }
        else if (notificationType == serviceValues_1.NotificationType.Assignment) {
            return [
                {
                    navigate: true,
                    type: notificationType,
                    name: 'View',
                    id: id
                }
            ];
        }
        return [];
    };
    UtilMethods.getFriendRequestAttr = function (senders, friendsId) {
        var friendRequestsReturn = [];
        for (var _i = 0, senders_1 = senders; _i < senders_1.length; _i++) {
            var sender = senders_1[_i];
            friendRequestsReturn.push({
                id: friendsId[sender.id],
                image: sender.image,
                comment: "You have a friend request from " + sender.firstName + " " + sender.lastName + ".",
                options: UtilMethods.getOptions(serviceValues_1.NotificationType.FriendRequest, friendsId[sender.id])
            });
        }
        return friendRequestsReturn;
    };
    UtilMethods.getTeamJoinRequestAttr = function (senders, friendsId) {
        var teamJoinRequestsReturn = [];
        for (var _i = 0, senders_2 = senders; _i < senders_2.length; _i++) {
            var sender = senders_2[_i];
            teamJoinRequestsReturn.push({
                id: friendsId[sender.id],
                image: sender.image,
                comment: "You have been invited to team " + sender.name + ".",
                options: UtilMethods.getOptions(serviceValues_1.NotificationType.TeamRequest, friendsId[sender.id])
            });
        }
        return teamJoinRequestsReturn;
    };
    // offset and limit
    UtilMethods.sliceCustom = function (values, order, offset, limit) {
        for (var _i = 0, order_1 = order; _i < order_1.length; _i++) {
            var i = order_1[_i];
            var length_1 = values[i].length;
            values.count += length_1;
            values[i] = values[i].slice(offset, offset + limit);
            if (offset + limit > length_1) {
                limit = offset + limit - length_1;
                if (offset > length_1) {
                    offset = offset - length_1;
                }
                else {
                    offset = 0;
                }
            }
            else {
                offset = limit = 0;
            }
        }
        if (offset + limit >= values.count) {
            values.done = true;
        }
        else {
            values.done = false;
        }
        delete values.count;
        return values;
    };
    return UtilMethods;
}());
exports.UtilMethods = UtilMethods;
var DateMethods = /** @class */ (function () {
    function DateMethods() {
    }
    DateMethods.getTodayDate = function () {
        var today = new Date();
        var todayDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        return todayDate;
    };
    DateMethods.getLastMonthDate = function () {
        var today = new Date();
        var todayDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        var lastMonthDate = (today.getMonth() > 0 ? today.getFullYear() : today.getFullYear() - 1) + "-" + (today.getMonth() > 0 ? today.getMonth() : 11) + "-" + today.getDate();
        return lastMonthDate;
    };
    // month can't be greater than 12
    DateMethods.getMonthDate = function (monthBack) {
        var today = new Date();
        var year, month, date;
        if (today.getMonth() + 1 - monthBack > 0) {
            month = today.getMonth() + 1 - monthBack;
            if (today.getDate() > DateMethods.DaysInMonth[month]) {
                date = DateMethods.DaysInMonth[month];
            }
            else {
                date = today.getDate();
            }
            year = today.getFullYear();
        }
        else {
            month = (today.getMonth() - monthBack) + 13;
            if (today.getDate() > DateMethods.DaysInMonth[month]) {
                date = DateMethods.DaysInMonth[month];
            }
            else {
                date = today.getDate();
            }
            year = today.getFullYear() - 1;
        }
        return year + "-" + month + "-" + date;
    };
    // week can't be greater than 4
    DateMethods.getWeekDate = function (week, startDate) {
        var today = new Date();
        if (!startDate) {
            today = new Date(startDate);
        }
        var year, month, date;
        if (today.getDate() - 7 * week > 0) {
            date = today.getDate() - 7 * week; // previous week
            month = today.getMonth() + 1;
            year = today.getFullYear();
        }
        else {
            if (today.getMonth() > 0) {
                date = (DateMethods.DaysInMonth[today.getMonth()] + today.getDate()) - (7 * week); // previous week
                month = today.getMonth(); // previous month
                year = today.getFullYear();
            }
            else {
                date = (DateMethods.DaysInMonth[today.getMonth()] + today.getDate()) - (7 * week);
                month = 11; // previous month
                year = today.getFullYear() - 1; // previous year
            }
        }
        return year + "-" + month + "-" + date;
    };
    DateMethods.getInterval = function (startDate, finalDate) {
        var sDate = new Date(startDate);
        var eDate = new Date(finalDate);
        return Math.abs(eDate - sDate) / 86400000;
    };
    DateMethods.DaysInMonth = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    };
    return DateMethods;
}());
exports.DateMethods = DateMethods;
