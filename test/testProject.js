"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var projectServices_1 = require("../models/services/projectServices");
var TestProject = /** @class */ (function () {
    function TestProject() {
    }
    TestProject.init = function () {
        // ProjectDb.getUserOwnedProjects(2)
        // //ProjectS.getMyProjects(2)
        // //ProjectS.getMyProjectsIds(2)
        // //ProjectS.getTeamProjects(1)
        // //ProjectS.getContributors(1)
        // //ProjectS.getProjectSets(2)
        // //ProjectS.getTasks(4)
        // .then((projects:any)=>{
        //     console.log(projects.myProjects);
        // })
        // ProjectS.getUnseenTasks(2)
        // .then((projects:any)=>{
        //     console.log(projects);
        // })
        projectServices_1.ProjectS.checkContributor(1, 1)
            .then(function (project) {
            console.log('Reqeust has been accepted: ');
            console.log(project);
        });
    };
    return TestProject;
}());
exports.TestProject = TestProject;
