import { isIdentifier, isPropertyAccessExpression } from 'tsutils';
import * as ts from 'typescript';

import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
    /* tslint:disable:object-literal-sort-keys */
    public static metadata: Lint.IRuleMetadata = {
        ruleName: 'custom-no-console',
        description: 'Bans the use of specified `console` methods.',
        rationale: 'In general, `console` methods aren\'t appropriate for production code.',
        optionsDescription:
            'A list of method names to ban. If no method names are provided, all console methods are banned.',
        options: {
            type: 'array',
            items: { type: 'string' },
        },
        optionExamples: [[true, 'log', 'error']],
        type: 'functionality',
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */

    public static FAILURE_STRING_FACTORY(method: string) {
        return `'console.${method}' are not allowed.`;
    }

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk, this.ruleArguments);
    }
}

function walk(ctx: Lint.WalkContext<string[]>) {
    return ts.forEachChild(ctx.sourceFile, function cb(node): void {
        if (
            isPropertyAccessExpression(node) &&
            isIdentifier(node.expression) &&
            node.expression.text === 'console' &&
            (ctx.options.length === 0 || ctx.options.indexOf(node.name.text) !== -1)
        ) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING_FACTORY(node.name.text));
        }
        return ts.forEachChild(node, cb);
    });
}
