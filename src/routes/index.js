"use strict";
exports.__esModule = true;
var express_1 = require("express");
var test_1 = require("./test");
var router = express_1.Router();
router.use('/test', test_1["default"]);
exports["default"] = router;
