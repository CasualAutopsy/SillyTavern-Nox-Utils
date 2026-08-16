import { handlerRNGInt, handlerRNGFloat } from './rng-handlers.js';

const { macros } = SillyTavern.getContext();

/**
 * @import {} from '../../../global'
 */

/**
 * Initialize the randomization macros
 */
export async function initRNG() {
    /**
     * Generate a random integer between two numbers.
     */
    macros.register(
        'randInt',
        {
            "category": 'Nox Utils - Randomization',
            "unnamedArgs": [
                {
                    "name": 'min',
                    "type": ['integer', 'string'],
                    "sampleValue": '1, 3, .localVar, $globalVar',
                    "description": 'The minimum value to generate.',
                },
                {
                    "name": 'max',
                    "type": ['integer', 'string'],
                    "sampleValue": '10, 15, .localVar, $globalVar',
                    "description": 'The maximum value to generate.',
                },
            ],
            "description": 'Generate a random integer between two numbers.',
            "returns": 'The randomly generated integer.',
            "returnType": 'integer',
            "displayOverride": '{{randInt::min::max}}',
            "exampleUsage": [
                '{{randInt::1::10}}',
                '{{randInt::3::15}}',
                '{{randInt::.localVar::$globalVar}}',
            ],
            "handler": handlerRNGInt
        }
    );

    /**
     * Generate a random float between two numbers.
     */
    macros.register(
        'randFloat',
        {
            "category": 'Nox Utils - Randomization',
            "unnamedArgs": [
                {
                    "name": 'min',
                    "type": ['number', 'string'],
                    "sampleValue": '1, 2.5, .localVar, $globalVar',
                    "description": 'The minimum value to generate.',
                },
                {
                    "name": 'max',
                    "type": ['number', 'string'],
                    "sampleValue": '10, 12.5, .localVar, $globalVar',
                    "description": 'The maximum value to generate.',
                },
                {
                    "name": 'precision',
                    "optional": true,
                    "type": ['integer', 'string'],
                    "sampleValue": '2, .localVar, $globalVar',
                    "description": 'The number of decimal places to round to.',
                },
                {
                    "name": 'uniform',
                    "optional": true,
                    "type": ['boolean', 'integer', 'number', 'string'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'Whether to generate a number with uniform distribution when using precision. Value can be truthy or falsy.',
                }
            ],
            "description": 'Generate a random float between two numbers.',
            "returns": 'The randomly generated number.',
            "returnType": 'number',
            "displayOverride": '{{randFloat::min::max::[precision]::[uniform]}}',
            "exampleUsage": [
                '{{randFloat::1::10}}',
                '{{randFloat::2.5::12.5::2}}',
                '{{randFloat::7.5::25::4::1}}',
                '{{randFloat::.localVar::$globalVar::2::true}}',
            ],
            "handler": handlerRNGFloat
        }
    );
}
