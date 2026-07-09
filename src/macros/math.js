// @ts-nocheck
const { macros } = await import(/* webpackIgnore: true */'/scripts/macros/macro-system.js');

const { parseMacroNumberOrVar } = await import(/* webpackIgnore: true */'/scripts/extensions/third-party/STLibs-Nox-Library/scripts/macro-parsing.js');

/**
 * Initialize the math ops macros
 */
export async function initMathMacros() {
    /**
     * Add a list of numbers together.
     */
    macros.register(
        'add',
        {
            category: 'Nox Utils - Math Ops',
            list: {
                min: 2
            },
            description: 'Add a list of numbers together.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({list: numList, resolve}) => {
                let num = 0;

                numList.forEach((val) => {
                    num += parseMacroNumberOrVar(val, resolve);
                });

                return num;
            }
        }
    );

    /**
     * Subtract a list of numbers from the first item in the list.
     */
    macros.register(
        'sub',
        {
            category: 'Nox Utils - Math Ops',
            list: {
                min: 2
            },
            description: 'Subtract a list of numbers from the first item in the list.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({list: [subtractee, ...subList], resolve}) => {
                let num = parseMacroNumberOrVar(subtractee, resolve);

                subList.forEach((val) => {
                    num -= parseMacroNumberOrVar(val, resolve);
                });

                return num;
            }
        }
    );

    /**
     * Multiply a list of numbers together.
     */
    macros.register(
        'mul',
        {
            category: 'Nox Utils - Math Ops',
            list: {
                min: 2
            },
            description: 'Multiply a list of numbers together.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({list: numList, resolve}) => {
                let num = 1;

                numList.forEach((val) => {
                    num *= parseMacroNumberOrVar(val, resolve);
                });

                return num;
            }
        }
    );

    /**
     * Divide a list of numbers by the first item in the list.
     */
    macros.register(
        'div',
        {
            category: 'Nox Utils - Math Ops',
            list: {
                min: 2
            },
            description: 'Divide a list of numbers by the first item in the list.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({list: [dividend, ...divList], resolve}) => {
                let num = parseMacroNumberOrVar(dividend, resolve);

                divList.forEach((val) => {
                    num /= parseMacroNumberOrVar(val, resolve);
                });

                return num;
            }
        }
    );

    /**
     * Perform a maximum operation on a list of numbers.
     */
    macros.register(
        'max',
        {
            category: 'Nox Utils - Math Ops',
            list: {
                min: 2
            },
            description: 'Perform a maximum operation on a list of numbers.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({list: numList, resolve}) => {
                return Math.max(...numList.map((val) => parseMacroNumberOrVar(val, resolve)));
            }
        }
    );

    /**
     * Perform a minimum operation on a list of numbers.
     */
    macros.register(
        'min',
        {
            category: 'Nox Utils - Math Ops',
            list: {
                min: 2
            },
            description: 'Perform a minimum operation on a list of numbers.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({list: numList, resolve}) => {
                return Math.min(...numList.map((val) => parseMacroNumberOrVar(val, resolve)));
            }
        }
    );

    /**
     * Perform a power operation on a number.
     */
    macros.register(
        'pow',
        {
            category: 'Nox Utils - Math Ops',
            unnamedArgs: [
                {
                    name: 'base',
                    description: 'The base number.',
                },
                {
                    name: 'exponent',
                    description: 'The exponent to apply to the base number.',
                },
            ],
            description: 'Perform a power operation on a number.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({unnamedArgs: [base, exponent], resolve}) => {
                return Math.pow(parseMacroNumberOrVar(base, resolve), parseMacroNumberOrVar(exponent, resolve));
            }
        }
    );

    /**
     * Perform a modulo operation on two values.
     */
    macros.register(
        'mod',
        {
            category: 'Nox Utils - Math Ops',
            unnamedArgs: [
                {
                    name: 'dividend',
                    description: 'The dividend.',
                },
                {
                    name: 'divisor',
                    description: 'The divisor.',
                },
            ],
            description: 'Perform a modulo operation on two values.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({unnamedArgs: [dividend, divisor], resolve}) => {
                return parseMacroNumberOrVar(dividend, resolve) % parseMacroNumberOrVar(divisor, resolve);
            }
        }
    );

    /**
     * Perform a square root operation on a number.
     */
    macros.register(
        'sqrt',
        {
            category: 'Nox Utils - Math Ops',
            unnamedArgs: [
                {
                    name: 'value',
                    description: 'The value to perform the square root operation on.',
                },
            ],
            description: 'Perform a square root operation on a number.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({unnamedArgs: [value], resolve}) => {
                return Math.sqrt(parseMacroNumberOrVar(value, resolve));
            }
        }
    );

    /**
     * Perform an absolute value operation on a number.
     */
    macros.register(
        'abs',
        {
            category: 'Nox Utils - Math Ops',
            unnamedArgs: [
                {
                    name: 'value',
                    description: 'The value to perform the absolute value operation on.',
                },
            ],
            description: 'Perform an absolute value operation on a number.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({unnamedArgs: [value], resolve}) => {
                return Math.abs(parseMacroNumberOrVar(value, resolve));
            }
        }
    );

    /**
     * Perform a logarithm operation on a number.
     */
    macros.register(
        'log',
        {
            category: 'Nox Utils - Math Ops',
            unnamedArgs: [
                {
                    name: 'value',
                    description: 'The value to perform the logarithm operation on.',
                },
            ],
            description: 'Perform a logarithm operation on a number.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({unnamedArgs: [value], resolve}) => {
                return Math.log(parseMacroNumberOrVar(value, resolve));
            }
        }
    );

    /**
     * Perform a cosine operation on a number.
     */
    macros.register(
        'cos',
        {
            category: 'Nox Utils - Math Ops',
            unnamedArgs: [
                {
                    name: 'value',
                    description: 'The value to perform the cosine operation on.',
                },
            ],
            description: 'Perform a cosine operation on a number.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({unnamedArgs: [value], resolve}) => {
                return Math.cos(parseMacroNumberOrVar(value, resolve));
            }
        }
    );

    /**
     * Perform a sine operation on a number.
     */
    macros.register(
        'sin',
        {
            category: 'Nox Utils - Math Ops',
            unnamedArgs: [
                {
                    name: 'value',
                    description: 'The value to perform the sine operation on.',
                },
            ],
            description: 'Perform a sine operation on a number.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({unnamedArgs: [value], resolve}) => {
                return Math.sin(parseMacroNumberOrVar(value, resolve));
            }
        }
    );

    /**
     * Perform a tangent operation on a number.
     */
    macros.register(
        'tan',
        {
            category: 'Nox Utils - Math Ops',
            unnamedArgs: [
                {
                    name: 'value',
                    description: 'The value to perform the tangent operation on.',
                },
            ],
            description: 'Perform a tangent operation on a number.',
            returns: 'The resulting number.',
            returnType: 'number',
            handler: ({unnamedArgs: [value], resolve}) => {
                return Math.tan(parseMacroNumberOrVar(value, resolve));
            }
        }
    );
}
