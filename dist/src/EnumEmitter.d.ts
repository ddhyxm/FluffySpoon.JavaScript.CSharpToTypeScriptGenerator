import { CSharpEnum } from 'fluffy-spoon.javascript.csharp-parser';
import { StringEmitter } from './StringEmitter';
import { Logger } from './Logger';
import ts = require("typescript");
export interface EnumEmitOptionsBase {
    declare?: boolean;
    strategy?: "default" | "string-union";
    filter?: (enumObject: CSharpEnum) => boolean;
}
export interface EnumEmitOptions extends EnumEmitOptionsBase {
}
export declare class EnumEmitter {
    private stringEmitter;
    private logger;
    constructor(stringEmitter: StringEmitter, logger: Logger);
    emitEnums(enums: CSharpEnum[], options: EnumEmitOptions): void;
    emitEnum(enumObject: CSharpEnum, options: EnumEmitOptions): void;
    createTypeScriptEnumNode(enumObject: CSharpEnum, options: EnumEmitOptions): ts.Statement;
}
