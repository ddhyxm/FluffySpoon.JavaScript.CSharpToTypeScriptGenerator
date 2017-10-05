﻿/// <reference path="../typings/tsd.d.ts" />
// Disabled multiline warning, we're fine with ES5
// jshint -W043

var sampleFile = "\
using System;\n\
\n\
namespace MyNamespace.Domain\n\
{\n\
    public interface IMyPoco\n\
    {\n\
        string Name { get; set; }\n\
    }\n\
	\n\
    public abstract class MyPoco : IMyPoco\n\
    {\n\
        public string Name { get; set; }\n\
    }\n\
}\n";

var expectedOutput = "declare interface MyPoco {\n\
    Name: string;\n\
}";

var pocoGen = require('./adapters/legacyAdapter.js');

describe('typescript-cs-poco', function() {
	it('should transform an abstract class correctly', function() {
		var result = pocoGen(sampleFile, { ignoreInheritance: ['IMyPoco'] });
        
        expect(result).toEqual(expectedOutput);
	});
});
