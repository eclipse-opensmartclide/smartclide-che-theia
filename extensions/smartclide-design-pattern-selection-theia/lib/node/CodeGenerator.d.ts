import { patternParticipatingClass } from './patternParticipatingClass';
interface Object {
    object: Array<patternParticipatingClass>;
}
export declare class CodeGenerator {
    AbstractFactory(jsonObj: string): Array<patternParticipatingClass>;
    Builder(jsonObj: string): Array<patternParticipatingClass>;
    FactoryMethod(jsonObj: string): Array<patternParticipatingClass>;
    Singleton(jsonObj: string): Array<patternParticipatingClass>;
    Prototype(jsonObj: string): Array<patternParticipatingClass>;
    Adapter(jsonObj: string): Array<patternParticipatingClass>;
    Bridge(jsonObj: string): Array<patternParticipatingClass>;
    Composite(jsonObj: string): Array<patternParticipatingClass>;
    Decorator(jsonObj: string): Array<patternParticipatingClass>;
    Facade(jsonObj: string): Array<patternParticipatingClass>;
    Flyweight(jsonObj: string): Array<patternParticipatingClass>;
    Proxy(jsonObj: string): Array<patternParticipatingClass>;
    ChainOfResponsibility(jsonObj: string): Array<patternParticipatingClass>;
    Command(jsonObj: string): Array<patternParticipatingClass>;
    Mediator(jsonObj: string): Array<patternParticipatingClass>;
    Memento(jsonObj: string): Array<patternParticipatingClass>;
    Observer(jsonObj: string): Array<patternParticipatingClass>;
    State(jsonObj: string): Array<patternParticipatingClass>;
    Strategy(jsonObj: string): Array<patternParticipatingClass>;
    TemplateMethod(jsonObj: string): Array<patternParticipatingClass>;
    Visitor(jsonObj: string): Array<patternParticipatingClass>;
    fillPromise(labelObj: Object, item: patternParticipatingClass): void;
}
export {};
//# sourceMappingURL=CodeGenerator.d.ts.map