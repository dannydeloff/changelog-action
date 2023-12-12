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
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const notes_1 = require("./notes");
const util_1 = require("./util");
function buildOutput(notes) {
    core.debug(`building output for ${notes.length} note(s)`);
    const notesByType = new Map();
    for (const note of notes) {
        core.debug(`fetching notes for type ${note.type}`);
        const nts = notesByType.get(note.type);
        if (nts) {
            core.debug(`notes found for type ${note.type}, pushing note`);
            nts.push(note);
            notesByType.set(note.type, nts);
        }
        else {
            core.debug(`no notes found for type ${note.type}, initializing array`);
            notesByType.set(note.type, [note]);
        }
    }
    let output = '';
    for (const [typ, nts] of notesByType) {
        core.debug(`fetching header for type ${typ}`);
        core.debug(`appending "${notes_1.TypeValues.get(typ)}"`);
        output += `${notes_1.TypeValues.get(typ)}:\n`;
        for (const nt of nts) {
            core.debug(`iterating note for type ${typ}`);
            core.debug(`appending "* ${nt.body}"`);
            output += `* ${nt.body}\n`;
        }
        output += '\n';
    }
    core.debug(`returning output: ${output}`);
    return output;
}
async function run() {
    const body = core.getInput('body');
    const notes = (0, notes_1.fromBody)(body);
    core.debug(`${notes.length} note(s) found`);
    if (notes.length > 0) {
        const output = buildOutput(notes);
        core.setOutput('notes', output);
    }
}
exports.run = run;
async function runWrapper() {
    try {
        await run();
    }
    catch (error) {
        core.setFailed(`generate action failed. ${(0, util_1.wrapError)(error).message}`);
    }
}
void runWrapper();
//# sourceMappingURL=generate-action.js.map