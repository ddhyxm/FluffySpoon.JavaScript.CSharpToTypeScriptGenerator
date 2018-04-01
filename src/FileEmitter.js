"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fluffy_spoon_javascript_csharp_parser_1 = require("fluffy-spoon.javascript.csharp-parser");
var StringEmitter_1 = require("./StringEmitter");
var OptionsHelper_1 = require("./OptionsHelper");
var StructEmitter_1 = require("./StructEmitter");
var EnumEmitter_1 = require("./EnumEmitter");
var ClassEmitter_1 = require("./ClassEmitter");
var InterfaceEmitter_1 = require("./InterfaceEmitter");
var NamespaceEmitter_1 = require("./NamespaceEmitter");
var Logger_1 = require("./Logger");
var FileEmitter = /** @class */ (function () {
    function FileEmitter(content) {
        this.fileParser = new fluffy_spoon_javascript_csharp_parser_1.FileParser(content);
        this.logger = new Logger_1.Logger();
        this.optionsHelper = new OptionsHelper_1.OptionsHelper();
        this.stringEmitter = new StringEmitter_1.StringEmitter(this.logger);
        this.enumEmitter = new EnumEmitter_1.EnumEmitter(this.stringEmitter, this.logger);
        this.classEmitter = new ClassEmitter_1.ClassEmitter(this.stringEmitter, this.logger);
        this.interfaceEmitter = new InterfaceEmitter_1.InterfaceEmitter(this.stringEmitter, this.logger);
        this.namespaceEmitter = new NamespaceEmitter_1.NamespaceEmitter(this.stringEmitter, this.logger);
        this.structEmitter = new StructEmitter_1.StructEmitter(this.stringEmitter, this.logger);
    }
    FileEmitter.prototype.emitFile = function (options) {
        this.logger.log("Emitting file.", options);
        if (!options) {
            options = {};
        }
        if (!options.classEmitOptions)
            options.classEmitOptions = {};
        if (!options.enumEmitOptions)
            options.enumEmitOptions = {};
        if (!options.interfaceEmitOptions)
            options.interfaceEmitOptions = {};
        if (!options.namespaceEmitOptions)
            options.namespaceEmitOptions = {};
        if (!options.structEmitOptions)
            options.structEmitOptions = {};
        if (!options.typeEmitOptions)
            options.typeEmitOptions = {};
        if (!options.methodEmitOptions)
            options.methodEmitOptions = {};
        if (!options.propertyEmitOptions)
            options.propertyEmitOptions = {};
        if (options.classEmitOptions) {
            if (options.namespaceEmitOptions) {
                options.namespaceEmitOptions.classEmitOptions =
                    this.optionsHelper.mergeOptions(options.classEmitOptions, options.namespaceEmitOptions.classEmitOptions);
            }
        }
        if (options.interfaceEmitOptions) {
            if (options.namespaceEmitOptions) {
                options.namespaceEmitOptions.interfaceEmitOptions =
                    this.optionsHelper.mergeOptions(options.interfaceEmitOptions, options.namespaceEmitOptions.interfaceEmitOptions);
            }
            if (options.classEmitOptions) {
                options.classEmitOptions.interfaceEmitOptions =
                    this.optionsHelper.mergeOptions(options.interfaceEmitOptions, options.classEmitOptions.interfaceEmitOptions);
            }
        }
        if (options.enumEmitOptions) {
            if (options.classEmitOptions) {
                options.classEmitOptions.enumEmitOptions =
                    this.optionsHelper.mergeOptions(options.enumEmitOptions, options.classEmitOptions.enumEmitOptions);
            }
            if (options.namespaceEmitOptions) {
                options.namespaceEmitOptions.enumEmitOptions =
                    this.optionsHelper.mergeOptions(options.enumEmitOptions, options.namespaceEmitOptions.enumEmitOptions);
            }
        }
        if (options.structEmitOptions) {
            if (options.namespaceEmitOptions) {
                options.namespaceEmitOptions.structEmitOptions =
                    this.optionsHelper.mergeOptions(options.structEmitOptions, options.namespaceEmitOptions.structEmitOptions);
            }
        }
        if (options.methodEmitOptions) {
            if (options.classEmitOptions) {
                options.classEmitOptions.methodEmitOptions =
                    this.optionsHelper.mergeOptions(options.classEmitOptions, options.classEmitOptions.methodEmitOptions);
            }
            if (options.interfaceEmitOptions) {
                options.interfaceEmitOptions.methodEmitOptions =
                    this.optionsHelper.mergeOptions(options.interfaceEmitOptions, options.interfaceEmitOptions.methodEmitOptions);
            }
        }
        if (options.propertyEmitOptions) {
            if (options.classEmitOptions) {
                options.classEmitOptions.propertyEmitOptions =
                    this.optionsHelper.mergeOptions(options.classEmitOptions, options.classEmitOptions.propertyEmitOptions);
            }
            if (options.interfaceEmitOptions) {
                options.interfaceEmitOptions.propertyEmitOptions =
                    this.optionsHelper.mergeOptions(options.interfaceEmitOptions, options.interfaceEmitOptions.propertyEmitOptions);
            }
        }
        if (options.fieldEmitOptions) {
            if (options.classEmitOptions) {
                options.classEmitOptions.fieldEmitOptions =
                    this.optionsHelper.mergeOptions(options.classEmitOptions, options.classEmitOptions.fieldEmitOptions);
            }
        }
        if (options.typeEmitOptions) {
            if (options.classEmitOptions) {
                options.classEmitOptions.genericParameterTypeEmitOptions =
                    this.optionsHelper.mergeOptions(options.typeEmitOptions, options.classEmitOptions.genericParameterTypeEmitOptions);
                options.classEmitOptions.inheritedTypeEmitOptions =
                    this.optionsHelper.mergeOptions(options.typeEmitOptions, options.classEmitOptions.inheritedTypeEmitOptions);
                if (options.classEmitOptions.fieldEmitOptions) {
                    options.classEmitOptions.fieldEmitOptions.typeEmitOptions =
                        this.optionsHelper.mergeOptions(options.typeEmitOptions, options.classEmitOptions.fieldEmitOptions.typeEmitOptions);
                }
                if (options.classEmitOptions.methodEmitOptions) {
                    options.classEmitOptions.methodEmitOptions.argumentTypeEmitOptions =
                        this.optionsHelper.mergeOptions(options.typeEmitOptions, options.classEmitOptions.methodEmitOptions.argumentTypeEmitOptions);
                    options.classEmitOptions.methodEmitOptions.returnTypeEmitOptions =
                        this.optionsHelper.mergeOptions(options.typeEmitOptions, options.classEmitOptions.methodEmitOptions.returnTypeEmitOptions);
                }
                if (options.classEmitOptions.propertyEmitOptions) {
                    options.classEmitOptions.propertyEmitOptions.typeEmitOptions =
                        this.optionsHelper.mergeOptions(options.typeEmitOptions, options.classEmitOptions.propertyEmitOptions.typeEmitOptions);
                }
            }
            if (options.interfaceEmitOptions) {
                options.interfaceEmitOptions.genericParameterTypeEmitOptions =
                    this.optionsHelper.mergeOptions(options.typeEmitOptions, options.interfaceEmitOptions.genericParameterTypeEmitOptions);
                options.interfaceEmitOptions.inheritedTypeEmitOptions =
                    this.optionsHelper.mergeOptions(options.typeEmitOptions, options.interfaceEmitOptions.inheritedTypeEmitOptions);
                if (options.interfaceEmitOptions.methodEmitOptions) {
                    options.interfaceEmitOptions.methodEmitOptions.argumentTypeEmitOptions =
                        this.optionsHelper.mergeOptions(options.typeEmitOptions, options.interfaceEmitOptions.methodEmitOptions.argumentTypeEmitOptions);
                    options.interfaceEmitOptions.methodEmitOptions.returnTypeEmitOptions =
                        this.optionsHelper.mergeOptions(options.typeEmitOptions, options.interfaceEmitOptions.methodEmitOptions.returnTypeEmitOptions);
                }
                if (options.interfaceEmitOptions.propertyEmitOptions) {
                    options.interfaceEmitOptions.propertyEmitOptions.typeEmitOptions =
                        this.optionsHelper.mergeOptions(options.typeEmitOptions, options.interfaceEmitOptions.propertyEmitOptions.typeEmitOptions);
                }
            }
        }
        this.logger.log("Using options", options);
        var file = this.fileParser.parseFile();
        if (options.onAfterParsing)
            options.onAfterParsing(file, this.stringEmitter);
        if (file.enums.length > 0) {
            this.enumEmitter.emitEnums(file.enums, Object.assign({ declare: true }, options.enumEmitOptions));
            this.stringEmitter.ensureNewParagraph();
        }
        if (file.namespaces.length > 0) {
            this.namespaceEmitter.emitNamespaces(file.namespaces, Object.assign({ declare: true }, options.namespaceEmitOptions));
            this.stringEmitter.ensureNewParagraph();
        }
        if (file.interfaces.length > 0) {
            this.interfaceEmitter.emitInterfaces(file.interfaces, Object.assign({ declare: true }, options.interfaceEmitOptions));
            this.stringEmitter.ensureNewParagraph();
        }
        if (file.classes.length > 0) {
            this.classEmitter.emitClasses(file.classes, Object.assign({ declare: true }, options.classEmitOptions));
            this.stringEmitter.ensureNewParagraph();
        }
        if (file.structs.length > 0) {
            this.structEmitter.emitStructs(file.structs, Object.assign({ declare: true }, options.structEmitOptions));
            this.stringEmitter.ensureNewParagraph();
        }
        this.stringEmitter.removeLastNewLines();
        return this.stringEmitter.output;
    };
    return FileEmitter;
}());
exports.FileEmitter = FileEmitter;
//# sourceMappingURL=FileEmitter.js.map