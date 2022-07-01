"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGenerator = void 0;
const abstractClass_1 = require("./abstractClass");
const MidHierarchyClass_1 = require("./MidHierarchyClass");
const ConcreteClass_1 = require("./ConcreteClass");
const NonHierarchyClass_1 = require("./NonHierarchyClass");
const Attribute_1 = require("./Attribute");
const Method_1 = require("./Method");
class CodeGenerator {
    //Creational Patterns
    AbstractFactory(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new abstractClass_1.abstractClass(obj.AbstractFactory.name);
        Object.keys(obj).forEach((innerkey) => {
            if (innerkey.includes("Product") && !innerkey.includes("ConcreteProduct")) {
                file1.addMethod(new Method_1.Method("create" + obj[innerkey].name, obj[innerkey].name, true, "public", "", []));
            }
        });
        this.fillPromise(ppc, file1);
        Object.keys(obj).forEach((key) => {
            if (key.includes("Family")) {
                let file2 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.AbstractFactory.name);
                Object.keys(obj).forEach((innerkey) => {
                    if (innerkey.includes("Product") && !innerkey.includes("ConcreteProduct")) {
                        let first = obj[key].name.split("Factory")[0];
                        file2.addMethod(new Method_1.Method("create" + obj[innerkey].name, obj[innerkey].name, false, "public", "\t \t return new " + first + obj[innerkey].name + "();", []));
                    }
                });
                this.fillPromise(ppc, file2);
            }
            else if (key.includes("Product") && !key.includes("ConcreteProduct")) {
                let file3 = new NonHierarchyClass_1.NonHierarchyClass(obj[key].name);
                this.fillPromise(ppc, file3);
            }
            else if (key.includes("ConcreteProduct")) {
                let array = key.split('.');
                var num = array[0].replace(/\D/g, ''); // the number before the '.' states the existing class that the class we are creating going to inheritance from it 
                let variable = "";
                Object.keys(obj).forEach((key) => {
                    if (key == "Product" + num) {
                        variable = obj[key].name;
                    }
                });
                let file4 = new ConcreteClass_1.ConcreteClass(obj[key].name, variable);
                this.fillPromise(ppc, file4);
            }
            else {
            }
        });
        return ppc.object;
    }
    Builder(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file = new NonHierarchyClass_1.NonHierarchyClass(obj.Director.name);
        file.addAttribute(new Attribute_1.Attribute("builder", obj.Builder.name, "private"));
        file.addMethod(new Method_1.Method(obj.Director.name, obj.Director.name, false, "public", "\t \t this.builder = builder;", [new Attribute_1.Attribute("builder", obj.Builder.name, "private")]));
        this.fillPromise(ppc, file);
        let file2 = new abstractClass_1.abstractClass(obj.Builder.name);
        file2.addMethod(new Method_1.Method("reset", "void", true, "public", "", []));
        Object.keys(obj).forEach((key) => {
            if (key.includes("BuilderMethod")) {
                file2.addMethod(new Method_1.Method(obj[key].name, "void", true, "public", "", []));
            }
        });
        this.fillPromise(ppc, file2);
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcreteBuilder")) {
                let file3 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Builder.name);
                let attributeName = "";
                Object.keys(obj).forEach((innerkey) => {
                    var match = key.match(/\d/g);
                    var innermatch = innerkey.match(/\d/g);
                    if (innerkey.includes("Product") && (innermatch != null && match != null && innermatch.join() === match.join())) {
                        file3.addAttribute(new Attribute_1.Attribute(obj[innerkey].name.toLowerCase(), obj[innerkey].name, "private"));
                        attributeName = obj[innerkey].name;
                    }
                    else if (innerkey.includes("BuilderMethod")) {
                        file3.addMethod(new Method_1.Method(obj[innerkey].name, "void", false, "public", "", []));
                    }
                    else {
                    }
                });
                file3.addMethod(new Method_1.Method("reset", "void", false, "public", "\t \t this." + attributeName.toLowerCase() + " = new " + attributeName + "();", []));
                this.fillPromise(ppc, file3);
            }
            else {
                if (!key.includes("BuilderMethod") && !key.includes("Director") && !key.includes("Builder")) {
                    let file4 = new NonHierarchyClass_1.NonHierarchyClass(obj[key].name);
                    this.fillPromise(ppc, file4);
                }
            }
        });
        return ppc.object;
    }
    //method that creates the files for the factory method design pattern
    FactoryMethod(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        Object.keys(obj).forEach((key) => {
            if (key == "Creator") {
                let file1 = new NonHierarchyClass_1.NonHierarchyClass(obj[key].name);
                file1.addMethod(new Method_1.Method("create" + obj.Product.name, obj.Product.name, true, "public", "", []));
                this.fillPromise(ppc, file1);
            }
            else if (key.includes("ConcreteCreator")) {
                let file2 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Creator.name);
                Object.keys(obj).forEach((innerkey) => {
                    var match = key.match(/\d/g);
                    var innermatch = innerkey.match(/\d/g);
                    //in order to create the method we have to get the name of the "ConcreteProduct" that is going to be returned in the method
                    if (innerkey.includes("ConcreteProduct") && (innermatch != null && match != null && innermatch.join() === match.join())) {
                        file2.addMethod(new Method_1.Method("create" + obj.Product.name, obj.Product.name, false, "public", "\t \t return new " + obj[innerkey].name + ";", []));
                    }
                });
                this.fillPromise(ppc, file2);
            }
            else if (key == "Product") {
                let file3 = new abstractClass_1.abstractClass(obj[key].name);
                this.fillPromise(ppc, file3);
            }
            else {
                let file4 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Product.name);
                this.fillPromise(ppc, file4);
            }
        });
        return ppc.object;
    }
    Singleton(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new NonHierarchyClass_1.NonHierarchyClass(obj.Singleton.name);
        file1.addAttribute(new Attribute_1.Attribute("instance", obj.Singleton.name, "private"));
        file1.addMethod(new Method_1.Method(obj.Singleton.name, "", false, "private", "\t \t instance  =  new " + obj.Singleton.name + "();", []));
        file1.addMethod(new Method_1.Method("getInstance", obj.Singleton.name, false, "private", "\t \t if(instance == null) { \n \t \t instance = new " + obj.Singleton.name + "();\n \t \t}\n \t \t return instance;", []));
        this.fillPromise(ppc, file1);
        return ppc.object;
    }
    Prototype(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new abstractClass_1.abstractClass(obj.Prototype.name);
        file1.addMethod(new Method_1.Method("clone", obj.Prototype.name, true, "public", "", []));
        this.fillPromise(ppc, file1);
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcretePrototype")) {
                let file2 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Prototype.name);
                file2.addMethod(new Method_1.Method("clone", obj.Prototype.name, false, "public", "\t \t return new " + obj[key].name + "(this);", []));
                this.fillPromise(ppc, file2);
            }
        });
        return ppc.object;
    }
    //Structural Patterns
    Adapter(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new abstractClass_1.abstractClass(obj.ClientInterface.name);
        file1.addMethod(new Method_1.Method(obj.AdapterMethod.name, "void", true, "public", "", []));
        this.fillPromise(ppc, file1);
        let file2 = new ConcreteClass_1.ConcreteClass(obj.Adapter.name, obj.ClientInterface.name);
        file2.addAttribute(new Attribute_1.Attribute(obj.Adaptee.name.toLowerCase(), obj.Adaptee.name, "private"));
        file2.addMethod(new Method_1.Method(obj.AdapterMethod.name, "void", false, "public", "", []));
        this.fillPromise(ppc, file2);
        let file3 = new NonHierarchyClass_1.NonHierarchyClass(obj.Adaptee.name);
        this.fillPromise(ppc, file3);
        return ppc.object;
    }
    Bridge(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new NonHierarchyClass_1.NonHierarchyClass(obj.Abstraction.name);
        file1.addAttribute(new Attribute_1.Attribute(obj.Implementation.name.toLowerCase(), obj.Implementation.name, "private"));
        file1.addMethod(new Method_1.Method(obj.AbstractionMethod.name, "void", false, "public", "", []));
        this.fillPromise(ppc, file1);
        let file2 = new abstractClass_1.abstractClass(obj.Implementation.name);
        file2.addMethod(new Method_1.Method(obj.ImplementationMethod.name, "void", true, "public", "", []));
        this.fillPromise(ppc, file2);
        Object.keys(obj).forEach((key) => {
            if (key.includes("RefinedAbstraction")) {
                let file3 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Abstraction.name);
                file3.addMethod(new Method_1.Method(obj.AbstractionMethod.name, "void", false, "public", "", []));
                this.fillPromise(ppc, file3);
            }
            else if (key.includes("ConcreteImplementation")) {
                let file4 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Implementation.name);
                file4.addMethod(new Method_1.Method(obj.ImplementationMethod.name, "void", false, "public", "", []));
                this.fillPromise(ppc, file4);
            }
            else {
            }
        });
        return ppc.object;
    }
    Composite(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new abstractClass_1.abstractClass(obj.Component.name);
        let file3 = new ConcreteClass_1.ConcreteClass(obj.Composite.name, obj.Component.name);
        file3.addAttribute(new Attribute_1.Attribute("children", "ArrayList<" + obj.Component.name + ">", "private"));
        //constructor
        file3.addMethod(new Method_1.Method(obj.Composite.name, "", false, "public", "\t\t children = new ArrayList<" + obj.Component.name + ">();", []));
        file3.addMethod(new Method_1.Method("add", "void", false, "public", "", [new Attribute_1.Attribute("c", obj.Composite.name, "")]));
        file3.addMethod(new Method_1.Method("remove", "void", false, "public", "", [new Attribute_1.Attribute("c", obj.Composite.name, "")]));
        file3.addMethod(new Method_1.Method("getChildern", "ArrayList<" + obj.Component.name + ">", false, "public", "\t\t return (children); ", []));
        var cList = []; //list of Concrete Component classes
        var mList = []; //list of Composite's methods
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcreteComponent")) {
                let file2 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Component.name);
                cList.push(file2);
            }
            else if (key.includes("ComponentMethod")) {
                file1.addMethod(new Method_1.Method(obj[key].name, "void", true, "public", "", []));
                file3.addMethod(new Method_1.Method(obj[key].name, "void", false, "public", "", []));
                mList.push(new Method_1.Method(obj[key].name, "void", false, "public", "", []));
            }
        });
        for (var i = 0; i < cList.length; i++) {
            for (var j = 0; j < mList.length; j++) {
                cList[i].addMethod(mList[j]);
            }
            this.fillPromise(ppc, cList[i]);
        }
        this.fillPromise(ppc, file1);
        this.fillPromise(ppc, file3);
        return ppc.object;
    }
    Decorator(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new abstractClass_1.abstractClass(obj.Component.name);
        file1.addMethod(new Method_1.Method(obj.ComponentMethod1.name, "void", true, "public", "", []));
        let file2 = new MidHierarchyClass_1.MidHierarchyClass(obj.Decorator, obj.Component.name);
        file2.addMethod(new Method_1.Method(obj.Decorator.name, "", false, "public", "\t \t this." + obj.Component.name.toLowerCase() + " = " + obj.Component.name.toLowerCase() + ";", [new Attribute_1.Attribute(obj.Component.name.toLowerCase(), obj.Component.name, "")]));
        var cList = []; //list of Concrete Component classes
        var mList = []; //list of Component's methods
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcreteComponent")) {
                let file3 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Component.name);
                cList.push(file3);
            }
            else if (key.includes("ConcreteDecorator")) {
                let file4 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Decorator.name);
                file4.addMethod(new Method_1.Method(obj.ConcreteDecorator1Method.name, "void", false, "public", "", []));
                cList.push(file4);
            }
            else if (key.includes("ComponentMethod")) {
                file2.addMethod(new Method_1.Method(obj[key].name, "void", false, "public", "", []));
                file1.addMethod(new Method_1.Method(obj[key].name, "void", false, "public", "", []));
                mList.push(new Method_1.Method(obj[key].name, "void", false, "public", "", []));
            }
        });
        this.fillPromise(ppc, file1);
        ;
        for (var i = 0; i < cList.length; i++) {
            for (var j = 0; j < mList.length; j++) {
                cList[i].addMethod(mList[j]);
            }
            this.fillPromise(ppc, cList[i]);
        }
        this.fillPromise(ppc, file2);
        return ppc.object;
    }
    Facade(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new NonHierarchyClass_1.NonHierarchyClass(obj.Facade.name);
        Object.keys(obj).forEach((key) => {
            if (key.includes("FacadeMethod")) {
                file1.addMethod(new Method_1.Method(obj[key].name.toLowerCase(), "void", false, "public", "", []));
            }
        });
        this.fillPromise(ppc, file1);
        return ppc.object;
    }
    Flyweight(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new NonHierarchyClass_1.NonHierarchyClass(obj.FlyweightFactory.name);
        file1.addAttribute(new Attribute_1.Attribute("cache", "ArrayList<" + obj.Flyweight.name + ">", "private")); //list of Flyweights
        file1.addMethod(new Method_1.Method(obj.Flyweight.name, '', false, "public", "\t \t this.cache = new ArrayList<" + obj.Flyweight.name + ">", [])); //constructor of FlyweightFactory class
        file1.addMethod(new Method_1.Method("getFlyweight", obj.Flyweight.name, false, "public", "", [new Attribute_1.Attribute("key", "string", "")])); //δεν έχω συμπληρώσει το body της μεθόδου
        this.fillPromise(ppc, file1);
        let file2 = new NonHierarchyClass_1.NonHierarchyClass(obj.Flyweight.name);
        file2.addAttribute(new Attribute_1.Attribute(obj.ConcreteFlyweight1Attribute.name, "string", "private"));
        this.fillPromise(ppc, file2);
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcreteFlyweight") && !key.includes("ConcreteFlyweight1Attribute")) {
                let file3 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Flyweight.name);
                this.fillPromise(ppc, file3);
            }
        });
        let file4 = new NonHierarchyClass_1.NonHierarchyClass(obj.Client.name);
        this.fillPromise(ppc, file4);
        return ppc.object;
    }
    Proxy(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new abstractClass_1.abstractClass(obj.ServiceInterface.name);
        file1.addMethod(new Method_1.Method(obj.ServiceInterfaceMethod.name, "void", true, "public", "", []));
        this.fillPromise(ppc, file1);
        let file2 = new ConcreteClass_1.ConcreteClass(obj.Service.name, obj.ServiceInterface.name);
        file2.addMethod(new Method_1.Method(obj.ServiceInterfaceMethod.name, "void", false, "public", "", []));
        this.fillPromise(ppc, file2);
        let file3 = new ConcreteClass_1.ConcreteClass(obj.Proxy.name, obj.ServiceInterface.name);
        file3.addAttribute(new Attribute_1.Attribute(obj.Service.name.toLowerCase(), obj.Service.name, "private"));
        file3.addMethod(new Method_1.Method(obj.Proxy.name, "", false, "public", "\t \t this." + obj.Service.name.toLowerCase() + "=" + obj.Service.name.toLowerCase() + ";", [new Attribute_1.Attribute(obj.Service.name.toLowerCase(), obj.Service.name, "")]));
        file3.addMethod(new Method_1.Method("checkAccess", "void", false, "public", "", [new Attribute_1.Attribute(obj.Service.name.toLowerCase(), obj.Service.name, "")]));
        file3.addMethod(new Method_1.Method(obj.ServiceInterfaceMethod.name, "void", false, "public", "\t \t if(this.checkAccess){\n \t \t \t \t this." + obj.Service.name.toLowerCase() + "." + obj.ServiceInterfaceMethod.name + "();\n \t \t} ", []));
        this.fillPromise(ppc, file3);
        return ppc.object;
    }
    //Behavioral Patterns
    ChainOfResponsibility(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new abstractClass_1.abstractClass(obj.Handler.name);
        file1.addMethod(new Method_1.Method("setNext", "void", true, "public", "", [new Attribute_1.Attribute((obj.Handler.name).charAt(), obj.Handler.name, "")]));
        file1.addMethod(new Method_1.Method("handle", "void", true, "public", "", [new Attribute_1.Attribute("request", "", "")]));
        this.fillPromise(ppc, file1);
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcreteHandler")) {
                let file2 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Handler.name);
                file2.addMethod(new Method_1.Method("setNext", "void", false, "public", "", [new Attribute_1.Attribute((obj.Handler.name).charAt(), obj.Handler.name, "")]));
                file2.addMethod(new Method_1.Method("handle", "void", false, "public", "", [new Attribute_1.Attribute("request", "", "")]));
                this.fillPromise(ppc, file2);
            }
        });
        console.log(1);
        return ppc.object;
    }
    Command(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new NonHierarchyClass_1.NonHierarchyClass(obj.Receiver.name);
        this.fillPromise(ppc, file1);
        let file2 = new NonHierarchyClass_1.NonHierarchyClass(obj.Invoker.name);
        this.fillPromise(ppc, file2);
        let file3 = new abstractClass_1.abstractClass(obj.Command.name);
        //file3.addMethod(new Method(obj.ConcreteCommand1Method.name,))
        this.fillPromise(ppc, file3);
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcreteCommand") && !key.includes("ConcreteCommand1Method") && !key.includes("ConcreteCommand1MethodParameter1")) {
                let file4 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Command.name);
                file4.addAttribute(new Attribute_1.Attribute((obj.Receiver.name).toLowerCase, obj.Receiver.name, ""));
                var aList = [];
                aList.push(new Attribute_1.Attribute((obj.Receiver.name).toLowerCase(), obj.Receiver.name, ""));
                Object.keys(obj).forEach((innerkey) => {
                    if (innerkey.includes("ConcreteCommand1MethodParameter")) {
                        file4.addAttribute(new Attribute_1.Attribute(obj[key].name, "string", ""));
                        aList.push(new Attribute_1.Attribute(obj[key].name, "string", ""));
                    }
                });
                file4.addMethod(new Method_1.Method(obj[key].name, "", false, "private", "\t \t this." + (obj.Receiver.name).toLowerCase + " = " + (obj.Receiver.name).toLowerCase + "; \n \t \t", aList));
                //concreteCommandMethod?
                this.fillPromise(ppc, file4);
            }
        });
        return ppc.object;
    }
    Mediator(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new abstractClass_1.abstractClass(obj.Mediator.name);
        file1.addMethod(new Method_1.Method("notify", "void", true, "public", "", []));
        this.fillPromise(ppc, file1);
        var cList = []; //list of ConcreteMediators
        var mList = [];
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcreteMediator")) {
                let file2 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Mediator.name);
                file2.addMethod(new Method_1.Method("notify", "void", false, "public", "", []));
                cList.push(file2);
                this.fillPromise(ppc, file2);
            }
            else if (key.includes("Component")) {
                let file3 = new NonHierarchyClass_1.NonHierarchyClass(obj[key].name);
                let attribute = obj.Mediator.name.toLowerCase();
                file3.addAttribute(new Attribute_1.Attribute(attribute.charAt(0), obj.Mediator.name, "private"));
                mList.push(obj[key].name);
                this.fillPromise(ppc, file3);
            }
            else {
            }
        });
        for (var i = 0; i < cList.length; i++) {
            for (var j = 0; j < mList.length; j++) {
                cList[i].addAttribute(new Attribute_1.Attribute(mList[j], mList[j], "private"));
            }
        }
        return ppc.object;
    }
    Memento(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new NonHierarchyClass_1.NonHierarchyClass(obj.Originator.name);
        let file2 = new NonHierarchyClass_1.NonHierarchyClass(obj.Memento.name);
        let file3 = new NonHierarchyClass_1.NonHierarchyClass(obj.Caretaker.name);
        Object.keys(obj).forEach((key) => {
            if (key.includes("OriginatorAttribute")) {
                file1.addAttribute(new Attribute_1.Attribute(obj[key].name, "string", "private"));
            }
            else if (key.includes("MementoAttribute")) {
                file2.addAttribute(new Attribute_1.Attribute(obj[key].name, "string", "private"));
            }
            else {
            }
        });
        file2.addMethod(new Method_1.Method(obj.Memento.name, "", false, "private", "", [])); //memento constructor
        file2.addMethod(new Method_1.Method("getState", "string", false, "private", "\t \t return (this.", [])); // unfinished
        file1.addMethod(new Method_1.Method("save", obj.Memento.name, false, "public", "", []));
        file1.addMethod(new Method_1.Method("restore", "void", false, "public", "", [new Attribute_1.Attribute(obj.Memento.name.charAt(0), obj.Memento.name, "")]));
        file3.addAttribute(new Attribute_1.Attribute(obj.Originator.name.toLowerCase(), obj.Originator.name, "private"));
        file3.addAttribute(new Attribute_1.Attribute("history", "ArrayList<" + obj.Memento.name + ">", "private"));
        let attribute = obj.Memento.name.toLowerCase();
        file3.addMethod(new Method_1.Method("doSomething", "void", false, "public", "\t \t " + obj.Memento.name + "" + attribute.charAt(0) + " =  " + (obj.Originator.name).toLowerCase() + ".save();\n \t \t history.push(m);", []));
        file3.addMethod(new Method_1.Method("undo", "void", false, "public", "\t \t " + obj.Memento.name + "" + (attribute.charAt(0)) + " =  history.remove();\n \t \t " + (obj.Originator.name).toLowerCase() + ".restore(m);", []));
        this.fillPromise(ppc, file1);
        this.fillPromise(ppc, file2);
        this.fillPromise(ppc, file3);
        return ppc.object;
    }
    Observer(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new NonHierarchyClass_1.NonHierarchyClass(obj.Subject.name);
        file1.addAttribute(new Attribute_1.Attribute(obj.Observer.name.toLowerCase() + 's', "ArrayList<" + obj.Observer.name + ">", "private"));
        file1.addMethod(new Method_1.Method("attach", "void", false, "public", "\t \t " + obj.Observer.name.toLowerCase() + "s.add(" + obj.Observer.name.toLowerCase().charAt(0) + ");", [new Attribute_1.Attribute(obj.Observer.name.toLowerCase().charAt(0), obj.Observer.name, "")]));
        file1.addMethod(new Method_1.Method("detach", "void", false, "public", "\t \t " + obj.Observer.name.toLowerCase() + "s.remove(" + obj.Observer.name.toLowerCase().charAt(0) + ");", [new Attribute_1.Attribute(obj.Observer.name.toLowerCase().charAt(0), obj.Observer.name, "")]));
        file1.addMethod(new Method_1.Method("notify", "void", false, "public", "\t \t for(int i=0; i<" + obj.Observer.name.toLowerCase() + "s.size(); i++){\n \t \t \t this." + obj.Observer.name.toLowerCase() + "s.get(i).update();", []));
        let file2 = new abstractClass_1.abstractClass(obj.Observer.name);
        file2.addMethod(new Method_1.Method("update", "void", true, "public", "", []));
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcreteSubject")) {
                let file3 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Subject.name);
                file3.addAttribute(new Attribute_1.Attribute(obj[key].name + "State", "string", "private"));
                file3.addMethod(new Method_1.Method("getState", "string", false, "public", "\t \t return (this." + obj[key].name + "State);", []));
                file3.addMethod(new Method_1.Method("setState", "void", false, "public", "\t \t this." + obj[key].name + "State = state;", [new Attribute_1.Attribute("state", "string", "")]));
                this.fillPromise(ppc, file3);
            }
            else if (key.includes("ConcreteObserver")) {
                let file4 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Observer.name);
                file4.addAttribute(new Attribute_1.Attribute(obj.Observer.name + "state", "string", "private"));
                this.fillPromise(ppc, file4);
            }
            else {
            }
        });
        this.fillPromise(ppc, file1);
        this.fillPromise(ppc, file2);
        return ppc.object;
    }
    State(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new NonHierarchyClass_1.NonHierarchyClass(obj.Context.name);
        file1.addAttribute(new Attribute_1.Attribute(obj.State.name.toLowerCase(), obj.State.name, "private"));
        file1.addMethod(new Method_1.Method(obj.Context.name, "", false, "public", "\t \t this." + obj.State.name.toLowerCase() + " = " + obj.State.name.toLowerCase() + ";", [new Attribute_1.Attribute(obj.State.name.toLowerCase(), obj.State.name, "")]));
        file1.addMethod(new Method_1.Method("changeState", "void", false, "public", "\t \t this." + obj.State.name.toLowerCase() + " = " + obj.State.name.toLowerCase() + ";", [new Attribute_1.Attribute(obj.State.name.toLowerCase(), obj.State.name, "")]));
        let file2 = new abstractClass_1.abstractClass(obj.State.name);
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcreteState")) {
                let file3 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.State.name);
                file3.addAttribute(new Attribute_1.Attribute(obj.Context.name.toLowerCase(), obj.Context.name, "private"));
                file3.addMethod(new Method_1.Method("setContext", "void", false, "public", "\t \t this." + obj.Context.name.toLowerCase() + " = " + obj.Context.name.toLowerCase() + ";", [new Attribute_1.Attribute(obj.Context.name.toLowerCase(), obj.Context.name, "")]));
                this.fillPromise(ppc, file3);
            }
        });
        this.fillPromise(ppc, file1);
        this.fillPromise(ppc, file2);
        return ppc.object;
    }
    Strategy(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new NonHierarchyClass_1.NonHierarchyClass(obj.Context.name);
        file1.addAttribute(new Attribute_1.Attribute(obj.Strategy.name.toLowerCase(), obj.Strategy.name, "private"));
        file1.addMethod(new Method_1.Method("set" + obj.Strategy.name, "void", false, "public", "\t \t this." + obj.Strategy.name.toLowerCase() + " = " + obj.Strategy.name.toLowerCase() + ";", [new Attribute_1.Attribute(obj.Strategy.name.toLowerCase(), obj.Strategy.name, "")]));
        file1.addMethod(new Method_1.Method("doSomething", "void", false, "public", "\t \t this." + obj.Strategy.name.toLowerCase() + "." + obj.StrategyMethod.name + "()", []));
        this.fillPromise(ppc, file1);
        let file2 = new abstractClass_1.abstractClass(obj.Strategy.name);
        file2.addMethod(new Method_1.Method(obj.StrategyMethod.name, "void", true, "public", "", []));
        this.fillPromise(ppc, file2);
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcreteStrategy")) {
                let file3 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Strategy.name);
                file3.addMethod(new Method_1.Method(obj.StrategyMethod.name, "void", false, "public", "", []));
                this.fillPromise(ppc, file3);
            }
        });
        return ppc.object;
    }
    TemplateMethod(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new NonHierarchyClass_1.NonHierarchyClass(obj.AbstractClass.name);
        file1.addMethod(new Method_1.Method("templateMethod", "void", false, "public", "", []));
        var cList = []; //list of ConcreteClass
        var mList = []; //list of AbstractClass methods
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcreteClass")) {
                let file2 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.AbstractClass.name);
                cList.push(file2);
            }
            else if (key.includes("AbstractClassMethod")) {
                file1.addMethod(new Method_1.Method(obj[key].name, "void", true, "public", "", []));
                mList.push(new Method_1.Method(obj[key].name, "void", false, "public", "", []));
            }
            else {
            }
        });
        for (var i = 0; i < cList.length; i++) {
            for (var j = 0; j < mList.length; j++) {
                cList[i].addMethod(mList[j]); // each one ConcreteClass has a method 
            }
            this.fillPromise(ppc, cList[i]);
        }
        this.fillPromise(ppc, file1);
        return ppc.object;
    }
    Visitor(jsonObj) {
        let ppc = { object: [] };
        let obj = JSON.parse(JSON.stringify(jsonObj));
        let file1 = new abstractClass_1.abstractClass(obj.Visitor.name);
        this.fillPromise(ppc, file1);
        let file2 = new abstractClass_1.abstractClass(obj.Element.name);
        file2.addMethod(new Method_1.Method("accept", "void", true, "public", "", [new Attribute_1.Attribute(obj.Visitor.name.toLowerCase().charAt(0), obj.Visitor.name, "")]));
        this.fillPromise(ppc, file2);
        var cList = []; //list of ConcreteVisitors
        var eList = []; //list of ConcreteElement method 
        Object.keys(obj).forEach((key) => {
            if (key.includes("ConcreteVisitor")) {
                let file3 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Visitor.name);
                cList.push(file3);
                //this.fillPromise(ppc, file3);
            }
            else if (key.includes("ConcreteElement")) {
                let file4 = new ConcreteClass_1.ConcreteClass(obj[key].name, obj.Element.name);
                file1.addMethod(new Method_1.Method("visit" + obj[key].name, "void", true, "public", "", [new Attribute_1.Attribute(obj[key].name.toLowerCase().charAt(0), obj[key].name, "")]));
                file4.addMethod(new Method_1.Method("accept", "void", false, "public", "", [new Attribute_1.Attribute(obj.Visitor.name.toLowerCase().charAt(0), obj.Visitor.name, "")]));
                file4.addMethod(new Method_1.Method("feature", "void", false, "public", "", []));
                eList.push(new Method_1.Method("visit" + obj[key].name, "void", false, "public", "", [new Attribute_1.Attribute(obj[key].name.toLowerCase().charAt(0), obj[key].name, "")]));
                this.fillPromise(ppc, file4);
            }
            else {
            }
        });
        for (var i = 0; i < cList.length; i++) {
            for (var j = 0; j < eList.length; j++) {
                cList[i].addMethod(eList[j]); // each one ConcreteVisitor has a method for each one ConcreteElement
            }
            this.fillPromise(ppc, cList[i]);
        }
        let file5 = new abstractClass_1.abstractClass(obj.Visitor.name);
        this.fillPromise(ppc, file5);
        return ppc.object;
    }
    fillPromise(labelObj, item) {
        labelObj.object.push(item);
    }
}
exports.CodeGenerator = CodeGenerator;
//# sourceMappingURL=CodeGenerator.js.map