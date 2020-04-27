"use strict";
exports.__esModule = true;
var dotenvSafe = require("dotenv-safe");
var dotEnvOptions = undefined;
if (process.env.NODE_ENV === 'production') {
    dotEnvOptions = {
        example: '.env.production.example',
        path: '.env.production'
    };
}
dotenvSafe.config(dotEnvOptions);
exports.config = Object.freeze({
    env: process.env.NODE_ENV,
    port: process.env.SERVER_PORT,
    corsAddress: process.env.CORS_ADDR
});
