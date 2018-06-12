"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_1 = require("../models/util/search");
var TestSearch = /** @class */ (function () {
    function TestSearch() {
    }
    TestSearch.init = function () {
        //SearchS.searchTeams(2,'',SearchFor.General)
        //SearchS.search(2,'')
        search_1.SearchS.getMyTeams(1, 'bla')
            .then(function (usrs) {
            console.log(usrs);
        });
    };
    return TestSearch;
}());
exports.TestSearch = TestSearch;
