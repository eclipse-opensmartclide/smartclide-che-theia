"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patternParticipatingClass = void 0;
class patternParticipatingClass {
    constructor(cn) {
        this.cName = cn;
        this.mList = [];
        this.aList = [];
    }
    writeMethods(rootUri) {
        for (let i = 0; i < this.mList.length; i++) {
            this.mList[i].writeToFile(this.cName, rootUri);
        }
    }
    writeAttributes(rootUri) {
        for (let i = 0; i < this.aList.length; i++) {
            this.aList[i].writeToFile(this.cName, rootUri);
        }
    }
    addAttribute(a) {
        this.aList.push(a);
    }
    addMethod(m) {
        this.mList.push(m);
    }
}
exports.patternParticipatingClass = patternParticipatingClass;
//# sourceMappingURL=patternParticipatingClass.js.map