"use strict";
exports.__esModule = true;
var config_1 = require("../config");
var cors = require("cors");
exports.corsConfig = cors({
    origin: config_1.config.corsAddress.indexOf('*') > -1 ? '*' : config_1.config.corsAddress.split(','),
    credentials: true
});
