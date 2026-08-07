import {
    handlerAND, handlerOR,
    handlerNOT,
    handlerNAND, handlerNOR,
    handlerXOR, handlerXNOR
} from './logic-handlers.js';

const { macros } = SillyTavern.getContext();

/**
 * Initialize the boolean ops macros
 */
export async function initBoolLogic() {
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
            "handler": handlerAND
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
            "handler": handlerOR
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
            "handler": handlerNOT
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
            "handler": handlerNAND
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
            "handler": handlerNOR
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
            "handler": handlerXOR
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
            "handler": handlerXNOR
        }
    );
}
