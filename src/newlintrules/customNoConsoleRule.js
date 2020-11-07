"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Rule = void 0;
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (method) {
        return "'console." + method + "' are not allowed.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, this.ruleArguments);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: 'custom-no-console',
        description: 'Bans the use of specified `console` methods.',
        rationale: 'In general, `console` methods aren\'t appropriate for production code.',
        optionsDescription: 'A list of method names to ban. If no method names are provided, all console methods are banned.',
        options: {
            type: 'array',
            items: { type: 'string' }
        },
        optionExamples: [[true, 'log', 'error']],
        type: 'functionality',
        typescriptOnly: false
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isPropertyAccessExpression(node) &&
            tsutils_1.isIdentifier(node.expression) &&
            node.expression.text === 'console' &&
            (ctx.options.length === 0 || ctx.options.indexOf(node.name.text) !== -1)) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING_FACTORY(node.name.text));
        }
        return ts.forEachChild(node, cb);
    });
}
