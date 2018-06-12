"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var teamDb_1 = require("../models/db/teamDb");
var TestTeam = /** @class */ (function () {
    function TestTeam() {
    }
    TestTeam.init = function () {
        //TeamS.getMyTeams(2)
        // .then((res)=>{
        //     console.log(res);
        // })
        // TeamS.getPublicTeams(3,'re')
        // .then((teams)=>{
        //     console.log(teams);
        // });
        // TeamS.getTeamMembers(2)
        // .then((members)=>{
        //     console.log(members);
        // });
        //TeamS.getTeamAnnouncement(4,1)
        teamDb_1.TeamDb.getLastAnnId(4, 1)
            .then(function (res) {
            console.log(res);
        });
    };
    return TestTeam;
}());
exports.TestTeam = TestTeam;
