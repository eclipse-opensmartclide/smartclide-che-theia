"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructuralPatterns = void 0;
const data_json_1 = __importDefault(require("./data.json"));
const functions_1 = require("./functions");
class StructuralPatterns {
    structuralPatternsWizard(divCont, messageService, helloBackendService, classesNames) {
        divCont.innerHTML = "";
        let divCont1 = document.createElement('div');
        StructuralPatterns.functions.radioQuestion('<br> Do you need to implement a function that requires information from 2 different hierarchies? <br>', 'Yes', 'No', 'radio21', 'radio22', divCont);
        let radio21 = document.getElementById('radio21');
        radio21.addEventListener('click', async (e) => {
            divCont1.innerHTML = "";
            let divCont1b = document.createElement('div');
            StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the 1st hierarchy (the class which is called from the client)<br>', 1, 'text', "1st Hierarchy's name", 'txtboxAbstraction', 'infoField', 'buttonNext', divCont1);
            let buttonNext = document.getElementById('buttonNext');
            buttonNext.addEventListener('click', async (e) => {
                divCont1b.innerHTML = "";
                let divCont2 = document.createElement('div');
                StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the function that needs the 2 hierarchies <br>', 1, 'text', "1st Hierarchy's Method", 'txtboxAbstractionMethod', 'infoField', 'buttonNextb', divCont1b);
                let buttonNextb = document.getElementById('buttonNextb');
                buttonNextb.addEventListener('click', async (e) => {
                    divCont2.innerHTML = "";
                    let divCont3 = document.createElement('div');
                    StructuralPatterns.functions.textfieldQuestion('<br> How many subclasses does the 1st hierarchy has? <br>', 1, 'number', '1', 'numOfRefinedAbstractions', '', 'buttonNext1', divCont2);
                    let buttonNext1 = document.getElementById('buttonNext1');
                    buttonNext1.addEventListener('click', async (e) => {
                        divCont3.innerHTML = "";
                        let divCont4 = document.createElement('div');
                        StructuralPatterns.functions.textfieldQuestion("<br> Insert the names of the 1st hierarchy's subclasses  <br>", parseInt(document.getElementById('numOfRefinedAbstractions').value), 'text', "Subclass's name ", 'txtboxRefinedAbstraction', 'infoField', 'buttonNext2', divCont3);
                        let buttonNext2 = document.getElementById('buttonNext2');
                        buttonNext2.addEventListener('click', async (e) => {
                            divCont4.innerHTML = "";
                            let divCont4b = document.createElement('div');
                            StructuralPatterns.functions.textfieldQuestion('<br> Insert the name of the 2nd hierarchy <br>', 1, 'text', "2nd Hierarchy's name", 'txtboxImplementation', 'infoField', 'buttonNext3', divCont4);
                            let buttonNext3 = document.getElementById('buttonNext3');
                            buttonNext3.addEventListener('click', async (e) => {
                                divCont4b.innerHTML = "";
                                let divCont5 = document.createElement('div');
                                StructuralPatterns.functions.textfieldQuestion("<br> Insert the name of the 2nd hierarchy's function  <br>", 1, 'text', "2nd Hierarchy's Method", 'txtboxImplementationMethod', 'infoField', 'buttonNext3b', divCont4b);
                                let buttonNext3b = document.getElementById('buttonNext3b');
                                buttonNext3b.addEventListener('click', async (e) => {
                                    divCont5.innerHTML = "";
                                    let divCont6 = document.createElement('div');
                                    StructuralPatterns.functions.textfieldQuestion('<br> How many subclasses does the 2nd hierarchy has? <br>', 1, 'number', '1', 'numOfConcreteImplementations', '', 'buttonNext4', divCont5);
                                    let buttonNext4 = document.getElementById('buttonNext4');
                                    buttonNext4.addEventListener('click', async (e) => {
                                        divCont6.innerHTML = "";
                                        let divCont7 = document.createElement('div');
                                        StructuralPatterns.functions.textfieldQuestion("<br> Insert the names of the 2nd hierarchy's subclasses <br>", parseInt(document.getElementById('numOfConcreteImplementations').value), 'text', "Subclass's name ", 'txtboxConcreteImplementation', 'infoField', 'buttonNext5', divCont6);
                                        let buttonNext5 = document.getElementById('buttonNext5');
                                        buttonNext5.addEventListener('click', async (e) => {
                                            divCont7.innerHTML = "";
                                            StructuralPatterns.functions.createLabel('<br> <b>Bridge Pattern</b>  ', '', divCont7);
                                            StructuralPatterns.functions.createButton('Get Code', 'buttongetcodeBridgePattern', divCont7);
                                            let buttonCodeBP = document.getElementById('buttongetcodeBridgePattern');
                                            buttonCodeBP.addEventListener('click', async (e) => {
                                                let infoList = document.getElementsByClassName('infoField');
                                                StructuralPatterns.values["Bridge"].values["Abstraction"].name = infoList.item(0).value;
                                                StructuralPatterns.values["Bridge"].values["AbstractionMethod"].name = infoList.item(1).value;
                                                let numRefAb = parseInt(document.getElementById('numOfRefinedAbstractions').value);
                                                let numImpl = parseInt(document.getElementById('numOfConcreteImplementations').value);
                                                let i = 2;
                                                for (var j = 1; j <= numRefAb; j++) {
                                                    StructuralPatterns.values["Bridge"].values["RefinedAbstraction" + j] = { "name": "", "extension": 1 };
                                                    let v1 = infoList.item(i).value;
                                                    StructuralPatterns.values["Bridge"].values["RefinedAbstraction" + j].name = v1;
                                                    i++;
                                                }
                                                StructuralPatterns.values["Bridge"].values["Implementation"].name = infoList.item(i).value;
                                                i++;
                                                StructuralPatterns.values["Bridge"].values["ImplementationMethod"].name = infoList.item(i).value;
                                                i++;
                                                for (var j = 1; j <= numImpl; j++) {
                                                    StructuralPatterns.values["Bridge"].values["ConcreteImplementation" + j] = { "name": "", "extension": 1 };
                                                    let v2 = infoList.item(i++).value;
                                                    StructuralPatterns.values["Bridge"].values["ConcreteImplementation" + j].name = v2;
                                                }
                                                //console.log(JSON.stringify(StructuralPatterns.values["Bridge"]));
                                                let message = StructuralPatterns.functions.checkInputsOnSubmit(1);
                                                if (message == "Input is valid") {
                                                    var getUrl = document.getElementById("projectName").value;
                                                    StructuralPatterns.functions.checkMessage(await helloBackendService.codeGeneration(getUrl, StructuralPatterns.values["Bridge"].values, "Bridge"), messageService);
                                                }
                                                else {
                                                    messageService.info(message);
                                                }
                                            });
                                        });
                                        divCont6.appendChild(divCont7);
                                    });
                                    divCont5.appendChild(divCont6);
                                });
                                divCont4b.appendChild(divCont5);
                            });
                            divCont4.appendChild(divCont4b);
                        });
                        divCont3.appendChild(divCont4);
                    });
                    divCont2.appendChild(divCont3);
                });
                divCont1b.appendChild(divCont2);
            });
            divCont1.appendChild(divCont1b);
        });
        let radio22 = document.getElementById('radio22');
        radio22.addEventListener('click', async (e) => {
            divCont1.innerHTML = "";
            let divCont2 = document.createElement('div');
            StructuralPatterns.functions.radioQuestion('<br>Is any of  your objects a composite one (i.e. comprised of simple objects), which however needs to be treated uniformly along with simple objects?<br>', 'Yes', 'No', 'radio221', 'radio222', divCont1);
            let radio221 = document.getElementById('radio221');
            radio221.addEventListener('click', async (e) => {
                divCont2.innerHTML = "";
                let divCont3 = document.createElement('div');
                StructuralPatterns.functions.textfieldQuestion('<br> Insert the name Interface representing both Composite and Simple objects <br>', 1, 'text', 'Interface name', 'txtboxInterface', 'infoField', 'buttonNext', divCont2);
                let buttonNext = document.getElementById('buttonNext');
                buttonNext.addEventListener('click', async (e) => {
                    divCont3.innerHTML = "";
                    let divCont4 = document.createElement('div');
                    StructuralPatterns.functions.textfieldQuestion('<br> How many common functionalities does the Interface offer? <br>', 1, 'number', '1', 'NumOfInterfaceMethods', '', 'buttonNext1', divCont3);
                    let buttonNext1 = document.getElementById('buttonNext1');
                    buttonNext1.addEventListener('click', async (e) => {
                        divCont4.innerHTML = "";
                        let divCont5 = document.createElement('div');
                        StructuralPatterns.functions.textfieldQuestion('<br> Insert the name of each functionality <br>', parseInt(document.getElementById('NumOfInterfaceMethods').value), 'text', 'Functionality name ', 'txtboxFunctionalities', 'infoField', 'buttonNext2', divCont4);
                        let buttonNext2 = document.getElementById('buttonNext2');
                        buttonNext2.addEventListener('click', async (e) => {
                            divCont5.innerHTML = "";
                            let divCont6 = document.createElement('div');
                            StructuralPatterns.functions.textfieldQuestion('<br> How many types of Simple objects exist? <br>', 1, 'number', '1', 'NumOfSimpleObjectsTypes', '', 'buttonNext3', divCont5);
                            let buttonNext3 = document.getElementById('buttonNext3');
                            buttonNext3.addEventListener('click', async (e) => {
                                divCont6.innerHTML = "";
                                let divCont7 = document.createElement('div');
                                StructuralPatterns.functions.textfieldQuestion('<br> Insert the names of the Simple objects <br>', parseInt(document.getElementById('NumOfSimpleObjectsTypes').value), 'text', 'Simple Object name ', 'txtboxSimpleObjects', 'infoField', 'buttonNext4', divCont6);
                                let buttonNext4 = document.getElementById('buttonNext4');
                                buttonNext4.addEventListener('click', async (e) => {
                                    divCont7.innerHTML = "";
                                    let divCont8 = document.createElement('div');
                                    StructuralPatterns.functions.radioQuestion('<br>Are there different layers that extend the behaviour of the Composite object? <br>', 'Yes', 'No', 'radio2211', 'radio2212', divCont7);
                                    let radio2211 = document.getElementById('radio2211');
                                    radio2211.addEventListener('click', async (e) => {
                                        divCont8.innerHTML = "";
                                        let divCont9 = document.createElement('div');
                                        StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the Decorator class <br>', 1, 'text', 'Decorator name', 'txtboxDecorator', 'infoField', 'buttonNext5', divCont8);
                                        let buttonNext5 = document.getElementById('buttonNext5');
                                        buttonNext5.addEventListener('click', async (e) => {
                                            divCont9.innerHTML = "";
                                            let divCont10 = document.createElement('div');
                                            StructuralPatterns.functions.textfieldQuestion('<br>How many concrete Decorators exist? <br>', 1, 'number', '1', 'NumOfConcreteDecorators', '', 'buttonNext6', divCont9);
                                            let buttonNext6 = document.getElementById('buttonNext6');
                                            buttonNext6.addEventListener('click', async (e) => {
                                                divCont10.innerHTML = "";
                                                let divCont11 = document.createElement('div');
                                                StructuralPatterns.functions.textfieldQuestion('<br> Insert the names of the Concrete Decorators <br> ', parseInt(document.getElementById('NumOfConcreteDecorators').value), 'text', 'Concrete Decorator name ', 'txtboxConcreteDecorator', 'infoField', 'buttonNext7a', divCont10);
                                                let buttonNext7a = document.getElementById('buttonNext7a');
                                                buttonNext7a.addEventListener('click', async (e) => {
                                                    divCont11.innerHTML = "";
                                                    let divCont12 = document.createElement('div');
                                                    StructuralPatterns.functions.textfieldQuestion('<br> Insert the name of the function of each Concrete Decorator <br>', parseInt(document.getElementById('NumOfConcreteDecorators').value), 'text', 'Function of Concrete Decorator ', 'txtboxConcreteDecoratorMethod', 'infoField', 'buttonNext7b', divCont11);
                                                    let buttonNext7b = document.getElementById('buttonNext7b');
                                                    buttonNext7b.addEventListener('click', async (e) => {
                                                        divCont12.innerHTML = "";
                                                        StructuralPatterns.functions.createLabel('<br> <b>Decorator Pattern</b>  ', '', divCont12);
                                                        StructuralPatterns.functions.createButton('Get Code', 'buttongetcodeDecoratorPattern', divCont12);
                                                        let buttonCodeDP = document.getElementById('buttongetcodeDecoratorPattern');
                                                        buttonCodeDP.addEventListener('click', async (e) => {
                                                            let infoList = document.getElementsByClassName('infoField');
                                                            StructuralPatterns.values["Decorator"].values["Component"].name = infoList.item(0).value;
                                                            let numInterfaceMethods = parseInt(document.getElementById('NumOfInterfaceMethods').value);
                                                            let numSimpleObj = parseInt(document.getElementById('NumOfSimpleObjectsTypes').value);
                                                            let numConDec = parseInt(document.getElementById('NumOfConcreteDecorators').value);
                                                            for (var i = 1; i <= numInterfaceMethods; i++) {
                                                                StructuralPatterns.values["Decorator"].values["ComponentMethod" + i] = { "name": "", "extension": 1 };
                                                                let v1 = infoList.item(i).value;
                                                                StructuralPatterns.values["Decorator"].values["ComponentMethod" + i].name = v1;
                                                            }
                                                            for (var j = 1; j <= numSimpleObj; j++) {
                                                                StructuralPatterns.values["Decorator"].values["ConcreteComponent" + j] = { "name": "", "extension": 1 };
                                                                let v1 = infoList.item(i).value;
                                                                StructuralPatterns.values["Decorator"].values["ConcreteComponent" + j].name = v1;
                                                                i++;
                                                            }
                                                            StructuralPatterns.values["Decorator"].values["Decorator"].name = infoList.item(i).value;
                                                            for (var j = 1; j <= numConDec; j++) {
                                                                StructuralPatterns.values["Decorator"].values["ConcreteDecorator" + j] = { "name": "", "extension": 1 };
                                                                let v2 = infoList.item(i + 1).value;
                                                                StructuralPatterns.values["Decorator"].values["ConcreteDecorator" + j].name = v2;
                                                                i++;
                                                            }
                                                            for (var j = 1; j <= numConDec; j++) {
                                                                StructuralPatterns.values["Decorator"].values["ConcreteDecorator" + j + "Method"] = { "name": "", "extension": 0 };
                                                                let v2 = infoList.item(i + 1).value;
                                                                StructuralPatterns.values["Decorator"].values["ConcreteDecorator" + j + "Method"].name = v2;
                                                                i++;
                                                            }
                                                            //console.log(JSON.stringify(StructuralPatterns.values["Decorator"]));
                                                            let message = StructuralPatterns.functions.checkInputsOnSubmit(1);
                                                            if (message == "Input is valid") {
                                                                var getUrl = document.getElementById("projectName").value;
                                                                StructuralPatterns.functions.checkMessage(await helloBackendService.codeGeneration(getUrl, StructuralPatterns.values["Decorator"].values, "Decorator"), messageService);
                                                            }
                                                            else {
                                                                messageService.info(message);
                                                            }
                                                        });
                                                    });
                                                    divCont11.appendChild(divCont12);
                                                });
                                                divCont10.appendChild(divCont11);
                                            });
                                            divCont9.appendChild(divCont10);
                                        });
                                        divCont8.appendChild(divCont9);
                                    });
                                    let radio2212 = document.getElementById('radio2212');
                                    radio2212.addEventListener('click', async (e) => {
                                        divCont8.innerHTML = "";
                                        let divCont9 = document.createElement('div');
                                        StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the Composite class <br>', 1, 'text', 'Composite name', 'txtboxComposite', 'infoField', 'buttonNext8', divCont8);
                                        let buttonNext8 = document.getElementById('buttonNext8');
                                        buttonNext8.addEventListener('click', async (e) => {
                                            divCont9.innerHTML = "";
                                            StructuralPatterns.functions.createLabel('<br> <b>Composite Pattern</b>  ', '', divCont9);
                                            StructuralPatterns.functions.createButton('Get Code', 'buttongetcodeCompositePattern', divCont9);
                                            let buttonCodeCP = document.getElementById('buttongetcodeCompositePattern');
                                            buttonCodeCP.addEventListener('click', async (e) => {
                                                let infoList = document.getElementsByClassName('infoField');
                                                StructuralPatterns.values["Composite"].values["Component"].name = infoList.item(0).value;
                                                let numInterfaceMethods = parseInt(document.getElementById('NumOfInterfaceMethods').value);
                                                let numSimpleObj = parseInt(document.getElementById('NumOfSimpleObjectsTypes').value);
                                                for (var i = 1; i <= numInterfaceMethods; i++) {
                                                    StructuralPatterns.values["Composite"].values["ComponentMethod" + i] = { "name": "", "extension": 1 };
                                                    let v1 = infoList.item(i).value;
                                                    StructuralPatterns.values["Composite"].values["ComponentMethod" + i].name = v1;
                                                }
                                                for (var j = 1; j <= numSimpleObj; j++) {
                                                    StructuralPatterns.values["Composite"].values["ConcreteComponent" + j] = { "name": "", "extension": 1 };
                                                    let v1 = infoList.item(i).value;
                                                    StructuralPatterns.values["Composite"].values["ConcreteComponent" + j].name = v1;
                                                    i++;
                                                }
                                                StructuralPatterns.values["Composite"].values["Composite"].name = infoList.item(i).value;
                                                //console.log(JSON.stringify(StructuralPatterns.values["Composite"]));
                                                let message = StructuralPatterns.functions.checkInputsOnSubmit(1);
                                                if (message == "Input is valid") {
                                                    var getUrl = document.getElementById("projectName").value;
                                                    StructuralPatterns.functions.checkMessage(await helloBackendService.codeGeneration(getUrl, StructuralPatterns.values["Composite"].values, "Composite"), messageService);
                                                }
                                                else {
                                                    messageService.info(message);
                                                }
                                            });
                                        });
                                        divCont8.appendChild(divCont9);
                                    });
                                    divCont7.appendChild(divCont8);
                                });
                                divCont6.appendChild(divCont7);
                            });
                            divCont5.appendChild(divCont6);
                        });
                        divCont4.appendChild(divCont5);
                    });
                    divCont3.appendChild(divCont4);
                });
                divCont2.appendChild(divCont3);
            });
            let radio222 = document.getElementById('radio222');
            radio222.addEventListener('click', async (e) => {
                divCont2.innerHTML = "";
                let divCont3 = document.createElement('div');
                StructuralPatterns.functions.radioQuestion('<br>Do you want to communicate  (reuse or hide the complexity) of an exiting artifact (class or subsystem)? <br>', 'Yes', 'No', 'radio2221', 'radio2222', divCont2);
                let radio2221 = document.getElementById('radio2221');
                radio2221.addEventListener('click', async (e) => {
                    divCont3.innerHTML = "";
                    let divCont4 = document.createElement('div');
                    StructuralPatterns.functions.radioQuestion('<br>Communicate with one class or subsystem? <br>', 'One', 'Subsystem', 'radio22211', 'radio22212', divCont3);
                    let radio22211 = document.getElementById('radio22211');
                    radio22211.addEventListener('click', async (e) => {
                        divCont4.innerHTML = "";
                        let divCont5 = document.createElement('div');
                        StructuralPatterns.functions.radioQuestion('<br>Do you need an interface in order to reduce memory usage? <br>', 'Yes', 'No', 'radio222111', 'radio222112', divCont4);
                        let radio222111 = document.getElementById('radio222111');
                        radio222111.addEventListener('click', async (e) => {
                            divCont5.innerHTML = "";
                            let divCont6 = document.createElement('div');
                            StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the Flyweight Factory class that creates and manages Flyweight object <br>', 1, 'text', 'Flyweight Factory name', 'txtboxFlyweightFactory', 'infoField', 'buttonNext9', divCont5);
                            let buttonNext9 = document.getElementById('buttonNext9');
                            buttonNext9.addEventListener('click', async (e) => {
                                divCont6.innerHTML = "";
                                let divCont7 = document.createElement('div');
                                StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the Flyweight <br>', 1, 'text', 'Flyweight name', 'txtboxFlyweight', 'infoField', 'buttonNext10', divCont6);
                                let buttonNext10 = document.getElementById('buttonNext10');
                                buttonNext10.addEventListener('click', async (e) => {
                                    divCont7.innerHTML = "";
                                    let divCont8 = document.createElement('div');
                                    StructuralPatterns.functions.textfieldQuestion('<br>How many Concrete Flyweights exist? <br>', 1, 'number', '1', 'NumOfConcreteFlyweights', '', 'buttonNext11', divCont7);
                                    let buttonNext11 = document.getElementById('buttonNext11');
                                    buttonNext11.addEventListener('click', async (e) => {
                                        divCont8.innerHTML = "";
                                        let divCont9 = document.createElement('div');
                                        StructuralPatterns.functions.textfieldQuestion('<br>Insert the names of the Concrete Flyweights <br>', parseInt(document.getElementById('NumOfConcreteFlyweights').value), 'text', 'Concrete Flyweight name ', 'txtboxConcreteFlyweight', 'infoField', 'buttonNext12', divCont8);
                                        let buttonNext12 = document.getElementById('buttonNext12');
                                        buttonNext12.addEventListener('click', async (e) => {
                                            divCont9.innerHTML = "";
                                            let divCont10 = document.createElement('div');
                                            StructuralPatterns.functions.textfieldQuestion('<br>Insert the type and the name of the attribute (state) of Concrete Flyweight (with a space between) <br>', 1, 'text', "Concrete Flyweight's Attribute name", 'txtboxAttribute', 'infoField', 'buttonNext13', divCont9);
                                            let buttonNext13 = document.getElementById('buttonNext13');
                                            buttonNext13.addEventListener('click', async (e) => {
                                                divCont10.innerHTML = "";
                                                let divCont11 = document.createElement('div');
                                                StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the Client <br>', 1, 'text', "Client name", 'txtboxClient', 'infoField', 'buttonNext15', divCont10);
                                                let buttonNext15 = document.getElementById('buttonNext15');
                                                buttonNext15.addEventListener('click', async (e) => {
                                                    divCont11.innerHTML = "";
                                                    StructuralPatterns.functions.createLabel('<br> <b>Flyweight Pattern</b>  ', '', divCont11);
                                                    StructuralPatterns.functions.createButton('Get Code', 'buttongetcodeFlyweightPattern', divCont11);
                                                    let buttonCodeFP = document.getElementById('buttongetcodeFlyweightPattern');
                                                    buttonCodeFP.addEventListener('click', async (e) => {
                                                        //FLYWEIGHT
                                                        let infoList = document.getElementsByClassName('infoField');
                                                        StructuralPatterns.values["Flyweight"].values["FlyweightFactory"].name = infoList.item(0).value;
                                                        StructuralPatterns.values["Flyweight"].values["Flyweight"].name = infoList.item(1).value;
                                                        let numCat = parseInt(document.getElementById('NumOfConcreteFlyweights').value);
                                                        for (var i = 1; i <= numCat; i++) {
                                                            StructuralPatterns.values["Flyweight"].values["ConcreteFlyweight" + i] = { "name": "", "extension": 0 };
                                                            StructuralPatterns.values["Flyweight"].values["ConcreteFlyweight" + i].name = infoList.item(i).value;
                                                        }
                                                        StructuralPatterns.values["Flyweight"].values["ConcreteFlyweight1Attribute"].name = infoList.item(2 + numCat).value;
                                                        StructuralPatterns.values["Flyweight"].values["Client"].name = infoList.item(3 + numCat).value;
                                                        //console.log(JSON.stringify(StructuralPatterns.values));
                                                        let message = StructuralPatterns.functions.checkInputsOnSubmit(1);
                                                        if (message == "Input is valid") {
                                                            var getUrl = document.getElementById("projectName").value;
                                                            StructuralPatterns.functions.checkMessage(await helloBackendService.codeGeneration(getUrl, StructuralPatterns.values["Facade"].values, "Facade"), messageService);
                                                        }
                                                        else {
                                                            messageService.info(message);
                                                        }
                                                    });
                                                });
                                                divCont10.appendChild(divCont11);
                                            });
                                            divCont9.appendChild(divCont10);
                                        });
                                        divCont8.appendChild(divCont9);
                                    });
                                    divCont7.appendChild(divCont8);
                                });
                                divCont6.appendChild(divCont7);
                            });
                            divCont5.appendChild(divCont6);
                        });
                        let radio222112 = document.getElementById('radio222112');
                        radio222112.addEventListener('click', async (e) => {
                            divCont5.innerHTML = "";
                            let divCont6 = document.createElement('div');
                            StructuralPatterns.functions.radioQuestion('<br>Are you unable to change the interface of the existing class? <br>', 'Yes', 'No', 'radio2221121', 'radio2221122', divCont5);
                            let radio2221121 = document.getElementById('radio2221121');
                            radio2221121.addEventListener('click', async (e) => {
                                divCont6.innerHTML = "";
                                let divCont7 = document.createElement('div');
                                StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the existing class, that needs to be adapted <br>', 1, 'text', 'Existing Class name', 'txtboxService', 'infoField', 'buttonNext16', divCont6);
                                let buttonNext16 = document.getElementById('buttonNext16');
                                buttonNext16.addEventListener('click', async (e) => {
                                    divCont7.innerHTML = "";
                                    let divCont8 = document.createElement('div');
                                    StructuralPatterns.functions.textfieldQuestion("<br>Insert the name of the existing class' method that client needs to use <br>", 1, 'text', 'Existing Method name', 'txtboxServiceMethod', 'infoField', 'buttonNext17', divCont7);
                                    let buttonNext17 = document.getElementById('buttonNext17');
                                    buttonNext17.addEventListener('click', async (e) => {
                                        divCont8.innerHTML = "";
                                        let divCont9 = document.createElement('div');
                                        StructuralPatterns.functions.textfieldQuestion("<br>Insert the name of the Adapter <br>", 1, 'text', 'Adapter name', 'txtboxAdapter', 'infoField', 'buttonNext18', divCont8);
                                        let buttonNext18 = document.getElementById('buttonNext18');
                                        buttonNext18.addEventListener('click', async (e) => {
                                            divCont9.innerHTML = "";
                                            let divCont9b = document.createElement('div');
                                            StructuralPatterns.functions.textfieldQuestion("<br>Insert the name of the Adapter method that will wrap the method of the existing class <br>", 1, 'text', "Adapter's Method name", 'txtboxAdapterMethod', 'infoField', 'buttonNext19', divCont9);
                                            let buttonNext19 = document.getElementById('buttonNext19');
                                            buttonNext19.addEventListener('click', async (e) => {
                                                divCont9b.innerHTML = "";
                                                let divCont10 = document.createElement('div');
                                                StructuralPatterns.functions.textfieldQuestion("<br>Insert the name of the Client that needs to use the existing class <br>", 1, 'text', "Client's name", 'txtboxClient', 'infoField', 'buttonNext19b', divCont9b);
                                                let buttonNext19b = document.getElementById('buttonNext19b');
                                                buttonNext19b.addEventListener('click', async (e) => {
                                                    divCont10.innerHTML = "";
                                                    StructuralPatterns.functions.createLabel('<br> <b>Adapter Pattern</b>  ', '', divCont10);
                                                    StructuralPatterns.functions.createButton('Get Code', 'buttongetcodeAdapterPattern', divCont10);
                                                    let buttonCodeAP = document.getElementById('buttongetcodeAdapterPattern');
                                                    buttonCodeAP.addEventListener('click', async (e) => {
                                                        let infoList = document.getElementsByClassName('infoField');
                                                        StructuralPatterns.values["Adapter"].values["Adaptee"].name = infoList.item(0).value;
                                                        StructuralPatterns.values["Adapter"].values["AdapteeMethod"].name = infoList.item(1).value;
                                                        StructuralPatterns.values["Adapter"].values["Adapter"].name = infoList.item(2).value;
                                                        StructuralPatterns.values["Adapter"].values["AdapterMethod"].name = infoList.item(3).value;
                                                        StructuralPatterns.values["Adapter"].values["ClientInterface"].name = infoList.item(4).value;
                                                        console.log(JSON.stringify(StructuralPatterns.values["Adapter"]));
                                                        let message = StructuralPatterns.functions.checkInputsOnSubmit(1);
                                                        if (message == "Input is valid") {
                                                            //extra checks for existing class and its method
                                                            let adapteeName = infoList.item(0).value;
                                                            var getUrl = document.getElementById("projectName").value;
                                                            var methodNames = await helloBackendService.getMethods(getUrl, adapteeName);
                                                            if (classesNames.includes(adapteeName)) {
                                                                var methodName = infoList.item(1).value;
                                                                if (methodNames.includes(methodName)) {
                                                                    StructuralPatterns.functions.checkMessage(await helloBackendService.codeGeneration(getUrl, StructuralPatterns.values["Adapter"].values, "Adapter"), messageService);
                                                                }
                                                                else {
                                                                    messageService.info("For Adaptee method you need to choose a method name that already exists in Adaptee class: " + methodNames);
                                                                }
                                                            }
                                                            else {
                                                                messageService.info("For Adaptee you need to choose a class name that already exists: " + classesNames);
                                                            }
                                                        }
                                                        else {
                                                            messageService.info(message);
                                                        }
                                                    });
                                                });
                                                divCont9b.appendChild(divCont10);
                                            });
                                            divCont9.appendChild(divCont9b);
                                        });
                                        divCont8.appendChild(divCont9);
                                    });
                                    divCont7.appendChild(divCont8);
                                });
                                divCont6.appendChild(divCont7);
                            });
                            let radio2221122 = document.getElementById('radio2221122');
                            radio2221122.addEventListener('click', async (e) => {
                                divCont6.innerHTML = "";
                                StructuralPatterns.functions.createLabel('<br>There is no pattern. <br>', '', divCont6);
                            });
                            divCont5.appendChild(divCont6);
                        });
                        divCont4.appendChild(divCont5);
                    });
                    let radio22212 = document.getElementById('radio22212');
                    radio22212.addEventListener('click', async (e) => {
                        divCont4.innerHTML = "";
                        let divCont5 = document.createElement('div');
                        StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the Facade class (giving access to the functioalilty of the subsystem) <br>', 1, 'text', 'Facade name', 'txtboxFacade', 'infoField', 'buttonNext20', divCont4);
                        let buttonNext20 = document.getElementById('buttonNext20');
                        buttonNext20.addEventListener('click', async (e) => {
                            divCont5.innerHTML = "";
                            let divCont6 = document.createElement('div');
                            StructuralPatterns.functions.textfieldQuestion('<br> How many methods does the Facade serve? <br>', 1, 'number', '1', 'NumOfAdditionalFacades', '', 'buttonNext21', divCont5);
                            let buttonNext21 = document.getElementById('buttonNext21');
                            buttonNext21.addEventListener('click', async (e) => {
                                divCont6.innerHTML = "";
                                let divCont7 = document.createElement('div');
                                StructuralPatterns.functions.textfieldQuestion('<br>Insert the names of the methods <br>', parseInt(document.getElementById('NumOfAdditionalFacades').value), 'text', 'Facade Method name ', 'txtboxFacadeMethods', 'infoField', 'buttonNext22', divCont6);
                                let buttonNext22 = document.getElementById('buttonNext22');
                                buttonNext22.addEventListener('click', async (e) => {
                                    divCont7.innerHTML = "";
                                    StructuralPatterns.functions.createLabel('<br> <b>Facade Pattern</b>  ', '', divCont7);
                                    StructuralPatterns.functions.createButton('Get Code', 'buttongetcodeFacadePattern', divCont7);
                                    let buttonCodeFP = document.getElementById('buttongetcodeFacadePattern');
                                    buttonCodeFP.addEventListener('click', async (e) => {
                                        //FACADE
                                        let infoList = document.getElementsByClassName('infoField');
                                        StructuralPatterns.values["Facade"].values["Facade"].name = infoList.item(0).value;
                                        let numCat = parseInt(document.getElementById('NumOfAdditionalFacades').value);
                                        for (var i = 1; i <= numCat; i++) {
                                            StructuralPatterns.values["Facade"].values["FacadeMethod" + i] = { "name": "", "extension": 0 };
                                            StructuralPatterns.values["Facade"].values["FacadeMethod" + i].name = infoList.item(i).value;
                                        }
                                        //console.log(JSON.stringify(StructuralPatterns.values["Facade"]));
                                        let message = StructuralPatterns.functions.checkInputsOnSubmit(1);
                                        if (message == "Input is valid") {
                                            var getUrl = document.getElementById("projectName").value;
                                            StructuralPatterns.functions.checkMessage(await helloBackendService.codeGeneration(getUrl, StructuralPatterns.values["Facade"].values, "Facade"), messageService);
                                        }
                                        else {
                                            messageService.info(message);
                                        }
                                    });
                                });
                                divCont6.appendChild(divCont7);
                            });
                            divCont5.appendChild(divCont6);
                        });
                        divCont4.appendChild(divCont5);
                    });
                    divCont3.appendChild(divCont4);
                });
                let radio2222 = document.getElementById('radio2222');
                radio2222.addEventListener('click', async (e) => {
                    divCont3.innerHTML = "";
                    let divCont4 = document.createElement('div');
                    StructuralPatterns.functions.radioQuestion('<br>Do you need access control for the some service class? <br>', 'Yes', 'No', 'radio22221', 'radio22222', divCont3);
                    let radio22221 = document.getElementById('radio22221');
                    radio22221.addEventListener('click', async (e) => {
                        divCont4.innerHTML = "";
                        let divCont5 = document.createElement('div');
                        StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the Interface serving both the service and the access control class? <br>', 1, 'text', 'Interface name', 'txtboxInterface', 'infoField', 'buttonNext23', divCont4);
                        let buttonNext23 = document.getElementById('buttonNext23');
                        buttonNext23.addEventListener('click', async (e) => {
                            divCont5.innerHTML = "";
                            let divCont6 = document.createElement('div');
                            StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the main method of the service class <br>', 1, 'text', 'Service Method name', 'txtboxServiceMethod', 'infoField', 'buttonNext24', divCont5);
                            let buttonNext24 = document.getElementById('buttonNext24');
                            buttonNext24.addEventListener('click', async (e) => {
                                divCont6.innerHTML = "";
                                let divCont7 = document.createElement('div');
                                StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the service class <br>', 1, 'text', 'Service name', 'txtboxService', 'infoField', 'buttonNext25', divCont6);
                                let buttonNext25 = document.getElementById('buttonNext25');
                                buttonNext25.addEventListener('click', async (e) => {
                                    divCont7.innerHTML = "";
                                    let divCont8 = document.createElement('div');
                                    StructuralPatterns.functions.textfieldQuestion('<br>Insert the name of the Proxy class (access control) <br>', 1, 'text', 'Proxy name', 'txtboxProxy', 'infoField', 'buttonNext26', divCont7);
                                    let buttonNext26 = document.getElementById('buttonNext26');
                                    buttonNext26.addEventListener('click', async (e) => {
                                        divCont8.innerHTML = "";
                                        StructuralPatterns.functions.createLabel('<br> <b>Proxy Pattern</b>  ', '', divCont7);
                                        StructuralPatterns.functions.createButton('Get Code', 'buttongetcodeProxyPattern', divCont7);
                                        let buttonCodePP = document.getElementById('buttongetcodeProxyPattern');
                                        buttonCodePP.addEventListener('click', async (e) => {
                                            //PROXY
                                            let infoList = document.getElementsByClassName('infoField');
                                            StructuralPatterns.values["Proxy"].values["ServiceInterface"].name = infoList.item(0).value;
                                            StructuralPatterns.values["Proxy"].values["ServiceInterfaceMethod"].name = infoList.item(1).value;
                                            StructuralPatterns.values["Proxy"].values["Service"].name = infoList.item(2).value;
                                            StructuralPatterns.values["Proxy"].values["Proxy"].name = infoList.item(3).value;
                                            //console.log(JSON.stringify(StructuralPatterns.values["Proxy"]));
                                            let message = StructuralPatterns.functions.checkInputsOnSubmit(1);
                                            if (message == "Input is valid") {
                                                var getUrl = document.getElementById("projectName").value;
                                                StructuralPatterns.functions.checkMessage(await helloBackendService.codeGeneration(getUrl, StructuralPatterns.values["Proxy"].values, "Proxy"), messageService);
                                            }
                                            else {
                                                messageService.info(message);
                                            }
                                        });
                                    });
                                    divCont7.appendChild(divCont8);
                                });
                                divCont6.appendChild(divCont7);
                            });
                            divCont5.appendChild(divCont6);
                        });
                        divCont4.appendChild(divCont5);
                    });
                    let radio22222 = document.getElementById('radio22222');
                    radio22222.addEventListener('click', async (e) => {
                        divCont4.innerHTML = "";
                        StructuralPatterns.functions.createLabel('<br>There is no pattern. <br>', '', divCont4);
                    });
                    divCont3.appendChild(divCont4);
                });
                divCont2.appendChild(divCont3);
            });
            divCont1.appendChild(divCont2);
        });
        divCont.appendChild(divCont1);
    }
}
exports.StructuralPatterns = StructuralPatterns;
StructuralPatterns.functions = new functions_1.Functions();
StructuralPatterns.values = JSON.parse(JSON.stringify(data_json_1.default));
//# sourceMappingURL=StructuralPatternsWizard.js.map