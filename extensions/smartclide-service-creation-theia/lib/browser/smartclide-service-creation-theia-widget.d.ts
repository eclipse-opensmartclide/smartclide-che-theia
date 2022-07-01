/**
 * @license
 * Copyright (C) 2021 UoM - University of Macedonia
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import * as React from 'react';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
import { CommandService } from '@theia/core/lib/common/command';
export declare class SmartclideServiceCreationTheiaWidget extends ReactWidget {
    static readonly ID = "smartclide-service-creation-theia:widget";
    static readonly LABEL = "Smartclide Service Creation";
    static state: {
        stateServiceURL: string;
        stateName: string;
        stateGitlabURL: string;
        stateGitlabToken: string;
        stateProjectVisibility: string;
        stateDescription: string;
        stateJenkinsURL: string;
        stateJenkinsUser: string;
        stateJenkinsToken: string;
        stateKeycloakToken: string;
    };
    handleTokenInfo: ({ data }: any) => void;
    protected readonly messageService: MessageService;
    protected readonly commandService: CommandService;
    protected init(): Promise<void>;
    protected render(): React.ReactNode;
    protected runprocess(): Promise<void>;
    createAndClone(message: String): void;
    updateInput(e: React.ChangeEvent<HTMLInputElement>): void;
    updateInputTextArea(e: React.ChangeEvent<HTMLTextAreaElement>): void;
    onValueChange(event: React.ChangeEvent<HTMLInputElement>): void;
    onCheckBoxChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
//# sourceMappingURL=smartclide-service-creation-theia-widget.d.ts.map