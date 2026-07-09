// @ts-nocheck
const { macros } = await import(/* webpackIgnore: true */'/scripts/macros/macro-system.js');

const { parseValue } = await import(/* webpackIgnore: true */'/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js');
const { parseMacroValueOrVar, parseMacroNumberOrVar } = await import(/* webpackIgnore: true */'/scripts/extensions/third-party/STLibs-Nox-Library/scripts/macro-parsing.js');

/**
 * Initialize the randomization macros
 */
export async function initRandMacros() {
    /**
     * Generate a random integer between two numbers.
     */
    macros.register(
        'randInt',
        {
            category: 'Nox Utils - Randomization',
            unnamedArgs: [
                {
                    name: 'min',
                    type: ['integer', 'number'],
                    sampleValue: '1, 2.5, .localVar, $globalVar',
                    description: 'The minimum value to generate. Round up if not an integer.',
                },
                {
                    name: 'max',
                    type: ['integer', 'number'],
                    sampleValue: '10, 12.5, .localVar, $globalVar',
                    description: 'The maximum value to generate. Round down if not an integer.',
                },
            ],
            description: 'Generate a random integer between two numbers.',
            returns: 'The randomly generated integer.',
            returnType: 'integer',
            displayOverride: '{{randInt::min::max}}',
            exampleUsage: [
                '{{randInt::1::10}}',
                '{{randInt::2.5::12.5}}',
                '{{randInt::.localVar::$globalVar}}',
            ],
            handler: ({unnamedArgs: [rawMin, rawMax], resolve}) => {
                let
                    min = parseMacroNumberOrVar(rawMin, resolve),
                    max = parseMacroNumberOrVar(rawMax, resolve);

                if (Number.isNaN(min) || Number.isNaN(max)) {
                    return 'NaN';
                }

                min = Math.ceil(min),
                max = Math.floor(max);

                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
    );

    /**
     * Generate a random float between two numbers.
     */
    macros.register(
        'randFloat',
        {
            category: 'Nox Utils - Randomization',
            unnamedArgs: [
                {
                    name: 'min',
                    type: ['number'],
                    sampleValue: '1, 2.5, .localVar, $globalVar',
                    description: 'The minimum value to generate.',
                },
                {
                    name: 'max',
                    type: ['number'],
                    sampleValue: '10, 12.5, .localVar, $globalVar',
                    description: 'The maximum value to generate.',
                },
                {
                    name: 'precision',
                    optional: true,
                    type: ['integer'],
                    sampleValue: '2, .localVar, $globalVar',
                    description: 'The number of decimal places to round to.',
                },
                {
                    name: 'uniform',
                    optional: true,
                    type: ['boolean'],
                    sampleValue: '1, 0, true, false, .localVar, $globalVar',
                    description: 'Whether to generate a number with uniform distribution when using precision. Value can be truthy or falsy.',
                }
            ],
            description: 'Generate a random float between two numbers.',
            returns: 'The randomly generated number.',
            returnType: 'number',
            displayOverride: '{{randFloat::min::max::[precision]::[uniform]}}',
            exampleUsage: [
                '{{randFloat::1::10}}',
                '{{randFloat::2.5::12.5::2}}',
                '{{randFloat::7.5::25::4::1}}',
                '{{randFloat::.localVar::$globalVar::2::true}}',
            ],
            handler: ({unnamedArgs: [rawMin, rawMax, rawPrecision, uniform], resolve}) => {
                const
                    min = parseMacroNumberOrVar(rawMin, resolve),
                    max = Number(rawMax, resolve);

                const precision = rawPrecision
                    ? parseMacroNumberOrVar(rawPrecision, resolve)
                    : undefined;

                if (Number.isNaN(min) || Number.isNaN(max) || (precision && Number.isNaN(precision))) {
                    return 'NaN';
                }

                if (precision && parseMacroValueOrVar(uniform, resolve) == true) {
                    return (Math.floor(((Math.random() * (max - min + 1)) * Math.pow(10, precision))) / Math.pow(10, precision)) + min;
                } else if (precision) {
                    return (Math.random() * (max - min) + min).toFixed(precision);
                } else {
                    return Math.random() * (max - min) + min;
                }
            }
        }
    );
}
