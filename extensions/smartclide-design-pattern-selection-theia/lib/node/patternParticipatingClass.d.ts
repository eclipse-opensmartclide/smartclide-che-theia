import { Method } from './Method';
import { Attribute } from './Attribute';
export declare abstract class patternParticipatingClass {
    protected cName: string;
    protected mList: Array<Method>;
    protected aList: Array<Attribute>;
    constructor(cn: string);
    abstract writeToFile(rootUri: string): string;
    writeMethods(rootUri: string): void;
    writeAttributes(rootUri: string): void;
    addAttribute(a: Attribute): void;
    addMethod(m: Method): void;
}
//# sourceMappingURL=patternParticipatingClass.d.ts.map