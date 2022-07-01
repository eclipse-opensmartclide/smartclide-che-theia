"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var extensionWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensionWidget = void 0;
const React = __importStar(require("react"));
const inversify_1 = require("inversify");
const alert_message_1 = require("@theia/core/lib/browser/widgets/alert-message");
const react_widget_1 = require("@theia/core/lib/browser/widgets/react-widget");
const core_1 = require("@theia/core");
const protocol_1 = require("../common/protocol");
const data_json_1 = __importDefault(require("./data.json"));
const explanation_json_1 = __importDefault(require("./explanation.json"));
const functions_1 = require("./functions");
const CreationalPatternsWizard_1 = require("./CreationalPatternsWizard");
const StructuralPatternsWizard_1 = require("./StructuralPatternsWizard");
const BehavioralPatternsWizard_1 = require("./BehavioralPatternsWizard");
/*interface Textfield{
    ident: number;
    value: string;
};*/
let extensionWidget = extensionWidget_1 = class extensionWidget extends react_widget_1.ReactWidget {
    async init() {
        this.id = extensionWidget_1.ID;
        this.title.label = extensionWidget_1.LABEL;
        this.title.caption = extensionWidget_1.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-info-circle';
        this.runprocess = this.runprocess.bind(this);
        this.updateSelection = this.updateSelection.bind(this);
        this.update();
    }
    render() {
        const header = `Choose a Design Pattern and get the code. `;
        return React.createElement("div", { id: 'widget-container' },
            React.createElement(alert_message_1.AlertMessage, { type: 'INFO', header: header }),
            React.createElement("div", { id: 'issues' },
                React.createElement("br", null),
                React.createElement("label", null, "Enter the project's name"),
                React.createElement("input", { id: "projectName", type: "text", autoComplete: "off", placeholder: "Project's name" }),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("select", { id: "drop-down-patterns", onChange: this.updateSelection, name: "statePatternSelection" },
                    React.createElement("option", { id: "empty-choice", value: "Choose_pattern" }, "Choose pattern"),
                    React.createElement("optgroup", { label: "Creational" },
                        React.createElement("option", { value: "AbstractFactory" }, "Abstract Factory"),
                        React.createElement("option", { value: "Builder" }, "Builder"),
                        React.createElement("option", { value: "FactoryMethod" }, "Factory Method"),
                        React.createElement("option", { value: "Prototype" }, "Prototype"),
                        React.createElement("option", { value: "Singleton" }, "Singleton")),
                    React.createElement("optgroup", { label: "Structural" },
                        React.createElement("option", { value: "Adapter" }, "Adapter"),
                        React.createElement("option", { value: "Bridge" }, "Bridge"),
                        React.createElement("option", { value: "Composite" }, "Composite"),
                        React.createElement("option", { value: "Decorator" }, "Decorator"),
                        React.createElement("option", { value: "Facade" }, "Facade"),
                        React.createElement("option", { value: "Flyweight" }, "Flyweight"),
                        React.createElement("option", { value: "Proxy" }, "Proxy")),
                    React.createElement("optgroup", { label: "Behavioral" },
                        React.createElement("option", { value: "ChainOfResponsibility" }, "Chain of Responsibility"),
                        React.createElement("option", { value: "Command" }, "Command"),
                        React.createElement("option", { value: "Mediator" }, "Mediator"),
                        React.createElement("option", { value: "Memento" }, "Memento"),
                        React.createElement("option", { value: "Observer" }, "Observer"),
                        React.createElement("option", { value: "State" }, "State"),
                        React.createElement("option", { value: "Strategy" }, "Strategy"),
                        React.createElement("option", { value: "TemplateMethod" }, "Template Method"),
                        React.createElement("option", { value: "Visitor" }, "Visitor"))),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("button", { id: "btn-get-code", type: "button", title: 'Assign roles to classes and methods', onClick: _a => this.runprocess() }, "Assign roles to classes and methods"),
                React.createElement("button", { id: "btn-wizard", type: "button", title: 'Wizard', onClick: _a => this.runWizard() }, "Wizard"),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("div", { id: "result" },
                    React.createElement("fieldset", null,
                        React.createElement("details", null,
                            React.createElement("summary", { id: 'description' }),
                            React.createElement("p", { id: 'example' }),
                            React.createElement("img", { id: "image", alt: "Class Diagram " }))),
                    React.createElement("form", { name: "myForm" },
                        React.createElement("table", { id: "show_pattern_table" })),
                    React.createElement("div", { id: "elements" },
                        React.createElement("button", { id: "btn-finalize", type: "button", title: 'Get the code according to the pattern', onClick: _a => this.buttonClick2(document.getElementById('show_pattern_table')) }, " Get Code "),
                        React.createElement("button", { id: "btn-back", type: "button", title: 'Go back', onClick: _a => this.goBackbuttonClick(document.getElementById('show_pattern_table')) }, " Back ")))),
            React.createElement("form", { name: "wizardForm" },
                React.createElement("div", { id: "divWiz" })));
    }
    async runprocess() {
        if (extensionWidget_1.state.statePatternSelection != "Choose_pattern" && extensionWidget_1.state.statePatternSelection != "" && document.getElementById("projectName").value != "") {
            document.getElementById("btn-get-code").style.visibility = 'hidden';
            document.getElementById("btn-wizard").style.visibility = 'hidden';
            var getUrl = document.getElementById("projectName").value;
            console.log('url -> ' + getUrl);
            extensionWidget_1.res = await this.helloBackendService.sayHelloTo(getUrl);
            extensionWidget_1.functions.setClassNames(extensionWidget_1.res);
            document.getElementById("result").style.visibility = 'visible';
            document.getElementById("btn-back").style.visibility = 'visible';
            document.getElementById('image').className = extensionWidget_1.state.statePatternSelection;
            document.getElementById('description').innerHTML = "<b>" + extensionWidget_1.state.statePatternSelection.split(/(?=[A-Z])/).join(" ") + "</b> " + extensionWidget_1.explanation[extensionWidget_1.state.statePatternSelection].description;
            document.getElementById('example').innerHTML = "<b>Example:</b> " + extensionWidget_1.explanation[extensionWidget_1.state.statePatternSelection].example;
            //show the JSON values for the chosen key-pattern
            let values = extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values; //data[extensionWidget.state.statePatternSelection];
            var table = document.getElementById('show_pattern_table');
            Object.keys(values).forEach(async (key) => {
                this.insertCells(table, key);
            });
        }
        else {
            if (extensionWidget_1.state.statePatternSelection == "Choose_pattern" || extensionWidget_1.state.statePatternSelection == "") {
                this.messageService.info('You need to choose a software pattern!');
            }
            if (document.getElementById("projectName").value == "") {
                this.messageService.info("You need to enter the project's name!");
            }
        }
    }
    //update the state of dropdown
    async updateSelection(e) {
        const key = e.currentTarget.name;
        extensionWidget_1.state[key] = e.currentTarget.value;
        if (document.getElementById("btn-get-code").style.visibility === 'hidden') {
            (document.getElementById("show_pattern_table")).innerHTML = "";
            await this.runprocess();
        }
    }
    insertCells(table, key) {
        if (extensionWidget_1.functions.check(key, extensionWidget_1.state.statePatternSelection)) {
            let index = 0;
            for (var i = 0; i < table.rows.length; i++) {
                let label = document.getElementById('label' + (i + 1)).innerHTML;
                if (key > label)
                    index++;
            }
            let row = table.insertRow(index);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell2.id = "cell2";
            extensionWidget_1.functions.createLabel(key, "label" + table.rows.length, cell1);
            extensionWidget_1.functions.createInput(key, "txtbox" + table.rows.length, "", "txtbox" + table.rows.length + key, "text", cell2);
            if (extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values[key].extension == 1) {
                let cell3 = row.insertCell(2);
                extensionWidget_1.functions.createButton("+", "btn" + key, table);
                cell3.appendChild(document.getElementById("btn" + key));
                document.getElementById("btn" + key).addEventListener('click', (event) => {
                    this.extensionButtonClick(table, event.target.id, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values);
                });
            }
        }
    }
    //when button is clicked adds one label and one input of the specific class that the user wants to insert one more 
    extensionButtonClick(table, key, values) {
        let newValues = JSON.parse(JSON.stringify(values));
        let count = this.countKeys(values, key.substring(3));
        let label = this.updateLabel(key.substring(3), count + 1);
        if (extensionWidget_1.state.statePatternSelection == "AbstractFactory") {
            if (key.includes("Product") && !key.includes("ConcreteProduct")) {
                count = count - this.countKeys(values, "ConcreteProduct");
                label = this.updateLabel(key.substring(3), count + 1);
                newValues[label] = { name: "", extension: 0 };
                extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
                this.insertCells(table, label);
                var numProd = (this.countKeys(values, "ConcreteProduct") / count); // number of "Products" in each Product
                for (let j = 0; j < numProd; j++) {
                    let labelProduct = "ConcreteProduct" + (count + 1) + "." + (j + 1);
                    newValues[labelProduct] = { "name": "", "extension": 0 };
                    extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
                    this.insertCells(table, labelProduct);
                }
            }
            else {
                newValues[label] = { "name": "", "extension": 0 };
                extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
                this.insertCells(table, label);
                let numProd = this.countKeys(newValues, "Product") - this.countKeys(values, "ConcreteProduct");
                for (let j = 0; j < numProd; j++) {
                    let labelProduct = "ConcreteProduct" + (j + 1) + "." + (count + 1);
                    newValues[labelProduct] = { "name": "", "extension": 0 };
                    extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
                    this.insertCells(table, labelProduct);
                }
            }
        }
        else if (extensionWidget_1.state.statePatternSelection == "Builder" && key.includes("Product")) {
            let labelConBuilder = this.updateLabel("ConcreteBuilder ", count + 1);
            newValues[label] = { "name": "", "extension": 0 };
            newValues[labelConBuilder] = { "name": "", "extension": 0 };
            extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
            this.insertCells(table, label);
            this.insertCells(table, labelConBuilder);
        }
        else if (extensionWidget_1.state.statePatternSelection == "FactoryMethod") {
            let labelConCr = this.updateLabel("ConcreteCreator ", count + 1);
            newValues[label] = { "name": "", "extension": 0 };
            newValues[labelConCr] = { "name": "", "extension": 0 };
            extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
            this.insertCells(table, label);
            this.insertCells(table, labelConCr);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Decorator" && key.includes("ConcreteDecorator")) {
            let labelConDec = this.updateLabel(key.substring(3), (count / 2 + 1));
            let labelmethod = labelConDec + "Method";
            newValues[labelConDec] = { "name": "", "extension": 0 };
            newValues[labelmethod] = { "name": "", "extension": 0 };
            extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
            this.insertCells(table, labelConDec);
            this.insertCells(table, labelmethod);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Flyweight") {
            let label = this.updateLabel(key.substring(3), count / 2 + 1);
            let labelAttr = label + "Attribute";
            newValues[label] = { "name": "", "extension": 0 };
            newValues[labelAttr] = { "name": "", "extension": 0 };
            extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
            this.insertCells(table, label);
            this.insertCells(table, labelAttr);
        }
        else if (extensionWidget_1.state.statePatternSelection == "Command") {
            if (key.includes("MethodParameter")) {
                let count = 0;
                key = key.substring(3);
                let nkey = key.substring(0, key.length - 1);
                Object.keys(newValues).forEach((vkey) => {
                    if (vkey.includes(nkey)) {
                        count++;
                    }
                });
                let label = this.updateLabel(key, count + 1);
                newValues[label] = { "name": "", "extension": 0 };
                extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
                this.insertCells(table, label);
            }
            else {
                let count2 = this.countKeys(values, "MethodParameter");
                let labelConCommand = this.updateLabel("ConcreteCommand ", (count - count2) / 2 + 1);
                let labelConComMeth = labelConCommand + "Method";
                let labelConComMethParam = labelConCommand + "MethodParameter1";
                newValues[labelConCommand] = { "name": "", "extension": 0 };
                newValues[labelConComMeth] = { "name": "", "extension": 0 };
                newValues[labelConComMethParam] = { "name": "", "extension": 1 };
                extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
                this.insertCells(table, labelConCommand);
                this.insertCells(table, labelConComMeth);
                this.insertCells(table, labelConComMethParam);
            }
        }
        else {
            newValues[label] = { "name": "", "extension": 0 };
            extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = newValues;
            this.insertCells(table, label);
        }
    }
    async goBackbuttonClick(table) {
        document.getElementById("btn-get-code").style.visibility = 'visible';
        document.getElementById("btn-wizard").style.visibility = 'visible';
        document.getElementById("btn-back").style.visibility = 'hidden';
        document.getElementById("result").style.visibility = 'hidden';
        extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = extensionWidget_1.initialData[extensionWidget_1.state.statePatternSelection].values;
        table.innerHTML = "";
    }
    async goBackbuttonClickWizard(div) {
        document.getElementById('issues').style.visibility = 'visible';
        document.getElementById('issues').style.height = 'min-content';
        document.getElementById("btn-get-code").style.visibility = 'visible';
        document.getElementById("btn-wizard").style.visibility = 'visible';
        document.getElementById("btn-back").style.visibility = 'hidden';
        document.getElementById("result").style.visibility = 'hidden';
        div.innerHTML = "";
    }
    async buttonClick2(table) {
        let message = extensionWidget_1.functions.checkInputsOnSubmit(0);
        if (message.includes("Input is valid")) {
            var getUrl = document.getElementById("projectName").value;
            if (extensionWidget_1.state.statePatternSelection == "Adapter") {
                let adapteeName = document.getElementById("txtbox4").value;
                var methodNames = await this.helloBackendService.getMethods(getUrl, adapteeName);
                if (extensionWidget_1.res.includes(adapteeName)) {
                    let methodName = document.getElementById("txtbox5").value;
                    if (methodNames.includes(methodName)) {
                        extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = extensionWidget_1.functions.updateJsonObject(extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values);
                        this.messageService.info("Well done! Code is coming...");
                        extensionWidget_1.functions.checkMessage(await this.helloBackendService.codeGeneration(getUrl, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values, extensionWidget_1.state.statePatternSelection), this.messageService);
                    }
                    else {
                        this.messageService.info("For Adaptee method you need to choose a method name that already exists in Adaptee class: " + methodNames);
                    }
                }
                else {
                    this.messageService.info("For Adaptee you need to choose a class name that already exists: " + extensionWidget_1.res);
                }
            }
            else if (extensionWidget_1.state.statePatternSelection == "AbstractFactory") {
                extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = extensionWidget_1.functions.updateJsonObject(extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values);
                extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = extensionWidget_1.functions.insertInputsAbstractFactory(extensionWidget_1.data["AbstractFactory"].values);
                extensionWidget_1.functions.checkMessage(await this.helloBackendService.codeGeneration(getUrl, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values, extensionWidget_1.state.statePatternSelection), this.messageService);
            }
            else if (extensionWidget_1.state.statePatternSelection == "FactoryMethod") {
                extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = extensionWidget_1.functions.updateJsonObject(extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values);
                extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = extensionWidget_1.functions.insertInputsFactoryMethod(extensionWidget_1.data["FactoryMethod"].values);
                extensionWidget_1.functions.checkMessage(await this.helloBackendService.codeGeneration(getUrl, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values, extensionWidget_1.state.statePatternSelection), this.messageService);
            }
            else if (extensionWidget_1.state.statePatternSelection == "Builder") {
                extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = extensionWidget_1.functions.updateJsonObject(extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values);
                extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = extensionWidget_1.functions.insertInputsBuilder(extensionWidget_1.data["Builder"].values);
                extensionWidget_1.functions.checkMessage(await this.helloBackendService.codeGeneration(getUrl, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values, extensionWidget_1.state.statePatternSelection), this.messageService);
            }
            else {
                extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values = extensionWidget_1.functions.updateJsonObject(extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values);
                extensionWidget_1.functions.checkMessage(await this.helloBackendService.codeGeneration(getUrl, extensionWidget_1.data[extensionWidget_1.state.statePatternSelection].values, extensionWidget_1.state.statePatternSelection), this.messageService);
            }
        }
        else {
            this.messageService.info(message);
        }
    }
    updateLabel(value, count) {
        return (value.includes('.') ? value.substring(0, value.length - 2) + '.' + count : value.slice(0, -1) + count);
    }
    countKeys(values, keyString) {
        let count = 0;
        let str = keyString.replace(/\d/g, ''); //removes the numbers from the string and returns a new one
        Object.keys(values).forEach((key) => {
            if (key.includes(str)) {
                count++;
            }
        });
        return count;
    }
    async runWizard() {
        if (document.getElementById("projectName").value != "") {
            document.getElementById('issues').style.visibility = 'hidden';
            document.getElementById('issues').style.height = '0';
            document.getElementById('result').style.visibility = 'hidden';
            document.getElementById('btn-get-code').style.visibility = 'hidden';
            document.getElementById('btn-wizard').style.visibility = 'hidden';
            var getUrl = document.getElementById("projectName").value;
            extensionWidget_1.res = await this.helloBackendService.sayHelloTo(getUrl);
            extensionWidget_1.functions.setClassNames(extensionWidget_1.res);
            let divWiz = document.getElementById('divWiz');
            divWiz.style.marginLeft = '10px';
            let divCont = document.createElement('div');
            extensionWidget_1.functions.createLabel('Choose the type of the pattern: <br>', 'label0', divWiz);
            extensionWidget_1.functions.createLabel('Creational', 'label1', divWiz);
            extensionWidget_1.functions.createInput('', 'radio1', '', 'patternTypes', 'radio', divWiz);
            let radio1 = document.getElementById('radio1');
            radio1.addEventListener('click', async (e) => {
                extensionWidget_1.creationalPatterns.creationalPatternswizard(divCont, this.messageService, this.helloBackendService);
            });
            extensionWidget_1.functions.createLabel('Structural', 'label2', divWiz);
            extensionWidget_1.functions.createInput('', 'radio2', '', 'patternTypes', 'radio', divWiz);
            let radio2 = document.getElementById('radio2');
            radio2.addEventListener('click', async (e) => {
                extensionWidget_1.structuralPatterns.structuralPatternsWizard(divCont, this.messageService, this.helloBackendService, extensionWidget_1.res);
            });
            extensionWidget_1.functions.createLabel('Behavioral', 'label3', divWiz);
            extensionWidget_1.functions.createInput('', 'radio3', '', 'patternTypes', 'radio', divWiz);
            let radio3 = document.getElementById('radio3');
            radio3.addEventListener('click', async (e) => {
                divCont.innerHTML = "";
                extensionWidget_1.functions.createLabel('<br> Do you want to ... <br>', 'labelQuestion19', divCont);
            });
            divWiz.appendChild(divCont);
        }
        else {
            this.messageService.info("You need to enter the project's name!");
        }
    }
};
extensionWidget.ID = 'smartclide-design-pattern-selection-theia:widget';
extensionWidget.LABEL = 'Smartclide Design Pattern Selection';
extensionWidget.state = {
    statePatternSelection: ''
};
extensionWidget.data = JSON.parse(JSON.stringify(data_json_1.default));
extensionWidget.initialData = JSON.parse(JSON.stringify(data_json_1.default));
extensionWidget.explanation = JSON.parse(JSON.stringify(explanation_json_1.default));
extensionWidget.functions = new functions_1.Functions();
extensionWidget.creationalPatterns = new CreationalPatternsWizard_1.CreationalPatterns();
extensionWidget.structuralPatterns = new StructuralPatternsWizard_1.StructuralPatterns();
extensionWidget.behavioralPatterns = new BehavioralPatternsWizard_1.BehavioralPatterns();
__decorate([
    (0, inversify_1.inject)(core_1.MessageService),
    __metadata("design:type", core_1.MessageService)
], extensionWidget.prototype, "messageService", void 0);
__decorate([
    (0, inversify_1.inject)(protocol_1.HelloBackendService),
    __metadata("design:type", Object)
], extensionWidget.prototype, "helloBackendService", void 0);
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], extensionWidget.prototype, "init", null);
extensionWidget = extensionWidget_1 = __decorate([
    (0, inversify_1.injectable)()
], extensionWidget);
exports.extensionWidget = extensionWidget;
//# sourceMappingURL=extension-widget.js.map