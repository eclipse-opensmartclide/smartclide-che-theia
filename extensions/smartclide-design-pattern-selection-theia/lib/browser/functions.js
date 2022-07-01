"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Functions = void 0;
const autocompleter_1 = __importDefault(require("autocompleter"));
class Functions {
    radioQuestion(questionLabel, labelRadio1, labelRadio2, radioId1, radioId2, parent) {
        this.createLabel(questionLabel, '', parent);
        this.createLabel(labelRadio1, '', parent);
        this.createInput('', radioId1, '', 'yes_no', 'radio', parent);
        this.createLabel(labelRadio2, '', parent);
        this.createInput('', radioId2, '', 'yes_no', 'radio', parent);
    }
    textfieldQuestion(questionLabel, num, inputType, inputMessage, inputId, inputClassname, buttonId, parent) {
        this.createLabel(questionLabel, '', parent);
        if (num == 1) {
            let divInput = document.createElement('div');
            parent.append(divInput);
            this.createInput(inputMessage, inputId, inputClassname, inputId, inputType, divInput);
        }
        else {
            for (let i = 1; i <= num; i++) {
                let divInput = document.createElement('div');
                parent.append(divInput);
                this.createInput(inputMessage + i, inputId + i, inputClassname, inputId + i, inputType, divInput);
            }
        }
        this.createButton('Next', buttonId, parent);
    }
    createLabel(innerMessage, id, parent) {
        let labelQuestion = document.createElement('label');
        labelQuestion.innerHTML = innerMessage;
        labelQuestion.id = id;
        parent.appendChild(labelQuestion);
    }
    createInput(innerMessage, id, classname, name, type, parent) {
        let inputField = document.createElement('input');
        inputField.placeholder = innerMessage;
        inputField.id = id;
        inputField.name = name;
        inputField.type = type;
        parent.append(inputField);
        if (type.includes('number')) {
            inputField.min = '1';
            inputField.value = innerMessage;
        }
        if (!id.includes('radio') && !id.includes('Num') && !id.includes('num') && !id.includes("projectName")) {
            inputField.className = classname;
            if (!innerMessage.includes("Method") && !innerMessage.includes("step")) {
                this.showSuggestions(inputField.value, Functions.listOfClassNames, inputField.id, parent);
            }
            inputField.autocomplete = "off";
        }
        if (id.includes('Attribute') || id.includes('Parameter') || name.includes('Attribute') || name.includes('Parameter')) {
            inputField.title = 'Insert first the type and after the name of the attribute/parameter with a space between';
        }
    }
    //autocomplete
    showSuggestions(value, table, id, parent) {
        var items = table.map(function (n) { return { label: n }; });
        (0, autocompleter_1.default)({
            input: document.getElementById('txtbox' + id.substring(6)),
            minLength: 1,
            onSelect: function (item, inputfield) {
                inputfield.value = item.label;
            },
            fetch: function (text, callback) {
                var match = text;
                let reg = new RegExp('^' + match, 'i');
                if (match != "") {
                    callback(items.filter(function (n) {
                        if (n.label.match(reg)) {
                            return n;
                        }
                    }));
                }
            },
            render: function (item, value) {
                var itemElement = document.createElement("div");
                itemElement.className = "suggestions";
                var regex = new RegExp('^' + value);
                var inner = item.label.replace(regex, function (match) { return match; });
                itemElement.innerHTML = inner;
                return itemElement;
            },
            customize: function (input, inputRect, container, maxHeight) {
                container.style.visibility = 'visible';
                container.style.left = "auto";
                container.style.top = "auto";
                container.style.position = 'absolute';
                container.style.maxHeight = "140px";
                container.style.width = "166.400px";
                container.style.background = '#3c3c3c';
                parent.appendChild(container);
            },
            showOnFocus: true,
            disableAutoSelect: true,
        });
    }
    //autocomplete
    autocompleteMatch(input, table) {
        if (input == '') {
            return [];
        }
        let reg = new RegExp('^' + input);
        return table.filter(function (term) {
            if (term.match(reg)) {
                return term;
            }
        });
    }
    createButton(innerMessage, id, parent) {
        if (id !== 'disable') {
            let button = document.createElement('button');
            button.innerHTML = innerMessage;
            button.id = id;
            button.title = (innerMessage === "+") ? "Plus button" : innerMessage;
            button.type = 'button';
            parent.appendChild(button);
        }
    }
    checkMessage(message, messageService) {
        if (message != "") {
            messageService.info("Something went wrong");
        }
        else {
            messageService.info("Code generation has been completed");
        }
    }
    checkInputsOnSubmit(aaform) {
        /*for (let i=0; i<(document.forms[aaform] as HTMLFormElement).length; i++){
            console.log((document.forms[aaform][i] as HTMLInputElement).value);
        }*/
        if (this.checkEmptyInputs(document.forms[aaform])) {
            return "You need to fill all the fields!";
        }
        else {
            for (let i = 0; i < document.forms[aaform].length; i++) {
                let field = document.forms[aaform][i];
                if (field.id.includes('txtbox')) {
                    if (this.checkInputsForSameValues(field.value, document.forms[aaform])) {
                        return "There are duplicated names in the fields!";
                    }
                }
            }
            for (let i = 0; i < document.forms[aaform].length; i++) {
                let field = document.forms[aaform][i];
                if (field.id.includes('txtbox')) {
                    if (field.id.includes('Attribute') || field.id.includes('Parameter') || field.name.includes('Attribute') || field.name.includes('Parameter')) {
                        if (!this.checkAttributeNameWriting(field.value))
                            return "Attribute/Parameter's type can start with uppercase letter! Attribute/Parameter's name must contain only small letters! ";
                    }
                    else if (field.id.includes('Method') || field.name.includes('Method')) {
                        if (!this.checkMethodNameWriting(field.value))
                            return "Method's name must follow camel writing!";
                    }
                    else if (!this.checkClassNameWriting(field.value)) {
                        return "Class's name must start with a capital letter!";
                    }
                }
            }
        }
        return "Input is valid";
    }
    //methods that check writing in textfields
    checkClassNameWriting(value) {
        return (value.match("^([A-Z]{1}[a-zA-Z]*[0-9]*)$")) ? true : false; //class case
    }
    checkMethodNameWriting(value) {
        return (value.match("^([a-z]+[a-z|0-9]*([A-Z][a-z|0-9]*)*)$")) ? true : false; //method case
    }
    checkAttributeNameWriting(value) {
        if (value.match("^([A-Za-z][a-z]+( [a-z][a-zA-Z0-9]*))$")) { //attribute case ^([a-zA-Z]*[0-9]*)[ ]([a-z]{1}[a-zA-Z]*[0-9]*)
            return true;
        }
        return false;
    }
    //method that checks for duplicate values
    checkInputsForSameValues(value, vform) {
        let count = 0;
        for (let i = 0; i < vform.length; i++) {
            if (value === vform[i].value) {
                count++;
                if (count == 2) {
                    return true;
                }
            }
        }
        return false;
    }
    //method that search for empty textfields
    checkEmptyInputs(vform) {
        for (var i = 0; i < vform.length; i++) {
            if (vform[i].value.trim() === "" && !vform[i].id.includes('btn') && !vform[i].id.includes('button') && !vform[i].id.includes('radio')) {
                console.log('TRUE', vform[i].id);
                return true;
            }
        }
        return false;
    }
    check(key, statePatternSelection) {
        return (!key.includes("ConcreteProduct") || statePatternSelection != "AbstractFactory") && (!key.includes("ConcreteCreator") || statePatternSelection != "FactoryMethod") && (!key.includes("ConcreteBuilder") || statePatternSelection != "Builder");
    }
    insertInputsAbstractFactory(data) {
        let values = JSON.parse(JSON.stringify(data));
        let listofFamily = [];
        let listofProducts = [];
        Object.keys(values).forEach((key) => {
            if (key.includes("Family")) {
                values[key].name = values[key].name + "Factory";
                listofFamily.push(values[key].name);
            }
            else if (key.includes("Product") && !key.includes("ConcreteProduct")) {
                listofProducts.push(values[key].name);
            }
        });
        Object.keys(values).forEach((key) => {
            if (key.includes("ConcreteProduct")) {
                let array = key.split('.');
                var numberofProduct = array[0].replace(/\D/g, '');
                values[key].name = listofFamily[Number(array[1]) - 1].split("Factory")[0] + listofProducts[Number(numberofProduct) - 1];
            }
        });
        return values;
    }
    insertInputsBuilder(data) {
        let values = JSON.parse(JSON.stringify(data));
        let listofProducts = [];
        Object.keys(values).forEach((key) => {
            if (key.includes("Product"))
                listofProducts.push(values[key].name);
        });
        Object.keys(values).forEach((key) => {
            if (key.includes("ConcreteBuilder")) {
                var numofConBuilder = key.match(/\d/g);
                values[key].name = listofProducts[Number(numofConBuilder) - 1] + "Builder";
            }
        });
        return values;
    }
    insertInputsFactoryMethod(data) {
        let values = JSON.parse(JSON.stringify(data));
        let listofConProducts = [];
        Object.keys(values).forEach((key) => {
            if (key.includes("ConcreteProduct")) {
                values[key].name = values[key].name + values.Product.name;
                listofConProducts.push(values[key].name);
            }
        });
        Object.keys(values).forEach((key) => {
            if (key.includes("ConcreteCreator")) {
                var numofConProduct = key.match(/\d/g);
                values[key].name = listofConProducts[Number(numofConProduct) - 1].split(values.Product.name)[0] + values.Creator.name;
            }
        });
        return values;
    }
    updateJsonObject(data) {
        let values = JSON.parse(JSON.stringify(data));
        let table = document.getElementById('show_pattern_table');
        for (let i = 0; i < table.rows.length; i++) {
            let label = document.getElementById('label' + (i + 1)).innerHTML;
            let txtbox = document.getElementById('txtbox' + (i + 1)).value;
            values[label].name = txtbox;
        }
        return values;
    }
    setClassNames(list) {
        Functions.listOfClassNames = list;
    }
}
exports.Functions = Functions;
//# sourceMappingURL=functions.js.map