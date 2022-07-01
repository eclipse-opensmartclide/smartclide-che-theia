"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const smartclide_service_creation_theia_widget_1 = require("./smartclide-service-creation-theia-widget");
const smartclide_service_creation_theia_contribution_1 = require("./smartclide-service-creation-theia-contribution");
const browser_1 = require("@theia/core/lib/browser");
require("../../src/browser/style/index.css");
exports.default = new inversify_1.ContainerModule(bind => {
    (0, browser_1.bindViewContribution)(bind, smartclide_service_creation_theia_contribution_1.SmartclideServiceCreationTheiaContribution);
    bind(browser_1.FrontendApplicationContribution).toService(smartclide_service_creation_theia_contribution_1.SmartclideServiceCreationTheiaContribution);
    bind(smartclide_service_creation_theia_widget_1.SmartclideServiceCreationTheiaWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(ctx => ({
        id: smartclide_service_creation_theia_widget_1.SmartclideServiceCreationTheiaWidget.ID,
        createWidget: () => ctx.container.get(smartclide_service_creation_theia_widget_1.SmartclideServiceCreationTheiaWidget)
    })).inSingletonScope();
});
//# sourceMappingURL=smartclide-service-creation-theia-frontend-module.js.map