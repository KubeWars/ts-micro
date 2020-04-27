"use strict";
exports.__esModule = true;
var APIError_1 = require("../helpers/APIError");
var httpStatus = require("http-status");
var config_1 = require("../config");
exports.normalizeError = function (err, req, res, next) {
    console.log(err.stack);
    if (!(err instanceof Object.getPrototypeOf(APIError_1["default"]))) {
        var apiError = new APIError_1["default"](err.message, err.status);
        return next(apiError);
    }
    return next(err);
};
exports.convertError = function (req, res, next) {
    var err = new APIError_1["default"]('not_found', httpStatus.NOT_FOUND);
    return next(err);
};
exports.sendErrorToClient = function (err, req, res, next) {
    var errors = {};
    var errorType;
    var status = err.status;
    console.log(err);
    if (err.messages && err.messages.length) {
        errorType = err.message === 'Validation Failed' || err.message.startsWith('Validation') || err.message.startsWith('validation') ? 'validation' : 'other';
        for (var _i = 0, _a = err.messages; _i < _a.length; _i++) {
            var message = _a[_i];
            if (message.children) {
                for (var property in message.children) {
                    if (message.children[property].children[property]) {
                        for (var childrenConstraint in message.children[property].children[property].constraints) {
                            errors[message.children[property].children[property].property] = message.children[property].children[property].constraints[childrenConstraint];
                        }
                    }
                }
            }
            if (message.constraints) {
                for (var constraint in message.constraints) {
                    errors[message.property] = message.constraints[constraint];
                }
            }
        }
    }
    else {
        errors['message'] = err.message || 'Server Error';
        errorType = 'other';
    }
    var response = {
        error: true,
        errorType: errorType,
        errors: errors
    };
    if (config_1.config.env === 'development') {
        response.dev = err.stack;
    }
    return res.status(status).json(response);
};
