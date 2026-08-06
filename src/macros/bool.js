const { macros } = SillyTavern.getContext();

const { shorthandLaxBoolResolver, shorthandStrictBoolResolver } = NoxLib.MacroCoercionAndShorthand.VarShorthand;

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
            "category": 'Nox Utils - Boolean Ops',
            "unnamedArgs": [
                {
                    "name": 'value',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, hello world!, true, .localVar, $globalVar',
                    "description": 'The value to check.',
                },
            ],
            "description": 'Check if a value is falsy.',
            "returns": 'Whether the value is falsy.',
            "returnType": 'boolean',
            "displayOverride": '{{isFalsy::value}}',
            "exampleUsage": [
                '{{isFalsy::1}}',
                '{{isFalsy::0}}',
                '{{isFalsy::hello world!}}',
                '{{isFalsy::true}}',
                '{{isFalsy::.localVar}}',
                '{{isFalsy::$globalVar}}',
            ],
            "handler": ({unnamedArgs: [valRaw], resolve}) => {
                return String(!shorthandLaxBoolResolver(valRaw, resolve));
            }
        }
    );

    /**
     * Check if a value is truthy.
     */
    macros.register(
        'isTruthy',
        {
            "category": 'Nox Utils - Boolean Ops',
            "unnamedArgs": [
                {
                    "name": 'value',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, hello world!, true, .localVar, $globalVar',
                    "description": 'The value to check.',
                },
            ],
            "description": 'Check if a value is truthy.',
            "returns": 'Whether the value is truthy.',
            "returnType": 'boolean',
            "displayOverride": '{{isTruthy::value}}',
            "exampleUsage": [
                '{{isTruthy::1}}',
                '{{isTruthy::0}}',
                '{{isTruthy::hello world!}}',
                '{{isTruthy::true}}',
                '{{isTruthy::.localVar}}',
                '{{isTruthy::$globalVar}}',
            ],
            "handler": ({unnamedArgs: [valRaw], resolve}) => {
                return String(shorthandLaxBoolResolver(valRaw, resolve));
            }
        }
    );

    /**
     * Check if all values are truthy.
     */
    macros.register(
        `and`,
        {
            "category": 'Nox Utils - Boolean Ops',
            "unnamedArgs": [
                {
                    "name": 'strict_types',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'Whether to be strict with boolean datatypes.',
                },
            ],
            "description": 'Check if all values are truthy.',
            "returns": 'Whether all values are truthy.',
            "returnType": 'boolean',
            "displayOverride": '{{and::strict_types::value1::...}}',
            "exampleUsage": [
                '{{and::1::true::false}}',
                '{{and::false::true::1}}',
                '{{and::0::1::0}}',
                '{{and::true::true::true}}',
                '{{and::false::.localVar::$globalVar}}',
            ],
            "handler": ({unnamedArgs: [rawStrictTypes], list: values, resolve}) => {
                const strict = shorthandLaxBoolResolver(rawStrictTypes, resolve);

                values = values !== null
                    ? values
                    : [];

                if (values.length === 0) {
                    return 'false';
                }

                for (const value of values) {
                    if (strict) {
                        if (!shorthandStrictBoolResolver(value, resolve)) {
                            return 'false';
                        }
                    } else {
                        if (!shorthandLaxBoolResolver(value, resolve)) {
                            return 'false';
                        }
                    }
                }

                return 'true';
            }
        }
    );

    /**
     * Check if any values are truthy.
     */
    macros.register(
        'or',
        {
            "category": 'Nox Utils - Boolean Ops',
            "unnamedArgs": [
                {
                    "name": 'strict_types',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'Whether to be strict with boolean datatypes.',
                },
            ],
            "list": {
                "min": 1
            },
            "description": 'Check if any values are truthy.',
            "returns": 'Whether any values are truthy.',
            "returnType": 'boolean',
            "displayOverride": '{{or::strict_types::value1::...}}',
            "exampleUsage": [
                '{{or::1::true::false}}',
                '{{or::false::true::1}}',
                '{{or::0::1::0}}',
                '{{or::true::true::true}}',
                '{{or::false::.localVar::$globalVar}}',
            ],
            "handler": ({unnamedArgs: [rawStrictTypes], list: values, resolve}) => {
                const strict = shorthandLaxBoolResolver(rawStrictTypes, resolve);

                values = values !== null
                    ? values
                    : [];

                if (values.length === 0) {
                    return 'false';
                }

                for (const value of values) {
                    if (strict) {
                        if (shorthandStrictBoolResolver(value, resolve)) {
                            return 'true';
                        }
                    } else {
                        if (shorthandLaxBoolResolver(value, resolve)) {
                            return 'true';
                        }
                    }
                }

                return 'false';
            }
        }
    );

    /**
     * Output the inverse boolean value of the input.
     */
    macros.register(
        'not',
        {
            "category": 'Nox Utils - Boolean Ops',
            "unnamedArgs": [
                {
                    "name": 'strict_types',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'Whether to be strict with boolean datatypes.',
                },
                {
                    "name": 'value',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'The value to check.',
                },
            ],
            "description": 'Output the inverse boolean value of the input.',
            "returns": 'The inverse boolean value of the input.',
            "returnType": 'boolean',
            "displayOverride": '{{not::strict_types::value}}',
            "exampleUsage": [
                '{{not::1::true}}',
                '{{not::false::0}}',
                '{{not::0::1}}',
                '{{not::true::.localVar}}',
                '{{not::false::$globalVar}}',
            ],
            "handler": ({unnamedArgs: [rawStrictTypes, value], resolve}) => {
                const strict = shorthandLaxBoolResolver(rawStrictTypes, resolve);

                if (strict) {
                    return String(!shorthandStrictBoolResolver(value, resolve));
                } else {
                    return String(!shorthandLaxBoolResolver(value, resolve));
                }
            }
        }
    );

    /**
     * Check if any values are falsy.
     */
    macros.register(
        'nand',
        {
            "category": 'Nox Utils - Boolean Ops',
            "unnamedArgs": [
                {
                    "name": 'strict_types',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'Whether to be strict with boolean datatypes.',
                },
            ],
            "list": {
                "min": 1
            },
            "description": 'Check if any values are falsy.',
            "returns": 'Whether any values are falsy.',
            "returnType": 'boolean',
            "displayOverride": '{{nand::strict_types::value1::...}}',
            "exampleUsage": [
                '{{nand::1::true::false}}',
                '{{nand::false::true::1}}',
                '{{nand::0::1::0}}',
                '{{nand::true::true::true}}',
                '{{nand::false::.localVar::$globalVar}}',
            ],
            "handler": ({unnamedArgs: [rawStrictTypes], list: values, resolve}) => {
                const strict = shorthandLaxBoolResolver(rawStrictTypes, resolve);

                values = values !== null
                    ? values
                    : [];

                if (values.length === 0) {
                    return 'false';
                }

                for (const value of values) {
                    if (strict) {
                        if (!shorthandStrictBoolResolver(value, resolve)) {
                            return 'true';
                        }
                    } else {
                        if (!shorthandLaxBoolResolver(value, resolve)) {
                            return 'true';
                        }
                    }
                }

                return 'false';
            }
        }
    );

    /**
     * Check if all values are falsy.
     */
    macros.register(
        'nor',
        {
            "category": 'Nox Utils - Boolean Ops',
            "unnamedArgs": [
                {
                    "name": 'strict_types',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'Whether to be strict with boolean datatypes.',
                },
            ],
            "list": {
                "min": 1
            },
            "description": 'Check if all values are falsy.',
            "returns": 'Whether all values are falsy.',
            "returnType": 'boolean',
            "displayOverride": '{{nor::strict_types::value1::...}}',
            "exampleUsage": [
                '{{nor::1::true::false}}',
                '{{nor::false::true::1}}',
                '{{nor::0::1::0}}',
                '{{nor::true::true::true}}',
                '{{nor::false::.localVar::$globalVar}}',
            ],
            "handler": ({unnamedArgs: [rawStrictTypes], list: values, resolve}) => {
                const strict = shorthandLaxBoolResolver(rawStrictTypes, resolve);

                values = values !== null
                    ? values
                    : [];

                if (values.length === 0) {
                    return 'false';
                }

                for (const value of values) {
                    if (strict) {
                        if (shorthandStrictBoolResolver(value, resolve)) {
                            return 'false';
                        }
                    } else {
                        if (shorthandLaxBoolResolver(value, resolve)) {
                            return 'false';
                        }
                    }
                }

                return 'true';
            }
        }
    );

    /**
     * Check if only one value is truthy and the other is falsy.
     */
     macros.register(
        'xor',
        {
            "category": 'Nox Utils - Boolean Ops',
            "unnamedArgs": [
                {
                    "name": 'strict_types',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'Whether to be strict with boolean datatypes.',
                },
                {
                    "name": 'value1',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'The first value to check.',
                },
                {
                    "name": 'value2',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'The second value to check.',
                },
            ],
            "description": 'Check if only one value is truthy and the other is falsy.',
            "returns": 'Whether only one value is truthy and the other is falsy.',
            "returnType": 'boolean',
            "displayOverride": '{{xor::strict_types::value1::value2}}',
            "exampleUsage": [
                '{{xor::1::true::false}}',
                '{{xor::false::true::1}}',
                '{{xor::0::1::0}}',
                '{{xor::true::true::true}}',
                '{{xor::false::.localVar::$globalVar}}',
            ],
            "handler": ({unnamedArgs: [rawStrictTypes, value1, value2], resolve}) => {
                const strict = shorthandLaxBoolResolver(rawStrictTypes, resolve);

                if (strict) {
                    if (shorthandStrictBoolResolver(value1, resolve)) {
                        return String(shorthandStrictBoolResolver(value2, resolve));
                    } else {
                        return String(shorthandStrictBoolResolver(value2, resolve));
                    }
                } else {
                    if (shorthandLaxBoolResolver(value1, resolve)) {
                        return String(shorthandLaxBoolResolver(value2, resolve));
                    } else {
                        return String(shorthandLaxBoolResolver(value2, resolve));
                    }
                }
            }
        }
    );

    /**
     * Check if all boolean values are the same.
     */
    macros.register(
        'xnor',
        {
            "category": 'Nox Utils - Boolean Ops',
            "unnamedArgs": [
                {
                    "name": 'strict_types',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'Whether to be strict with boolean datatypes.',
                },
            ],
            "list": {
                "min": 1,
            },
            "description": 'Check if all boolean values are the same.',
            "returns": 'Whether all boolean values are the same.',
            "returnType": 'boolean',
            "displayOverride": '{{xnor::strict_types::value1::...}}',
            "exampleUsage": [
                '{{xnor::1::true::false}}',
                '{{xnor::false::true::1}}',
                '{{xnor::0::1::0}}',
                '{{xnor::true::true::true}}',
                '{{xnor::false::.localVar::$globalVar}}',
            ],
            "handler": ({unnamedArgs: [rawStrictTypes], list: values, resolve}) => {
                values = values !== null
                    ? values
                    : [];

                const firstVal = values.shift();

                if (values.length === 0 || !firstVal) {
                    return 'false';
                }

                if (values.length === 0) {
                    return 'true';
                }

                const
                    strict = shorthandLaxBoolResolver(rawStrictTypes, resolve),

                    firstValBool = strict
                        ? shorthandStrictBoolResolver(firstVal, resolve)
                        : shorthandLaxBoolResolver(firstVal, resolve);

                for (const value of values) {
                    if (strict) {
                        if (shorthandStrictBoolResolver(value, resolve) !== firstValBool) {
                            return 'false';
                        }
                    } else {
                        if (shorthandLaxBoolResolver(value, resolve) !== firstValBool) {
                            return 'false';
                        }
                    }
                }

                return 'true';
            }
        }
    );
}
