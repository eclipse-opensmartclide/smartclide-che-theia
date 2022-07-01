import * as React from 'react';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
import { HelloBackendService } from '../common/protocol';
import { Functions } from './functions';
import { CreationalPatterns } from './CreationalPatternsWizard';
import { StructuralPatterns } from './StructuralPatternsWizard';
import { BehavioralPatterns } from './BehavioralPatternsWizard';
export declare class extensionWidget extends ReactWidget {
    [x: string]: any;
    static readonly ID = "smartclide-design-pattern-selection-theia:widget";
    static readonly LABEL = "Smartclide Design Pattern Selection";
    static state: {
        statePatternSelection: string;
    };
    protected readonly messageService: MessageService;
    protected readonly helloBackendService: HelloBackendService;
    protected init(): Promise<void>;
    static setState: any;
    static res: string[];
    static methodNames: string[];
    static data: any;
    static initialData: any;
    static explanation: any;
    static functions: Functions;
    static creationalPatterns: CreationalPatterns;
    static structuralPatterns: StructuralPatterns;
    static behavioralPatterns: BehavioralPatterns;
    protected render(): React.ReactNode;
    protected runprocess(): Promise<void>;
    updateSelection(e: React.ChangeEvent<HTMLSelectElement>): Promise<void>;
    insertCells(table: HTMLTableElement, key: string): void;
    extensionButtonClick(table: HTMLTableElement, key: string, values: string): void;
    goBackbuttonClick(table: HTMLTableElement): Promise<void>;
    goBackbuttonClickWizard(div: HTMLDivElement): Promise<void>;
    buttonClick2(table: HTMLTableElement): Promise<void>;
    updateLabel(value: string, count: number): string;
    countKeys(values: string, keyString: string): number;
    runWizard(): Promise<void>;
}
//# sourceMappingURL=extension-widget.d.ts.map