import { Attribute } from './Attribute';
export declare class Method {
    mName: string;
    rType: string;
    isAbstract: boolean;
    visibility: string;
    code: string;
    params: Array<Attribute>;
    constructor(mn: string, rt: string, isA: boolean, v: string, c: string, params: Array<Attribute>);
    writeToFile(cName: string, rootUri: string): void;
}
//# sourceMappingURL=Method.d.ts.map