"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abstractClass = void 0;
const patternParticipatingClass_1 = require("./patternParticipatingClass");
class abstractClass extends patternParticipatingClass_1.patternParticipatingClass {
    writeToFile(rootUri) {
        const fs = require('fs');
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
                    fs.appendFileSync(filename, "public abstract class " + this.cName + " {");
                    this.writeAttributes(rootUri);
                    this.writeMethods(rootUri);
                    fs.appendFileSync(filename, "\n}");
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
exports.abstractClass = abstractClass;
//# sourceMappingURL=abstractClass.js.map