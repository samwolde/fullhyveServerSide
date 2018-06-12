"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_1 = require("../models/util/validate");
var validationInfo_1 = require("../models/util/validationInfo");
var projectServices_1 = require("../models/services/projectServices");
var TestValidation = /** @class */ (function () {
    function TestValidation() {
    }
    TestValidation.init = function () {
        var data = {
            name: 'a',
            image: '',
            field: 'a',
            description: 'kahsfkaa',
            grade: ''
        };
        console.log(validate_1.Validation.validateData(data, validationInfo_1.actionRequiredFields.newProject));
        projectServices_1.ProjectS.getNextTasksetNumber(1)
            .then(function (count) {
            console.log(count);
        });
    };
    return TestValidation;
}());
exports.TestValidation = TestValidation;
