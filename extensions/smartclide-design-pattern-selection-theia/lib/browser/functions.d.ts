import { MessageService } from '@theia/core';
export declare class Functions {
    protected readonly messageService: MessageService;
    static listOfClassNames: string[];
    radioQuestion(questionLabel: string, labelRadio1: string, labelRadio2: string, radioId1: string, radioId2: string, parent: HTMLElement): void;
    textfieldQuestion(questionLabel: string, num: number, inputType: string, inputMessage: string, inputId: string, inputClassname: string, buttonId: string, parent: HTMLElement): void;
    createLabel(innerMessage: string, id: string, parent: HTMLElement): void;
    createInput(innerMessage: string, id: string, classname: string, name: string, type: string, parent: HTMLElement): void;
    showSuggestions(value: string, table: string[], id: string, parent: HTMLDivElement): void;
    autocompleteMatch(input: string, table: string[]): string[];
    createButton(innerMessage: string, id: string, parent: HTMLElement): void;
    checkMessage(message: string, messageService: MessageService): void;
    checkInputsOnSubmit(aaform: number): "You need to fill all the fields!" | "There are duplicated names in the fields!" | "Attribute/Parameter's type can start with uppercase letter! Attribute/Parameter's name must contain only small letters! " | "Method's name must follow camel writing!" | "Class's name must start with a capital letter!" | "Input is valid";
    checkClassNameWriting(value: string): boolean;
    checkMethodNameWriting(value: string): boolean;
    checkAttributeNameWriting(value: string): boolean;
    checkInputsForSameValues(value: string, vform: HTMLFormElement): boolean;
    checkEmptyInputs(vform: HTMLFormElement): boolean;
    check(key: string, statePatternSelection: string): boolean;
    insertInputsAbstractFactory(data: string): any;
    insertInputsBuilder(data: string): void;
    insertInputsFactoryMethod(data: string): void;
    updateJsonObject(data: string): any;
    setClassNames(list: string[]): void;
}
//# sourceMappingURL=functions.d.ts.map