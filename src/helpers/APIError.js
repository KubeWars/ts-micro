"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var httpStatus = require("http-status");
/**
 * Class representing an API error.
 * @extends Error
 */
var APIError = /** @class */ (function (_super) {
    __extends(APIError, _super);
    function APIError(message, status, messages) {
        if (status === void 0) { status = httpStatus.INTERNAL_SERVER_ERROR; }
        if (messages === void 0) { messages = undefined; }
        var _this = _super.call(this, message) || this;
        _this.status = httpStatus.INTERNAL_SERVER_ERROR;
        _this.status = status;
        _this.messages = messages;
        Object.setPrototypeOf(_this, APIError.prototype);
        return _this;
    }
    return APIError;
}(Error));
exports["default"] = APIError;
