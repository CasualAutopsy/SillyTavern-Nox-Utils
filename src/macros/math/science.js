import {
    handlerPow,
    handlerSqrt, handlerCbrt,
    handlerAbs,
    handlerLog,
    handlerCos, handlerSin, handlerTan
} from './science-handlers.js';

const { macros } = SillyTavern.getContext();

/**
 * @import {} from '../../../global'
 */

Math.cbrt

/**
 * Initialize the math ops macros
 */
export async function initSciMath() {
    /*
     * Perform a power operation on a number.
     */
    macros.register(
        'pow',
        {
            "category": 'Nox Utils - Math Ops',
            "unnamedArgs": [
                {
                    "name": 'base',
                    "description": 'The base number.',
                },
                {
                    "name": 'exponent',
                    "description": 'The exponent to apply to the base number.',
                },
            ],
            "description": 'Perform a power operation on a number.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerPow
        }
    );

    /*
     * Perform a square root operation on a number.
     */
    macros.register(
        'sqrt',
        {
            "category": 'Nox Utils - Math Ops',
            "unnamedArgs": [
                {
                    "name": 'value',
                    "description": 'The value to perform the square root operation on.',
                },
            ],
            "description": 'Perform a square root operation on a number.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerSqrt
        }
    );

    /*
     * Perform a cube root operation on a number.
     */
    macros.register(
        'cbrt',
        {
            "category": 'Nox Utils - Math Ops',
            "unnamedArgs": [
                {
                    "name": 'value',
                    "description": 'The value to perform the cube root operation on.',
                },
            ],
            "description": 'Perform a cube root operation on a number.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerCbrt
        }
    );

    /*
     * Perform an absolute value operation on a number.
     */
    macros.register(
        'abs',
        {
            "category": 'Nox Utils - Math Ops',
            "unnamedArgs": [
                {
                    "name": 'value',
                    "description": 'The value to perform the absolute value operation on.',
                },
            ],
            "description": 'Perform an absolute value operation on a number.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerAbs
        }
    );

    /*
     * Perform a logarithm operation on a number.
     */
    macros.register(
        'log',
        {
            "category": 'Nox Utils - Math Ops',
            "unnamedArgs": [
                {
                    "name": 'value',
                    "description": 'The value to perform the logarithm operation on.',
                },
            ],
            "description": 'Perform a logarithm operation on a number.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerLog
        }
    );

    /*
     * Perform a cosine operation on a number.
     */
    macros.register(
        'cos',
        {
            "category": 'Nox Utils - Math Ops',
            "unnamedArgs": [
                {
                    "name": 'value',
                    "description": 'The value to perform the cosine operation on.',
                },
            ],
            "description": 'Perform a cosine operation on a number.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerCos
        }
    );

    /*
     * Perform a sine operation on a number.
     */
    macros.register(
        'sin',
        {
            "category": 'Nox Utils - Math Ops',
            "unnamedArgs": [
                {
                    "name": 'value',
                    "description": 'The value to perform the sine operation on.',
                },
            ],
            "description": 'Perform a sine operation on a number.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerSin
        }
    );

    /*
     * Perform a tangent operation on a number.
     */
    macros.register(
        'tan',
        {
            "category": 'Nox Utils - Math Ops',
            "unnamedArgs": [
                {
                    "name": 'value',
                    "description": 'The value to perform the tangent operation on.',
                },
            ],
            "description": 'Perform a tangent operation on a number.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": handlerTan
        }
    );
}
