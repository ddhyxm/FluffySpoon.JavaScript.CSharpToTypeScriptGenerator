"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnumEmitter_1 = require("./EnumEmitter");
var ClassEmitter_1 = require("./ClassEmitter");
var InterfaceEmitter_1 = require("./InterfaceEmitter");
var StructEmitter_1 = require("./StructEmitter");
var ts = require("typescript");
var NamespaceEmitter = /** @class */ (function () {
    function NamespaceEmitter(stringEmitter, logger) {
        this.stringEmitter = stringEmitter;
        this.logger = logger;
        this.enumEmitter = new EnumEmitter_1.EnumEmitter(stringEmitter, logger);
        this.classEmitter = new ClassEmitter_1.ClassEmitter(stringEmitter, logger);
        this.interfaceEmitter = new InterfaceEmitter_1.InterfaceEmitter(stringEmitter, logger);
        this.structEmitter = new StructEmitter_1.StructEmitter(stringEmitter, logger);
    }
    NamespaceEmitter.prototype.emitNamespaces = function (namespaces, options) {
        this.logger.log("Emitting namespaces", namespaces);
        for (var _i = 0, namespaces_1 = namespaces; _i < namespaces_1.length; _i++) {
            var namespace = namespaces_1[_i];
            this.emitNamespace(namespace, options);
        }
        this.logger.log("Done emitting namespaces", namespaces);
    };
    NamespaceEmitter.prototype.emitNamespace = function (namespace, options) {
        var nodes = this.createTypeScriptNamespaceNodes(namespace, options);
        this.stringEmitter.emitTypeScriptNodes(nodes);
    };
    NamespaceEmitter.prototype.createTypeScriptNamespaceNodes = function (namespace, options) {
        if (!options.filter(namespace))
            return [];
        this.logger.log("Emitting namespace", namespace);
        var modifiers = new Array();
        if (options.declare)
            modifiers.push(ts.createToken(ts.SyntaxKind.DeclareKeyword));
        var content = new Array();
        for (var _i = 0, _a = namespace.enums; _i < _a.length; _i++) {
            var enumObject = _a[_i];
            content.push(this.enumEmitter.createTypeScriptEnumNode(enumObject, Object.assign({ declare: options.skip }, options.enumEmitOptions)));
        }
        for (var _b = 0, _c = namespace.classes; _b < _c.length; _b++) {
            var classObject = _c[_b];
            var classNodes = this.classEmitter.createTypeScriptClassNodes(classObject, Object.assign({ declare: options.skip }, options.classEmitOptions));
            for (var _d = 0, classNodes_1 = classNodes; _d < classNodes_1.length; _d++) {
                var classNode = classNodes_1[_d];
                content.push(classNode);
            }
        }
        for (var _e = 0, _f = namespace.interfaces; _e < _f.length; _e++) {
            var interfaceObject = _f[_e];
            var interfaceNodes = this.interfaceEmitter.createTypeScriptInterfaceNodes(interfaceObject, Object.assign({ declare: options.skip }, options.interfaceEmitOptions));
            for (var _g = 0, interfaceNodes_1 = interfaceNodes; _g < interfaceNodes_1.length; _g++) {
                var interfaceNode = interfaceNodes_1[_g];
                content.push(interfaceNode);
            }
        }
        for (var _h = 0, _j = namespace.namespaces; _h < _j.length; _h++) {
            var namespaceObject = _j[_h];
            var namespaceNodes = this.createTypeScriptNamespaceNodes(namespaceObject, Object.assign(Object.assign({}, options), { declare: false }));
            for (var _k = 0, namespaceNodes_1 = namespaceNodes; _k < namespaceNodes_1.length; _k++) {
                var namespaceNode = namespaceNodes_1[_k];
                content.push(namespaceNode);
            }
        }
        for (var _l = 0, _m = namespace.structs; _l < _m.length; _l++) {
            var structObject = _m[_l];
            content.push(this.structEmitter.createTypeScriptStructNode(structObject, Object.assign({ declare: options.skip }, options.structEmitOptions)));
        }
        var nodes = new Array();
        if (!options.skip) {
            nodes.push(ts.createModuleDeclaration([], modifiers, ts.createIdentifier(namespace.name), ts.createModuleBlock(content), ts.NodeFlags.Namespace | ts.NodeFlags.NestedNamespace));
        }
        else {
            nodes = content;
        }
        this.logger.log("Done emitting namespace", namespace);
        return nodes;
    };
    return NamespaceEmitter;
}());
exports.NamespaceEmitter = NamespaceEmitter;
//# sourceMappingURL=NamespaceEmitter.js.map