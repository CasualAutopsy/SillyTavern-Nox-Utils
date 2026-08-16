import {
    handlerAdd, handlerSub,
    handlerMul, handlerDiv,
    handlerMod
} from './simple-handlers.js';

const { macros } = SillyTavern.getContext();

/**
 * @import {} from '../../../global'
 */

/**
 * Initialize simplistic math operatations.
 */
export async function initSimpleMath() {
    /*
     * Add a list of numbers together.
     */
    macros.register(
        'add',
        {
            "category": 'Nox Utils - Math Ops',
            "list": {
                "min": 2
            },
            "description": 'Add a list of numbers together.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerAdd
        }
    );

    /*
     * Subtract a list of numbers from the first item in the list.
     */
    macros.register(
        'sub',
        {
            "category": 'Nox Utils - Math Ops',
            "list": {
                "min": 2
            },
            "description": 'Subtract a list of numbers from the first item in the list.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerSub
        }
    );

    /*
     * Multiply a list of numbers together.
     */
    macros.register(
        'mul',
        {
            "category": 'Nox Utils - Math Ops',
            "list": {
                "min": 2
            },
            "description": 'Multiply a list of numbers together.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerMul
        }
    );

    /*
     * Divide the first number in by the following numbers in the list.
     */
    macros.register(
        'div',
        {
            "category": 'Nox Utils - Math Ops',
            "list": {
                "min": 2
            },
            "description": 'Divide the first number in by the following numbers in the list.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerDiv
        }
    );

    /*
     * Perform a modulo operation on two values.
     */
    macros.register(
        'mod',
        {
            "category": 'Nox Utils - Math Ops',
            "unnamedArgs": [
                {
                    "name": 'dividend',
                    "description": 'The dividend.',
                },
                {
                    "name": 'divisor',
                    "description": 'The divisor.',
                },
            ],
            "description": 'Perform a modulo operation on two values.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerMod
        }
    );
}
