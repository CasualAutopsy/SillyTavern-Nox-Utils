// @ts-nocheck
const { macros } = await import(/* webpackIgnore: true */'/scripts/macros/macro-system.js');

const { parseMacroValueOrVar, parseMacroBoolOrVar } = await import(/* webpackIgnore: true */'/scripts/extensions/third-party/STLibs-Nox-Library/scripts/macro-parsing.js');


/**
 * Initialize the boolean ops macros
 */
export async function initBoolMacros() {
    /**
     * Check if a value is falsy.
     */
    macros.register(
        'isFalsy',
        {
            category: 'Nox Utils - Boolean Ops',
            unnamedArgs: [
                {
                    name: 'value',
                    sampleValue: '1, 0, "hello world!", true, .localVar, $globalVar',
                    description: 'The value to check.',
                },
            ],
            description: 'Check if a value is falsy.',
            returns: 'Whether the value is falsy.',
            returnType: 'boolean',
            displayOverride: '{{isFalsy::value}}',
            exampleUsage: [
                '{{isFalsy::1}}',
                '{{isFalsy::0}}',
                '{{isFalsy::hello world!}}',
                '{{isFalsy::true}}',
                '{{isFalsy::.localVar}}',
                '{{isFalsy::$globalVar}}',
            ],
            handler: ({unnamedArgs: [value], resolve}) => {
                value = parseMacroValueOrVar(value, resolve);

                return value == false
                    ? true
                    : false;
            }
        }
    );

    /**
     * Check if a value is truthy.
     */
    macros.register(
        'isTruthy',
        {
            category: 'Nox Utils - Boolean Ops',
            unnamedArgs: [
                {
                    name: 'value',
                    sampleValue: '1, 0, "hello world!", true, .localVar, $globalVar',
                    description: 'The value to check.',
                },
            ],
            description: 'Check if a value is truthy.',
            returns: 'Whether the value is truthy.',
            returnType: 'boolean',
            displayOverride: '{{isTruthy::value}}',
            exampleUsage: [
                '{{isTruthy::1}}',
                '{{isTruthy::0}}',
                '{{isTruthy::hello world!}}',
                '{{isTruthy::true}}',
                '{{isTruthy::.localVar}}',
                '{{isTruthy::$globalVar}}',
            ],
            handler: ({unnamedArgs: [value], resolve}) => {
                value = parseMacroValueOrVar(value, resolve);

                return value == true
                    ? true
                    : false;
            }
        }
    );

    /**
     * Check if all values are truthy.
     */
    macros.register(
        `and`,
        {
            category: 'Nox Utils - Boolean Ops',
            unnamedArgs: [
                {
                    name: 'strict_types',
                    description: 'Whether to be strict with boolean datatypes.',
                },
            ],
            list: {
                min: 1
            },
            description: 'Check if all values are truthy.',
            returns: 'Whether all values are truthy.',
            handler: ({unnamedArgs: [rawStrictTypes], list: values, resolve}) => {
                let strict = parseMacroValueOrVar(rawStrictTypes, resolve);

                if (strict == true) {
                    strict = true;
                } else {
                    strict = false;
                }

                for (const value of values) {
                    if (strict) {
                        if (parseMacroBoolOrVar(value, resolve) === false) {
                            return false;
                        }
                    } else {
                        if (parseMacroValueOrVar(value, resolve) == false) {
                            return false;
                        }
                    }
                }

                return true;
            }
        }
    );

    /**
     * Check if any values are falsy.
     */
    macros.register(
        'nand',
        {
            category: 'Nox Utils - Boolean Ops',
            unnamedArgs: [
                {
                    name: 'strict_types',
                    description: 'Whether to be strict with boolean datatypes.',
                },
            ],
            list: {
                min: 1
            },
            description: 'Check if any values are falsy.',
            returns: 'Whether any values are falsy.',
            handler: ({unnamedArgs: [rawStrictTypes], list: values, resolve}) => {
                let strict = parseMacroValueOrVar(rawStrictTypes, resolve);

                if (strict == true) {
                    strict = true;
                } else {
                    strict = false;
                }

                for (const value of values) {
                    if (strict) {
                        if (parseMacroBoolOrVar(value, resolve) === false) {
                            return true;
                        }
                    } else {
                        if (parseMacroValueOrVar(value, resolve) == false) {
                            return true;
                        }
                    }
                }

                return false;
            }
        }
    );

    /**
     * Check if any values are truthy.
     */
    macros.register(
        'or',
        {
            category: 'Nox Utils - Boolean Ops',
            unnamedArgs: [
                {
                    name: 'strict_types',
                    description: 'Whether to be strict with boolean datatypes.',
                },
            ],
            list: {
                min: 1
            },
            description: 'Check if any values are truthy.',
            returns: 'Whether any values are truthy.',
            handler: ({unnamedArgs: [rawStrictTypes], list: values, resolve}) => {
                let strict = parseMacroValueOrVar(rawStrictTypes, resolve);

                if (strict == true) {
                    strict = true;
                } else {
                    strict = false;
                }

                for (const value of values) {
                    if (strict) {
                        if (parseMacroBoolOrVar(value, resolve) === true) {
                            return true;
                        }
                    } else {
                        if (parseMacroValueOrVar(value, resolve) == true) {
                            return true;
                        }
                    }
                }

                return false;
            }
        }
    );

    /**
     * Check if all values are falsy.
     */
    macros.register(
        'nor',
        {
            category: 'Nox Utils - Boolean Ops',
            unnamedArgs: [
                {
                    name: 'strict_types',
                    description: 'Whether to be strict with boolean datatypes.',
                },
            ],
            list: {
                min: 1
            },
            description: 'Check if all values are falsy.',
            returns: 'Whether all values are falsy.',
            handler: ({unnamedArgs: [rawStrictTypes], list: values, resolve}) => {
                let strict = parseMacroValueOrVar(rawStrictTypes, resolve);

                if (strict == true) {
                    strict = true;
                } else {
                    strict = false;
                }

                for (const value of values) {
                    if (strict) {
                        if (parseMacroBoolOrVar(value, resolve) === true) {
                            return false;
                        }
                    } else {
                        if (parseMacroValueOrVar(value, resolve) == true) {
                            return false;
                        }
                    }
                }

                return true;
            }
        }
    );
}
