"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = void 0;
class Attribute {
    constructor(an, t, v) {
        this.aName = an;
        this.type = t;
        this.visibility = v;
    }
    writeToFile(cName, rootUri) {
        var fs = require('fs');
        let filename = rootUri + "/src/" + cName + ".java";
        fs.appendFileSync(filename, "\n \t" + this.visibility + " " + this.type + " " + this.aName + ";");
    }
    writeAsParam(cName, rootUri) {
        var fs = require('fs');
        let filename = rootUri + "/src/" + cName + ".java";
        fs.appendFileSync(filename, this.type + " " + this.aName);
    }
}
exports.Attribute = Attribute;
//# sourceMappingURL=Attribute.js.map