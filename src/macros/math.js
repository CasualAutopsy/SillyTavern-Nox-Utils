const { macros } = SillyTavern.getContext();

const { shorthandFloatResolver } = NoxLib.MacroCoercionAndShorthand.VarShorthand

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
            "category": 'Nox Utils - Math Ops',
            "list": {
                "min": 2
            },
            "description": 'Add a list of numbers together.',
            "returns": 'The resulting number.',
            "returnType": 'number',
            "handler": ({list: values, resolve}) => {
                let num = 0;

                values = values !== null
                    ? values
                    : [];

                values.forEach((val) => {
                    num += shorthandFloatResolver(val, resolve);
                });

                return String(num);
            }
        }
    );

    /**
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
            "handler": ({list: values, resolve}) => {
                values = values !== null
                    ? values
                    : [];

                if (values.length === 0) {
                    return '0';
                }

                const subtractee = values.shift();

                if (values.length === 0) {
                    return String(subtractee);
                }

                let num = shorthandFloatResolver(subtractee, resolve);

                values.forEach((val) => {
                    num -= shorthandFloatResolver(val, resolve);
                });

                return String(num);
            }
        }
    );

    /**
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
            "handler": ({list: values, resolve}) => {
                let num = 1;

                values = values !== null
                    ? values
                    : [];

                values.forEach((val) => {
                    num *= shorthandFloatResolver(val, resolve);
                });

                return String(num);
            }
        }
    );

    /**
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
            "handler": ({list: values, resolve}) => {
                values = values !== null
                    ? values
                    : [];

                if (values.length === 0) {
                    return '0';
                }

                const dividend = values.shift();

                if (values.length === 0) {
                    return String(dividend);
                }

                let num = shorthandFloatResolver(dividend, resolve);

                values.forEach((val) => {
                    num /= shorthandFloatResolver(val, resolve);
                });

                return String(num);
            }
        }
    );

    /**
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
            "handler": ({list: values, resolve}) => {
                values = values !== null
                    ? values
                    : [];

                if (values.length === 0) {
                    return '0';
                }

                return String(Math.max(...values.map((val) => shorthandFloatResolver(val, resolve))));
            }
        }
    );

    /**
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
            "handler": ({list: values, resolve}) => {
                values = values !== null
                    ? values
                    : [];

                if (values.length === 0) {
                    return '0';
                }

                return String(Math.min(...values.map((val) => shorthandFloatResolver(val, resolve))));
            }
        }
    );

    /**
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
            "handler": ({unnamedArgs: [base, exponent], resolve}) => {
                return String(Math.pow(shorthandFloatResolver(base, resolve), shorthandFloatResolver(exponent, resolve)));
            }
        }
    );

    /**
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
            "handler": ({unnamedArgs: [dividend, divisor], resolve}) => {
                return String(shorthandFloatResolver(dividend, resolve) % shorthandFloatResolver(divisor, resolve));
            }
        }
    );

    /**
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
            "handler": ({unnamedArgs: [value], resolve}) => {
                return String(Math.sqrt(shorthandFloatResolver(value, resolve)));
            }
        }
    );

    /**
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
            "handler": ({unnamedArgs: [value], resolve}) => {
                return String(Math.abs(shorthandFloatResolver(value, resolve)));
            }
        }
    );

    /**
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
            "handler": ({unnamedArgs: [value], resolve}) => {
                return String(Math.log(shorthandFloatResolver(value, resolve)));
            }
        }
    );

    /**
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
            "handler": ({unnamedArgs: [value], resolve}) => {
                return String(Math.cos(shorthandFloatResolver(value, resolve)));
            }
        }
    );

    /**
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
            "handler": ({unnamedArgs: [value], resolve}) => {
                return String(Math.sin(shorthandFloatResolver(value, resolve)));
            }
        }
    );

    /**
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
            "handler": ({unnamedArgs: [value], resolve}) => {
                return String(Math.tan(shorthandFloatResolver(value, resolve)));
            }
        }
    );
}
