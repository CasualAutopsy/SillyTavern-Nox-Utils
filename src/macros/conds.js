// @ts-nocheck
const { macros } = await import(/* webpackIgnore: true */'/scripts/macros/macro-system.js');

const { parseValue } = await import(/* webpackIgnore: true */'/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js');
const { parseMacroValueOrVar, parseMacroNumberOrVar } = await import(/* webpackIgnore: true */'/scripts/extensions/third-party/STLibs-Nox-Library/scripts/macro-parsing.js');

const condTypes = [
    'condEq', 'condNeq',
    'condGt', 'condLt',
    'condGte', 'condLte'
]

function splitOnTopLevelElse(content) {
    const { cst } = macros.parser.parseDocument(content);
    const macroNodes = /** @type {import('chevrotain').CstNode[]} */ (cst?.children?.macro || []);

    let depth = 0;
    for (const macroNode of macroNodes) {
        const info = macros.cstWalker.extractMacroInfo(macroNode);
        if (!info) continue;

        // Only track scoped {{if}} blocks (1 arg = condition only, expects {{/if}})
        // Inline {{if condition::content}} has 2 args and doesn't affect depth
        if (condTypes.includes(info.name) && !info.isClosing && (info.argCount === 3 || info.argCount === 2)) {
            depth++;
        } else if (condTypes.includes(info.name) && info.isClosing) {
            depth--;
        } else if (info.name === 'else' && depth === 0) {
            return {
                thenBranch: content.slice(0, info.startOffset),
                elseBranch: content.slice(info.endOffset + 1),
            };
        }
    }

    return { thenBranch: content, elseBranch: undefined };
}

/**
 * Initialize the conditional macros
 */
export async function initCondMacros() {
    /**
     * Return the then branch content if the left and right values are equal.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condEq',
        {
            category: 'Nox Utils - Conditional Statments',
            description: 'Return the content if the left and right values are equal.',
            unnamedArgs: [
                {
                    name: 'strict_types',
                    description: 'Whether conditional should be strict on data types.',
                },
                {
                    name: 'left',
                    description: 'The first value to compare.',
                },
                {
                    name: 'right',
                    description: 'The second value to compare.',
                },
                {
                    name: 'content',
                    description: 'The content branches to return.',
                },
            ],
            exampleUsage: [
                '{{condEq::true::{{randInt 1 10}}::1}}Both numbers are equal.{{else}}Both numbers are not equal.{{/condEq}}',
                '{{condEq::false::1::true}}Both values are truthy.{{/condEq}}'
            ],
            returns: 'The content branch based on the condition result.',
            delayArgResolution: true,
            handler: ({unnamedArgs: [rawStrictTypes, rawLeft, rawRight, rawContent], flags, resolve, trimContent}) => {

                let
                    left = parseMacroValueOrVar(rawLeft, resolve),
                    right = parseMacroValueOrVar(rawRight, resolve);

                const { thenBranch, elseBranch } = splitOnTopLevelElse(rawContent);


                let chosenBranch;
                let strictTypes = rawStrictTypes !== ''
                    ? parseMacroValueOrVar(rawStrictTypes, resolve)
                    : true;

                if (strictTypes == true) {
                    chosenBranch = left === right ? thenBranch : elseBranch;
                } else {
                    chosenBranch = left == right ? thenBranch : elseBranch;
                }

                if (chosenBranch === undefined) {
                    return '';
                }

                let result = resolve(chosenBranch);
                if (!flags.preserveWhitespace) {
                    result = trimContent(result);
                }

                return result;
            }
        }
    );

    /**
     * Return the then branch content if the left and right values are not equal.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condNeq',
        {
            category: 'Nox Utils - Conditional Statments',
            description: 'Return the content if the left and right values are not equal.',
            unnamedArgs: [
                {
                    name: 'strict_types',
                    description: 'Whether conditional should be strict on data types.',
                },
                {
                    name: 'left',
                    description: 'The first value to compare.',
                },
                {
                    name: 'right',
                    description: 'The second value to compare.',
                },
                {
                    name: 'content',
                    description: 'The content branches to return.',
                },
            ],
            returns: 'The content branch based on the condition result.',
            delayArgResolution: true,
            handler: ({unnamedArgs: [rawStrictTypes, rawLeft, rawRight, rawContent], flags, resolve, trimContent}) => {

                let
                    left = parseMacroValueOrVar(rawLeft, resolve),
                    right = parseMacroValueOrVar(rawRight, resolve);

                const { thenBranch, elseBranch } = splitOnTopLevelElse(rawContent);


                let chosenBranch;
                let strictTypes = rawStrictTypes !== ''
                    ? parseMacroValueOrVar(rawStrictTypes, resolve)
                    : true;

                if (strictTypes == true) {
                    chosenBranch = left !== right ? thenBranch : elseBranch;
                } else {
                    chosenBranch = left != right ? thenBranch : elseBranch;
                }

                if (chosenBranch === undefined) {
                    return '';
                }

                let result = resolve(chosenBranch);
                if (!flags.preserveWhitespace) {
                    result = trimContent(result);
                }

                return result;
            }
        }
    );

    /**
     * Return the then branch content if the left is greater than the right value.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condGt',
        {
            category: 'Nox Utils - Conditional Statments',
            description: 'Return the content if the left value is greater than the right value.',
            unnamedArgs: [
                {
                    name: 'left',
                    description: 'The first value to compare.',
                },
                {
                    name: 'right',
                    description: 'The second value to compare.',
                },
                {
                    name: 'content',
                    description: 'The content branches to return.',
                },
            ],
            returns: 'The content branch based on the condition result.',
            delayArgResolution: true,
            handler: ({unnamedArgs: [rawLeft, rawRight, rawContent], flags, resolve, trimContent}) => {

                let
                    left = parseMacroNumberOrVar(rawLeft, resolve),
                    right = parseMacroNumberOrVar(rawRight, resolve);

                if (Number.isNaN(left) || Number.isNaN(right)) {
                    return 'NaN';
                }

                const { thenBranch, elseBranch } = splitOnTopLevelElse(rawContent);


                const chosenBranch = left > right ? thenBranch : elseBranch;

                if (chosenBranch === undefined) {
                    return '';
                }

                let result = resolve(chosenBranch);
                if (!flags.preserveWhitespace) {
                    result = trimContent(result);
                }

                return result;
            }
        }
    );

    /**
     * Return the then branch content if the left is greater than or equal to the right value.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condGte',
        {
            category: 'Nox Utils - Conditional Statments',
            description: 'Return the content if the left value is greater than or equal to the right value.',
            unnamedArgs: [
                {
                    name: 'left',
                    description: 'The first value to compare.',
                },
                {
                    name: 'right',
                    description: 'The second value to compare.',
                },
                {
                    name: 'content',
                    description: 'The content branches to return.',
                },
            ],
            returns: 'The content branch based on the condition result.',
            delayArgResolution: true,
            handler: ({unnamedArgs: [rawLeft, rawRight, rawContent], flags, resolve, trimContent}) => {

                let
                    left = parseMacroNumberOrVar(rawLeft, resolve),
                    right = parseMacroNumberOrVar(rawRight, resolve);

                if (Number.isNaN(left) || Number.isNaN(right)) {
                    return 'NaN';
                }

                const { thenBranch, elseBranch } = splitOnTopLevelElse(rawContent);


                const chosenBranch = left >= right ? thenBranch : elseBranch;

                if (chosenBranch === undefined) {
                    return '';
                }

                let result = resolve(chosenBranch);
                if (!flags.preserveWhitespace) {
                    result = trimContent(result);
                }

                return result;
            }
        }
    );

    /**
     * Return the then branch content if the left is less than the right value.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condLt',
        {
            category: 'Nox Utils - Conditional Statments',
            description: 'Return the content if the left value is less than the right value.',
            unnamedArgs: [
                {
                    name: 'left',
                    description: 'The first value to compare.',
                },
                {
                    name: 'right',
                    description: 'The second value to compare.',
                },
                {
                    name: 'content',
                    description: 'The content branches to return.',
                },
            ],
            returns: 'The content branch based on the condition result.',
            delayArgResolution: true,
            handler: ({unnamedArgs: [rawLeft, rawRight, rawContent], flags, resolve, trimContent}) => {

                let
                    left = parseMacroNumberOrVar(rawLeft, resolve),
                    right = parseMacroNumberOrVar(rawRight, resolve);

                if (Number.isNaN(left) || Number.isNaN(right)) {
                    return 'NaN';
                }

                const { thenBranch, elseBranch } = splitOnTopLevelElse(rawContent);


                const chosenBranch = left < right ? thenBranch : elseBranch;

                if (chosenBranch === undefined) {
                    return '';
                }

                let result = resolve(chosenBranch);
                if (!flags.preserveWhitespace) {
                    result = trimContent(result);
                }

                return result;
            }
        }
    );

    /**
     * Return the then branch content if the left is less than or equal to the right value.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condLte',
        {
            category: 'Nox Utils - Conditional Statments',
            description: 'Return the content if the left value is less than or equal to the right value.',
            unnamedArgs: [
                {
                    name: 'left',
                    description: 'The first value to compare.',
                },
                {
                    name: 'right',
                    description: 'The second value to compare.',
                },
                {
                    name: 'content',
                    description: 'The content branches to return.',
                },
            ],
            returns: 'The content branch based on the condition result.',
            delayArgResolution: true,
            handler: ({unnamedArgs: [rawLeft, rawRight, rawContent], flags, resolve, trimContent}) => {

                let
                    left = parseMacroNumberOrVar(rawLeft, resolve),
                    right = parseMacroNumberOrVar(rawRight, resolve);

                if (Number.isNaN(left) || Number.isNaN(right)) {
                    return 'NaN';
                }

                const { thenBranch, elseBranch } = splitOnTopLevelElse(rawContent);


                const chosenBranch = left <= right ? thenBranch : elseBranch;

                if (chosenBranch === undefined) {
                    return '';
                }

                let result = resolve(chosenBranch);
                if (!flags.preserveWhitespace) {
                    result = trimContent(result);
                }

                return result;
            }
        }
    );
}
