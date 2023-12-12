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
exports.fromBody = exports.isTypeValid = exports.TypeValues = void 0;
const core = __importStar(require("@actions/core"));
const notesInBodyExps = [
    /```release-note:(?<type>[^\r\n]*)\r?\n?(?<note>.*?)\r?\n?```/gmu,
    /```releasenote:(?<type>[^\r\n]*)\r?\n?(?<note>.*?)\r?\n?```/gmu
];
exports.TypeValues = new Map([
    ['note', 'NOTES'],
    ['enhancement', 'ENHANCEMENTS'],
    ['improvement', 'IMPROVEMENTS'],
    ['feature', 'FEATURES'],
    ['bug', 'BUG FIXES'],
    ['deprecation', 'DEPRECATIONS'],
    ['breaking-change', 'BREAKING CHANGES']
]);
function isTypeValid(note) {
    return exports.TypeValues.has(note.type);
}
exports.isTypeValid = isTypeValid;
function fromBody(body) {
    const res = [];
    for (const re of notesInBodyExps) {
        core.debug(`running expression ${re}`);
        let m;
        while ((m = re.exec(body)) !== null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            const note = m.groups?.note.trim();
            core.debug(`note found: ${note}`);
            const typ = m.groups?.type.trim();
            core.debug(`type found: ${typ}`);
            if (note && typ) {
                res.push({ body: note, type: typ });
            }
        }
    }
    return res;
}
exports.fromBody = fromBody;
//# sourceMappingURL=notes.js.map