import {handlerIsFalsy, handlerIsTruthy} from './truthy-handlers.js';

const { macros } = SillyTavern.getContext();

/**
 * Initialize the boolean ops macros
 */
export async function initBoolTruthyFalsy() {
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
            "handler": handlerIsFalsy
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
            "handler": handlerIsTruthy
        }
    );
}
