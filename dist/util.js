"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapError = void 0;
function wrapError(error) {
    return error instanceof Error ? error : new Error(String(error));
}
exports.wrapError = wrapError;
//# sourceMappingURL=util.js.map