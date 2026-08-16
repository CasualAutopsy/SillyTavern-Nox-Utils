import {
    handlerMax, handlerMin
} from './statistics-handlers.js';

const { macros } = SillyTavern.getContext();

/**
 * @import {} from '../../../global'
 */

/**
 * Initialize statistical math operations.
 */
export async function initStatsMath() {
    /*
     * Perform a maximum operation on a list of numbers.
     */
    macros.register(
        'max',
        {
            "category": 'Nox Utils - Math Ops',
            "list": {
                "min": 2
            },
            "description": 'Perform a maximum operation on a list of numbers.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerMax
        }
    );

    /*
     * Perform a minimum operation on a list of numbers.
     */
    macros.register(
        'min',
        {
            "category": 'Nox Utils - Math Ops',
            "list": {
                "min": 2
            },
            "description": 'Perform a minimum operation on a list of numbers.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerMin
        }
    );
}
