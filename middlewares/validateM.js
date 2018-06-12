"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serviceValues_1 = require("../models/models/serviceValues");
var constant_1 = require("../models/constants/constant");
var projectServices_1 = require("../models/services/projectServices");
var ValidateM = /** @class */ (function () {
    function ValidateM() {
    }
    // public static validateLoginInfo(req:any, res:express.Response, next:express.NextFunction){
    //     let loginInfo = req.validData;
    //     let validLoginInfo = {
    //         userName:loginInfo.userName,
    //         password:loginInfo.password
    //     }
    //     req.validLoginInfo = validLoginInfo;
    //     next();
    // }
    // public static validateUpdateUser(req:any, res:express.Response, next:express.NextFunction){
    //     let rUser = req.body;
    //     let userId = req.thisUser.id;
    //     let skills = [];
    //     for(let skill of rUser.skills){
    //         skills.push({
    //             skill:skill,
    //             userId:userId
    //         })
    //     }
    //     let user = {
    //         userName:rUser.userName,
    //         password:rUser.password,
    //         imageUrl:rUser.imageUrl && rUser.imageUrl.trim() != '' ? rUser.imageUrl:'43d18e7ae2a93e2865121de8d8f84b68',
    //         firstName:rUser.firstName,
    //         lastName:rUser.lastName,
    //         email:rUser.email,
    //         title:rUser.title,
    //         skills:skills,
    //         description:rUser.description
    //     }
    //     if(user.password == null || user.password.trim()==''){
    //         delete user.password;
    //     } 
    //     req.validData = user;
    //     next();        
    // }
    // public static validateNewTaskImage(req:any, res:express.Response, next:express.NextFunction){
    //     let rTaskImage = req.body;
    //     console.log(req);
    //     let taskImage = {
    //         src:'',
    //         description:rTaskImage.description,
    //         taskId:rTaskImage.taskId
    //     }
    //     req.validData = taskImage;
    //     next();
    // }
    // completion
    ValidateM.validateNewUser = function (req, res, next) {
        var rUser = req.body;
        var user = {
            userName: rUser.userName,
            password: rUser.password,
            firstName: rUser.firstName,
            lastName: rUser.lastName,
            image: constant_1.UserConst.DEFAULT_IMAGE
        };
        req.validData = user;
        next();
    };
    ValidateM.validateNewTeam = function (req, res, next) {
        var rTeam = req.validData;
        var teamR = {
            name: rTeam.name,
            image: rTeam.image && rTeam.image.trim() != '' ? rTeam.image : constant_1.TeamConst.DEFAULT_IMAGE,
            focus: rTeam.focus,
            description: rTeam.description,
            leaderId: req.thisUser.id
        };
        req.validData = {
            team: teamR,
            members: rTeam.members
        };
        next();
    };
    ValidateM.validateNewProject = function (req, res, next) {
        var rProject = req.validData;
        var projectR = {
            name: rProject.name,
            image: rProject.image && rProject.image.trim() != '' ? rProject.image : constant_1.ProjectConst.DEFAULT_IMAGE,
            field: rProject.field,
            description: rProject.description,
            leaderId: req.thisUser.id
        };
        req.validData = projectR;
        next();
    };
    ValidateM.validateNewTaskset = function (req, res, next) {
        var rTaskset = req.validData;
        projectServices_1.ProjectS.getNextTasksetNumber(rTaskset.projectId)
            .then(function (nextNumber) {
            if (nextNumber) {
                var taskset = {
                    name: rTaskset.name,
                    number: nextNumber,
                    description: rTaskset.description,
                    assignmentDate: new Date(),
                    deadline: rTaskset.deadline,
                    teamId: rTaskset.teamId,
                    projectId: rTaskset.projectId
                };
                req.validData = taskset;
                next();
            }
            else {
                res.status(500).send({ status: false });
            }
        });
    };
    ValidateM.validateNewTask = function (req, res, next) {
        var rTask = req.validData;
        projectServices_1.ProjectS.getNextTaskNumber(rTask.projectId, rTask.tasksetId)
            .then(function (nextNumber) {
            if (nextNumber) {
                var task = {
                    title: rTask.title,
                    number: nextNumber,
                    description: rTask.description,
                    assignmentDate: new Date(),
                    deadline: rTask.deadline,
                    assignerId: rTask.assignerId,
                    assigneeId: rTask.assigneeId,
                    assigneeTeamId: rTask.assigneeTeamId,
                    tasksetId: rTask.tasksetId,
                    status: serviceValues_1.TaskStatus.Waiting
                };
                req.validData = task;
                next();
            }
            else {
                res.status(500).send({ status: false });
            }
        });
    };
    return ValidateM;
}());
exports.ValidateM = ValidateM;
