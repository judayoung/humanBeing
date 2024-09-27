"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDir = getDir;
var path_1 = require("path");
// pkg로 exe 만들경우 사용.
function getDir() {
    // if ((process as myProcess).pkg) {
    // if (process.pkg) {
    if (process.pkg) {
        return path_1.default.resolve("".concat(process.execPath, "/.."));
    }
    return path_1.default.join(require.main ? require.main.path : process.cwd());
}
