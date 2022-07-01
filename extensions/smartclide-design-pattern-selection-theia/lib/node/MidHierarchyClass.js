"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidHierarchyClass = void 0;
const patternParticipatingClass_1 = require("./patternParticipatingClass");
class MidHierarchyClass extends patternParticipatingClass_1.patternParticipatingClass {
    constructor(cn, sc) {
        super(cn);
        this.superClass = sc;
    }
    writeToFile(rootUri) {
        var fs = require('fs');
        let filename = rootUri + "/src/" + this.cName + ".java";
        try {
            let fileContents = fs.readFileSync(filename, 'utf-8');
            console.log("FileContents: " + fileContents);
            let declaration = fileContents.slice(0, fileContents.indexOf('{') + 1);
            console.log("Declaration: " + declaration);
            let classBody = fileContents.slice(fileContents.indexOf('{') + 2, fileContents.lastIndexOf('}'));
            console.log("ClassBody: " + classBody);
            fs.writeFileSync(filename, declaration);
            this.writeAttributes(rootUri);
            fs.appendFileSync(filename, "\n" + classBody);
            this.writeMethods(rootUri);
            fs.appendFileSync(filename, "\n}");
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                console.log('File not found!');
                try {
                    fs.appendFileSync(filename, "public abstract class " + this.cName + " extends " + this.superClass + " {");
                    this.writeAttributes(rootUri);
                    this.writeMethods(rootUri);
                    fs.appendFileSync(filename, "}");
                }
                catch (e) {
                    return e.message;
                }
            }
            else {
                return err.message;
            }
        }
        return "";
    }
}
exports.MidHierarchyClass = MidHierarchyClass;
//# sourceMappingURL=MidHierarchyClass.js.map