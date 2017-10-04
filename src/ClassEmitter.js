"use strict";
var EnumEmitter_1 = require("./EnumEmitter");
var TypeEmitter_1 = require("./TypeEmitter");
var PropertyEmitter_1 = require("./PropertyEmitter");
var FieldEmitter_1 = require("./FieldEmitter");
var MethodEmitter_1 = require("./MethodEmitter");
var ClassEmitter = (function () {
    function ClassEmitter(stringEmitter, logger) {
        this.stringEmitter = stringEmitter;
        this.logger = logger;
        this.enumEmitter = new EnumEmitter_1.EnumEmitter(stringEmitter, logger);
        this.propertyEmitter = new PropertyEmitter_1.PropertyEmitter(stringEmitter, logger);
        this.fieldEmitter = new FieldEmitter_1.FieldEmitter(stringEmitter, logger);
        this.methodEmitter = new MethodEmitter_1.MethodEmitter(stringEmitter, logger);
        this.typeEmitter = new TypeEmitter_1.TypeEmitter(stringEmitter, logger);
    }
    ClassEmitter.prototype.emitClasses = function (classes, options) {
        this.logger.log("Emitting classes", classes);
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            var classObject = classes_1[_i];
            this.emitClass(classObject, options);
        }
        this.stringEmitter.removeLastNewLines();
        this.logger.log("Done emitting classes", classes);
    };
    ClassEmitter.prototype.emitClass = function (classObject, options) {
        options = Object.assign(this.prepareOptions(options), options.perClassEmitOptions(classObject));
        if (!options.filter(classObject))
            return;
        this.logger.log("Emitting class", classObject);
        this.emitClassInterface(classObject, options);
        this.emitSubElementsInClass(classObject, options);
        this.stringEmitter.ensureLineSplit();
        this.logger.log("Done emitting class", classObject);
    };
    ClassEmitter.prototype.prepareOptions = function (options) {
        if (!options) {
            options = {
                declare: true
            };
        }
        if (!options.filter) {
            options.filter = function () { return true; };
        }
        if (!options.perClassEmitOptions) {
            options.perClassEmitOptions = function () { return options; };
        }
        return options;
    };
    ClassEmitter.prototype.emitClassInterface = function (classObject, options) {
        if (classObject.properties.length === 0 && classObject.methods.length === 0 && classObject.fields.length === 0) {
            this.logger.log("Skipping class " + classObject.name + " because it contains no properties, fields or methods");
            return;
        }
        this.stringEmitter.writeIndentation();
        if (options.declare)
            this.stringEmitter.write("declare ");
        var className = options.name || classObject.name;
        this.logger.log("Emitting class " + className);
        this.stringEmitter.write("interface " + className);
        if (classObject.inheritsFrom && this.typeEmitter.canEmitType(classObject.inheritsFrom, options.inheritedTypeEmitOptions)) {
            this.stringEmitter.write(" extends ");
            this.typeEmitter.emitType(classObject.inheritsFrom, options.inheritedTypeEmitOptions);
        }
        this.stringEmitter.write(" {");
        this.stringEmitter.writeLine();
        this.stringEmitter.increaseIndentation();
        if (classObject.fields.length > 0) {
            this.fieldEmitter.emitFields(classObject.fields, options.fieldEmitOptions);
            this.stringEmitter.ensureLineSplit();
        }
        if (classObject.properties.length > 0) {
            this.propertyEmitter.emitProperties(classObject.properties, options.propertyEmitOptions);
            this.stringEmitter.ensureLineSplit();
        }
        if (classObject.methods.length > 0) {
            this.methodEmitter.emitMethods(classObject.methods, options.methodEmitOptions);
            this.stringEmitter.ensureLineSplit();
        }
        this.stringEmitter.removeLastNewLines();
        this.stringEmitter.decreaseIndentation();
        this.stringEmitter.writeLine();
        this.stringEmitter.writeLine("}");
        this.stringEmitter.ensureLineSplit();
    };
    ClassEmitter.prototype.emitSubElementsInClass = function (classObject, options) {
        if (classObject.enums.length === 0 && classObject.classes.length === 0 && classObject.interfaces.length === 0) {
            return;
        }
        this.stringEmitter.writeIndentation();
        if (options.declare)
            this.stringEmitter.write("declare ");
        this.stringEmitter.write("namespace " + classObject.name + " {");
        this.stringEmitter.writeLine();
        this.stringEmitter.increaseIndentation();
        var classEnumOptions = Object.assign(options.enumEmitOptions || {}, {
            declare: false
        });
        this.enumEmitter.emitEnums(classObject.enums, classEnumOptions);
        this.stringEmitter.writeLine();
        var subClassOptions = Object.assign(options, {
            declare: false
        });
        this.emitClasses(classObject.classes, subClassOptions);
        var classInterfaceOptions = Object.assign(options, {
            declare: false
        });
        this.interfaceEmitter.emitInterfaces(classObject.interfaces, classInterfaceOptions);
        this.stringEmitter.ensureLineSplit();
        this.stringEmitter.decreaseIndentation();
        this.stringEmitter.writeLine();
        this.stringEmitter.writeLine("}");
        this.stringEmitter.ensureLineSplit();
    };
    return ClassEmitter;
}());
exports.ClassEmitter = ClassEmitter;