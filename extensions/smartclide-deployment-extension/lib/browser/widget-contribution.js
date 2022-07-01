"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceholderMenuNode = exports.SmartCLIDEDeploymentWidgetContribution = void 0;
const inversify_1 = require("@theia/core/shared/inversify");
const widget_widget_1 = require("./widget-widget");
const browser_1 = require("@theia/core/lib/browser");
const frontend_application_state_1 = require("@theia/core/lib/browser/frontend-application-state");
const common_1 = require("@theia/core/lib/common");
const output_channel_1 = require("@theia/output/lib/browser/output-channel");
const workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
const monaco_quick_input_service_1 = require("@theia/monaco/lib/browser/monaco-quick-input-service");
const protocol_1 = require("../common/protocol");
const common_2 = require("@theia/git/lib/common");
const git_repository_provider_1 = require("@theia/git/lib/browser/git-repository-provider");
const fetchMethods_1 = require("../common/fetchMethods");
/// TODO: remove this mock data
// import { mockSettings } from './../common/secrets';
const SmartCLIDEDeploymentWidgetCommand = {
    id: 'command-deployment-widget.command',
    label: 'Deployment: Dashboard',
};
const CommandDeploymentDeploy = {
    id: 'command-deployment-deploy.command',
    label: 'Deployment: New deployment',
};
const CommandDeploymentStatus = {
    id: 'command-deployment-deploy-monitoring.command',
    label: 'Deployment: Last deployment status',
};
let SmartCLIDEDeploymentWidgetContribution = class SmartCLIDEDeploymentWidgetContribution extends browser_1.AbstractViewContribution {
    constructor() {
        super({
            widgetId: widget_widget_1.SmartCLIDEDeploymentWidget.ID,
            widgetName: widget_widget_1.SmartCLIDEDeploymentWidget.LABEL,
            defaultWidgetOptions: { area: 'main', mode: 'tab-before' },
            toggleCommandId: SmartCLIDEDeploymentWidgetCommand.id,
        });
    }
    registerCommands(commands) {
        commands.registerCommand(SmartCLIDEDeploymentWidgetCommand, {
            execute: () => this.openView({ activate: true, reveal: true }),
        });
        commands.registerCommand(CommandDeploymentDeploy, {
            execute: async () => {
                var _a, _b, _c, _d;
                //// ---------- VARIABLES ------------ /////
                let settings = {
                    user: '',
                    gitRepoUrl: '',
                    project: '',
                    k8sUrl: '',
                    hostname: '',
                    branch: '',
                    replicas: 1,
                    deploymentPort: 8080,
                    k8sToken: '',
                    gitLabToken: '',
                    lastDeploy: '',
                };
                const channel = this.outputChannelManager.getChannel('SmartCLIDE');
                channel.clear();
                const currentProject = ((_b = (_a = this.workspaceService.workspace) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.split('.')[0]) || '';
                if (!currentProject) {
                    this.messageService.error(`It is necessary to have at least one repository open.`);
                    return;
                }
                const currentPath = ((_c = this.workspaceService.workspace) === null || _c === void 0 ? void 0 : _c.resource.path.toString()) || '';
                const prevSettings = await this.smartCLIDEBackendService.fileRead(`${currentPath}/.smartclide-settings.json`);
                if (prevSettings.errno) {
                    this.smartCLIDEBackendService.fileWrite(`${currentPath}/.smartclide-settings.json`, JSON.stringify(settings));
                    const newSettings = await this.smartCLIDEBackendService.fileRead(`${currentPath}/.smartclide-settings.json`);
                    settings = newSettings && { ...JSON.parse(newSettings) };
                }
                else {
                    settings = { ...JSON.parse(prevSettings) };
                }
                if (!currentPath || currentPath === '') {
                    this.messageService.error(`There have been problems getting the route.`);
                    return;
                }
                // settings = mockSettings;
                //// ---------- RETRIEVE USER DATA ------------ /////
                const localUri = this.gitRepositoryProvider.selectedRepository;
                const branchName = (localUri &&
                    ((_d = (await this.git.branch(localUri, { type: 'current' }))) === null || _d === void 0 ? void 0 : _d.name)) ||
                    'main';
                const optionsUser = {
                    placeHolder: 'Enter User Name',
                    prompt: 'Enter User Name:',
                };
                const optionsGitLabToken = {
                    placeHolder: 'Enter GitLab Token',
                    prompt: 'Enter GitLab Token:',
                };
                const optionsK8sUrl = {
                    placeHolder: 'Enter Kubernetes Url',
                    prompt: 'Enter Kubernetes Url:',
                };
                const optionsK8sToken = {
                    placeHolder: 'Enter Kubernetes Token',
                    prompt: 'Enter Kubernetes Token:',
                };
                const user = !(settings === null || settings === void 0 ? void 0 : settings.user)
                    ? await this.monacoQuickInputService
                        .input(optionsUser)
                        .then((value) => value || '')
                    : settings === null || settings === void 0 ? void 0 : settings.user;
                const k8sUrl = !(settings === null || settings === void 0 ? void 0 : settings.k8sUrl)
                    ? await this.monacoQuickInputService
                        .input(optionsK8sUrl)
                        .then((value) => value || '')
                    : settings === null || settings === void 0 ? void 0 : settings.k8sUrl;
                const k8sToken = !(settings === null || settings === void 0 ? void 0 : settings.k8sToken)
                    ? await this.monacoQuickInputService
                        .input(optionsK8sToken)
                        .then((value) => value || '')
                    : settings === null || settings === void 0 ? void 0 : settings.k8sToken;
                const gitLabToken = !(settings === null || settings === void 0 ? void 0 : settings.gitLabToken)
                    ? await this.monacoQuickInputService
                        .input(optionsGitLabToken)
                        .then((value) => value || '')
                    : settings === null || settings === void 0 ? void 0 : settings.gitLabToken;
                settings.user = user;
                settings.project = currentProject;
                settings.branch = branchName;
                settings.k8sToken = k8sToken;
                settings.k8sUrl = k8sUrl;
                settings.gitLabToken = gitLabToken;
                //// ---------- PREPARE TO BUILD ------------ /////
                const actionsConfirmDeploy = ['Deploy now', 'Cancel'];
                if (settings.k8sUrl &&
                    settings.k8sToken &&
                    settings.project &&
                    settings.gitLabToken &&
                    settings.branch &&
                    settings.replicas) {
                    this.messageService
                        .info(`Are you sure launch deploy to PROJECT: ${settings.project}?`, ...actionsConfirmDeploy)
                        .then(async (action) => {
                        if (action === 'Deploy now') {
                            this.smartCLIDEBackendService.fileWrite(`${currentPath}/.smartclide-settings.json`, JSON.stringify(settings));
                            channel.show();
                            channel.appendLine(`Start deploy ${settings.project}...`);
                            const res = await (0, fetchMethods_1.postDeploy)(settings.user, settings.gitRepoUrl, settings.project, settings.k8sUrl, settings.hostname, settings.branch, settings.replicas, settings.deploymentPort, settings.k8sToken, settings.gitLabToken);
                            if (res === null || res === void 0 ? void 0 : res.message) {
                                this.messageService.warn(res === null || res === void 0 ? void 0 : res.message);
                                channel.appendLine(res === null || res === void 0 ? void 0 : res.message, output_channel_1.OutputChannelSeverity.Info);
                            }
                            else if (res._id) {
                                settings.lastDeploy = res._id;
                                this.smartCLIDEBackendService.fileWrite(`${currentPath}/.smartclide-settings.json`, JSON.stringify(settings));
                            }
                            else {
                                this.messageService.error('Something is worng restart process');
                                channel.appendLine('Something is worng restart process', output_channel_1.OutputChannelSeverity.Error);
                            }
                        }
                        else {
                            return;
                        }
                    })
                        .catch((err) => console.log('err', err));
                }
                else {
                    this.messageService.error('It is necessary to have at least one repository open.');
                    channel.appendLine('It is necessary to have at least one repository open.', output_channel_1.OutputChannelSeverity.Error);
                }
            },
        });
        commands.registerCommand(CommandDeploymentStatus, {
            execute: async () => {
                var _a, _b, _c;
                //// ---------- VARIABLES ------------ /////
                let settings = {
                    user: '',
                    gitRepoUrl: '',
                    project: '',
                    k8sUrl: '',
                    hostname: '',
                    branch: '',
                    replicas: 1,
                    deploymentPort: 8080,
                    k8sToken: '',
                    gitLabToken: '',
                    lastDeploy: '',
                };
                const channel = this.outputChannelManager.getChannel('SmartCLIDE');
                channel.clear();
                const currentProject = ((_b = (_a = this.workspaceService.workspace) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.split('.')[0]) || '';
                if (!currentProject) {
                    this.messageService.error('It is necessary to have at least one repository open.');
                    return;
                }
                const currentPath = ((_c = this.workspaceService.workspace) === null || _c === void 0 ? void 0 : _c.resource.path.toString()) || '';
                const prevSettings = await this.smartCLIDEBackendService.fileRead(`${currentPath}/.smartclide-settings.json`);
                if (prevSettings.errno) {
                    this.smartCLIDEBackendService.fileWrite(`${currentPath}/.smartclide-settings.json`, JSON.stringify(settings));
                    const newSettings = await this.smartCLIDEBackendService.fileRead(`${currentPath}/.smartclide-settings.json`);
                    settings = newSettings && { ...JSON.parse(newSettings) };
                }
                else {
                    settings = { ...JSON.parse(prevSettings) };
                }
                settings.project = currentProject;
                if (!currentPath || currentPath === '') {
                    this.messageService.error(`There have been problems getting the route.`);
                    return;
                }
                //// ---------- FLOW ------------ /////
                const optionsToken = {
                    placeHolder: 'Enter Project Secrect Token',
                    prompt: 'Enter Project Secrect Token:',
                };
                //// ---------- FLOW ------------ /////
                const newToken = !(settings === null || settings === void 0 ? void 0 : settings.gitLabToken)
                    ? await this.monacoQuickInputService
                        .input(optionsToken)
                        .then((value) => value || '')
                    : settings === null || settings === void 0 ? void 0 : settings.gitLabToken;
                settings.gitLabToken = newToken;
                const actionsConfirmBuild = ['Check now', 'Cancel'];
                if (!settings.lastDeploy || settings.lastDeploy === '') {
                    channel.show();
                    channel.appendLine(`We have not found the last deployment ...`);
                    return;
                }
                //// ---------- PREPARE TO BUILD ------------ /////
                (settings === null || settings === void 0 ? void 0 : settings.gitLabToken)
                    ? this.messageService
                        .info(`PROJECT: ${settings.project}`, ...actionsConfirmBuild)
                        .then(async (action) => {
                        if (action === 'Check now') {
                            channel.show();
                            channel.appendLine(`Checking status ${settings.project}...`);
                            if (settings.lastDeploy && settings.k8sToken) {
                                const res = await (0, fetchMethods_1.getDeploymentStatus)(settings.lastDeploy, settings.k8sToken);
                                this.smartCLIDEBackendService.fileWrite(`${currentPath}/.smartclide-settings.json`, JSON.stringify(settings));
                                if (!res.message) {
                                    channel.appendLine(`Status: Deployment are running...`, output_channel_1.OutputChannelSeverity.Warning);
                                }
                                else {
                                    channel.appendLine(`Status: ${res === null || res === void 0 ? void 0 : res.message}...`, output_channel_1.OutputChannelSeverity.Warning);
                                }
                            }
                        }
                        else {
                            return;
                        }
                    })
                        .catch((err) => this.messageService.error(err.message))
                    : this.messageService.error(`Error TOKEN are required`);
            },
        });
    }
    registerMenus(menus) {
        const subMenuPath = [...common_1.MAIN_MENU_BAR, 'deployments'];
        menus.registerSubmenu(subMenuPath, 'Deployments', {
            order: '5',
        });
        menus.registerMenuAction(subMenuPath, {
            commandId: SmartCLIDEDeploymentWidgetCommand.id,
            label: 'Dashboard',
            order: '3',
        });
        menus.registerMenuAction(subMenuPath, {
            commandId: CommandDeploymentStatus.id,
            label: 'Last deployment status',
            order: '2',
        });
        menus.registerMenuAction(subMenuPath, {
            commandId: CommandDeploymentDeploy.id,
            label: 'New deployment',
            order: '1',
        });
    }
    onStart(app) {
        if (!this.workspaceService.opened) {
            this.stateService.reachedState('initialized_layout').then(() => this.openView({
                activate: true,
                reveal: false,
            }));
        }
    }
    initializeLayout(app) {
        this.openView({ activate: true, reveal: true });
    }
};
__decorate([
    (0, inversify_1.inject)(frontend_application_state_1.FrontendApplicationStateService),
    __metadata("design:type", frontend_application_state_1.FrontendApplicationStateService)
], SmartCLIDEDeploymentWidgetContribution.prototype, "stateService", void 0);
__decorate([
    (0, inversify_1.inject)(workspace_service_1.WorkspaceService),
    __metadata("design:type", workspace_service_1.WorkspaceService)
], SmartCLIDEDeploymentWidgetContribution.prototype, "workspaceService", void 0);
__decorate([
    (0, inversify_1.inject)(protocol_1.SmartCLIDEBackendService),
    __metadata("design:type", Object)
], SmartCLIDEDeploymentWidgetContribution.prototype, "smartCLIDEBackendService", void 0);
__decorate([
    (0, inversify_1.inject)(common_1.MessageService),
    __metadata("design:type", common_1.MessageService)
], SmartCLIDEDeploymentWidgetContribution.prototype, "messageService", void 0);
__decorate([
    (0, inversify_1.inject)(output_channel_1.OutputChannelManager),
    __metadata("design:type", output_channel_1.OutputChannelManager)
], SmartCLIDEDeploymentWidgetContribution.prototype, "outputChannelManager", void 0);
__decorate([
    (0, inversify_1.inject)(monaco_quick_input_service_1.MonacoQuickInputService),
    __metadata("design:type", monaco_quick_input_service_1.MonacoQuickInputService)
], SmartCLIDEDeploymentWidgetContribution.prototype, "monacoQuickInputService", void 0);
__decorate([
    (0, inversify_1.inject)(common_2.Git),
    __metadata("design:type", Object)
], SmartCLIDEDeploymentWidgetContribution.prototype, "git", void 0);
__decorate([
    (0, inversify_1.inject)(git_repository_provider_1.GitRepositoryProvider),
    __metadata("design:type", git_repository_provider_1.GitRepositoryProvider)
], SmartCLIDEDeploymentWidgetContribution.prototype, "gitRepositoryProvider", void 0);
SmartCLIDEDeploymentWidgetContribution = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], SmartCLIDEDeploymentWidgetContribution);
exports.SmartCLIDEDeploymentWidgetContribution = SmartCLIDEDeploymentWidgetContribution;
class PlaceholderMenuNode {
    constructor(id, label, options) {
        this.id = id;
        this.label = label;
        this.options = options;
    }
    get icon() {
        var _a;
        return (_a = this.options) === null || _a === void 0 ? void 0 : _a.iconClass;
    }
    get sortString() {
        var _a;
        return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.order) || this.label;
    }
}
exports.PlaceholderMenuNode = PlaceholderMenuNode;
//# sourceMappingURL=widget-contribution.js.map