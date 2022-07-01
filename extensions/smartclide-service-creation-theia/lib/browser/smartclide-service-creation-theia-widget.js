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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SmartclideServiceCreationTheiaWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartclideServiceCreationTheiaWidget = void 0;
const React = __importStar(require("react"));
const inversify_1 = require("inversify");
const alert_message_1 = require("@theia/core/lib/browser/widgets/alert-message");
const react_widget_1 = require("@theia/core/lib/browser/widgets/react-widget");
const core_1 = require("@theia/core");
const command_1 = require("@theia/core/lib/common/command");
const smartclide_frontend_comm_1 = require("@unparallel/smartclide-frontend-comm");
let SmartclideServiceCreationTheiaWidget = SmartclideServiceCreationTheiaWidget_1 = class SmartclideServiceCreationTheiaWidget extends react_widget_1.ReactWidget {
    constructor() {
        super(...arguments);
        //Handle TOKEN_INFO message from parent
        this.handleTokenInfo = ({ data }) => {
            switch (data.type) {
                case smartclide_frontend_comm_1.messageTypes.TOKEN_INFO:
                    console.log("RECEIVED", JSON.stringify(data, undefined, 4));
                    SmartclideServiceCreationTheiaWidget_1.state.stateKeycloakToken = data.content;
                    break;
                case smartclide_frontend_comm_1.messageTypes.TOKEN_REVOKE:
                    console.log("RECEIVED", JSON.stringify(data, undefined, 4));
                    window.removeEventListener("message", this.handleTokenInfo);
                    break;
                default:
                    break;
            }
        };
    }
    async init() {
        this.id = SmartclideServiceCreationTheiaWidget_1.ID;
        this.title.label = SmartclideServiceCreationTheiaWidget_1.LABEL;
        this.title.caption = SmartclideServiceCreationTheiaWidget_1.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-cogs';
        this.update();
        //Add even listener to get the Keycloak Token
        window.addEventListener("message", this.handleTokenInfo);
        //Send a message to inform SmartCLIDE IDE
        let message = (0, smartclide_frontend_comm_1.buildMessage)(smartclide_frontend_comm_1.messageTypes.COMPONENT_HELLO);
        window.parent.postMessage(message, "*");
    }
    render() {
        const header = `Provide the GitLab project configuration details.`;
        return React.createElement("div", { id: 'widget-container-ServiceCreation' },
            React.createElement(alert_message_1.AlertMessage, { type: 'INFO', header: header }),
            React.createElement("div", { id: 'info' },
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { className: 'cellID' }, "Service Creation URL"),
                            React.createElement("td", null,
                                React.createElement("input", { onChange: this.updateInput, placeholder: 'Service', name: 'stateServiceURL' }))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: 'cellID' }, "GitLab Server URL"),
                            React.createElement("td", null,
                                React.createElement("input", { onChange: this.updateInput, placeholder: 'URL', name: 'stateGitlabURL' }))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: 'cellID' }, "GitLab Token"),
                            React.createElement("td", null,
                                React.createElement("input", { type: 'password', onChange: this.updateInput, placeholder: 'Token', name: 'stateGitlabToken' }))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: 'cellID' }, "Project Name"),
                            React.createElement("td", null,
                                React.createElement("input", { onChange: this.updateInput, maxLength: 100, placeholder: 'Name', name: 'stateName' }))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: 'cellID' }, "Project Visibility"),
                            React.createElement("td", { id: 'radio_buttons' },
                                React.createElement("input", { className: 'inputRadio', type: "radio", id: "visibility1", name: "visibility", value: "0", onChange: this.onValueChange }),
                                React.createElement("label", { htmlFor: "visibility1" }, "public"),
                                React.createElement("input", { className: 'inputRadio', type: "radio", id: "visibility2", name: "visibility", value: "1", onChange: this.onValueChange }),
                                React.createElement("label", { htmlFor: "visibility2" }, "internal"),
                                React.createElement("input", { className: 'inputRadio', type: "radio", id: "visibility3", name: "visibility", value: "2", onChange: this.onValueChange }),
                                React.createElement("label", { htmlFor: "visibility3" }, "private"))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: 'cellID' }, "Description"),
                            React.createElement("td", null,
                                React.createElement("textarea", { id: "textDescription", onChange: this.updateInputTextArea, rows: 2 }))))),
                React.createElement("label", null,
                    React.createElement("input", { type: "checkbox", onChange: this.onCheckBoxChange }),
                    "Use Jenkins"),
                React.createElement("table", { id: 'jenkins', style: { display: 'none' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { className: 'cellID' }, "Jenkins Server Url"),
                            React.createElement("td", null,
                                React.createElement("input", { onChange: this.updateInput, placeholder: 'URL', name: 'stateJenkinsURL' }))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: 'cellID' }, "Jenkins Username"),
                            React.createElement("td", null,
                                React.createElement("input", { onChange: this.updateInput, maxLength: 100, placeholder: 'Username', name: 'stateJenkinsUser' }))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: 'cellID' }, "Jenkins Token"),
                            React.createElement("td", null,
                                React.createElement("input", { type: 'password', onChange: this.updateInput, placeholder: 'Token', name: 'stateJenkinsToken' })))))),
            React.createElement("button", { className: 'theia-button secondary', title: 'Create', onClick: _a => this.runprocess() }, "Run"),
            React.createElement("div", { id: 'waitAnimation', className: "lds-dual-ring" }),
            React.createElement("i", { id: 'message' }));
    }
    async runprocess() {
        console.log('...');
        console.log(SmartclideServiceCreationTheiaWidget_1.state.stateKeycloakToken);
        console.log('...');
        //if all the fields have values
        if (SmartclideServiceCreationTheiaWidget_1.state.stateServiceURL != '' &&
            SmartclideServiceCreationTheiaWidget_1.state.stateName != '' && SmartclideServiceCreationTheiaWidget_1.state.stateGitlabURL != '' &&
            SmartclideServiceCreationTheiaWidget_1.state.stateGitlabToken != '' && SmartclideServiceCreationTheiaWidget_1.state.stateProjectVisibility != '' &&
            SmartclideServiceCreationTheiaWidget_1.state.stateDescription != '' && document.getElementById("jenkins").style.display == "none") {
            //waiting animation start
            document.getElementById("waitAnimation").style.display = "block";
            //post request
            fetch(SmartclideServiceCreationTheiaWidget_1.state.stateServiceURL + '/createStructure', {
                method: 'post',
                headers: {
                    'Accept': '*/*',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + SmartclideServiceCreationTheiaWidget_1.state.stateKeycloakToken,
                    'projectName': SmartclideServiceCreationTheiaWidget_1.state.stateName,
                    'gitLabServerURL': SmartclideServiceCreationTheiaWidget_1.state.stateGitlabURL,
                    'gitlabToken': SmartclideServiceCreationTheiaWidget_1.state.stateGitlabToken,
                    'projVisibility': SmartclideServiceCreationTheiaWidget_1.state.stateProjectVisibility,
                    'projDescription': SmartclideServiceCreationTheiaWidget_1.state.stateDescription
                }
            }).then(res => res.json())
                .then((out) => {
                var obj = JSON.parse(JSON.stringify(out));
                //waiting animation stop
                document.getElementById("waitAnimation").style.display = "none";
                //show message get from service
                document.getElementById("message").style.display = "block";
                document.getElementById('message').innerHTML = obj.message;
                //check post request status
                if (obj.status == 0) {
                    this.messageService.info('Successful Execution');
                    //Create dir and clone
                    this.createAndClone(obj.message);
                }
                else {
                    this.messageService.info('Error In Execution');
                }
            })
                .catch(err => {
                document.getElementById("waitAnimation").style.display = "none";
                console.log('err: ', err);
                document.getElementById("message").style.display = "block";
                document.getElementById('message').innerHTML = 'Error With Service';
            });
        }
        else if (SmartclideServiceCreationTheiaWidget_1.state.stateServiceURL != '' &&
            SmartclideServiceCreationTheiaWidget_1.state.stateName != '' && SmartclideServiceCreationTheiaWidget_1.state.stateGitlabURL != '' &&
            SmartclideServiceCreationTheiaWidget_1.state.stateGitlabToken != '' && SmartclideServiceCreationTheiaWidget_1.state.stateProjectVisibility != '' &&
            SmartclideServiceCreationTheiaWidget_1.state.stateDescription != '' && SmartclideServiceCreationTheiaWidget_1.state.stateJenkinsURL != '' &&
            SmartclideServiceCreationTheiaWidget_1.state.stateJenkinsUser != '' && SmartclideServiceCreationTheiaWidget_1.state.stateJenkinsToken != '' &&
            document.getElementById("jenkins").style.display == "block") {
            //waiting animation start
            document.getElementById("waitAnimation").style.display = "block";
            //post request
            fetch(SmartclideServiceCreationTheiaWidget_1.state.stateServiceURL + '/createStructure', {
                method: 'post',
                headers: {
                    'Accept': '*/*',
                    'Access-Control-Allow-Origin': '*',
                    'projectName': SmartclideServiceCreationTheiaWidget_1.state.stateName,
                    'gitLabServerURL': SmartclideServiceCreationTheiaWidget_1.state.stateGitlabURL,
                    'gitlabToken': SmartclideServiceCreationTheiaWidget_1.state.stateGitlabToken,
                    'projVisibility': SmartclideServiceCreationTheiaWidget_1.state.stateProjectVisibility,
                    'projDescription': SmartclideServiceCreationTheiaWidget_1.state.stateDescription,
                    'jenkinsServerUrl': SmartclideServiceCreationTheiaWidget_1.state.stateJenkinsURL,
                    'jenkinsUsername': SmartclideServiceCreationTheiaWidget_1.state.stateJenkinsUser,
                    'jenkinsToken': SmartclideServiceCreationTheiaWidget_1.state.stateJenkinsToken
                }
            }).then(res => res.json())
                .then((out) => {
                var obj = JSON.parse(JSON.stringify(out));
                //waiting animation stop
                document.getElementById("waitAnimation").style.display = "none";
                //show message get from service
                document.getElementById("message").style.display = "block";
                document.getElementById('message').innerHTML = obj.message;
                //check post request status
                if (obj.status == 0) {
                    this.messageService.info('Successful Execution');
                    //Create dir and clone
                    this.createAndClone(obj.message);
                }
                else {
                    this.messageService.info('Error In Execution');
                }
            })
                .catch(err => {
                document.getElementById("waitAnimation").style.display = "none";
                console.log('err: ', err);
                document.getElementById("message").style.display = "block";
                document.getElementById('message').innerHTML = 'Error With Service';
            });
        }
        else {
            document.getElementById("message").style.display = "none";
            this.messageService.info('Provide values for all fields');
        }
    }
    //create dir and clone
    createAndClone(message) {
        //Create dir and clone
        (async () => {
            try {
                //Clone
                let gitClone = 'https://oauth2:' + SmartclideServiceCreationTheiaWidget_1.state.stateGitlabToken
                    + '@' + message.replace('https://', '');
                this.commandService.executeCommand('git.clone', gitClone);
                //go to Open Folder
                this.commandService.executeCommand('workspace:open');
            }
            catch (e) {
                this.messageService.info('Error in git clone');
            }
        })();
    }
    //update the state
    updateInput(e) {
        const key = e.currentTarget.name;
        SmartclideServiceCreationTheiaWidget_1.state[key] = e.currentTarget.value;
    }
    //update for text
    updateInputTextArea(e) {
        SmartclideServiceCreationTheiaWidget_1.state.stateDescription = e.currentTarget.value;
    }
    //update for radio group
    onValueChange(event) {
        SmartclideServiceCreationTheiaWidget_1.state.stateProjectVisibility = event.target.value;
    }
    //update Jenkins visibility
    onCheckBoxChange(e) {
        if (e.target.checked) {
            document.getElementById("jenkins").style.display = "block";
        }
        else {
            document.getElementById("jenkins").style.display = "none";
        }
    }
};
SmartclideServiceCreationTheiaWidget.ID = 'smartclide-service-creation-theia:widget';
SmartclideServiceCreationTheiaWidget.LABEL = 'Smartclide Service Creation';
SmartclideServiceCreationTheiaWidget.state = {
    stateServiceURL: '',
    stateName: '',
    stateGitlabURL: '',
    stateGitlabToken: '',
    stateProjectVisibility: '',
    stateDescription: '',
    stateJenkinsURL: '',
    stateJenkinsUser: '',
    stateJenkinsToken: '',
    stateKeycloakToken: ''
};
__decorate([
    (0, inversify_1.inject)(core_1.MessageService),
    __metadata("design:type", core_1.MessageService)
], SmartclideServiceCreationTheiaWidget.prototype, "messageService", void 0);
__decorate([
    (0, inversify_1.inject)(command_1.CommandService),
    __metadata("design:type", Object)
], SmartclideServiceCreationTheiaWidget.prototype, "commandService", void 0);
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartclideServiceCreationTheiaWidget.prototype, "init", null);
SmartclideServiceCreationTheiaWidget = SmartclideServiceCreationTheiaWidget_1 = __decorate([
    (0, inversify_1.injectable)()
], SmartclideServiceCreationTheiaWidget);
exports.SmartclideServiceCreationTheiaWidget = SmartclideServiceCreationTheiaWidget;
//# sourceMappingURL=smartclide-service-creation-theia-widget.js.map