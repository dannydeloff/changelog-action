"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const util_1 = require("./util");
const notes_1 = require("./notes");
function run() {
    const body = core.getInput('body');
    const notes = (0, notes_1.fromBody)(body);
    if (notes.length < 1) {
        core.warning("no release notes found");
        return;
    }
    const unknownTypes = [];
    for (const note of notes) {
        if (!(0, notes_1.isTypeValid)(note)) {
            unknownTypes.push(note.type);
        }
    }
    if (unknownTypes.length > 0) {
        core.setFailed(`unknown release note types found: ${unknownTypes}`);
    }
}
function runWrapper() {
    try {
        run();
    }
    catch (error) {
        core.setFailed(`check action failed. ${(0, util_1.wrapError)(error).message}`);
    }
}
void runWrapper();
//# sourceMappingURL=check-action.js.map