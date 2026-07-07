// @ts-nocheck
const { macros } = await import(/* webpackIgnore: true */'/scripts/macros/macro-system.js');

const { parseValue } = await import(/* webpackIgnore: true */'/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js')

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
                    description: 'The minimum value to generate.',
                },
                {
                    name: 'max',
                    description: 'The maximum value to generate.',
                },
            ],
            description: 'Generate a random integer between two numbers.',
            returns: 'The randomly generated number.',
            handler: ({unnamedArgs: [rawMin, rawMax]}) => {
                rawMin = Number(rawMin);
                rawMax = Number(rawMax);

                if (Number.isNaN(rawMin) || Number.isNaN(rawMax)) {
                    return 'NaN';
                }

                const
                    min = Math.ceil(rawMin),
                    max = Math.floor(rawMax);

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
                    description: 'The minimum value to generate.',
                },
                {
                    name: 'max',
                    description: 'The maximum value to generate.',
                },
                {
                    name: 'precision',
                    optional: true,
                    description: 'The number of decimal places to round to.',
                },
                {
                    name: 'uniform',
                    optional: true,
                    description: 'Whether to generate a number with uniform distribution when using precision.',
                }
            ],
            description: 'Generate a random float between two numbers.',
            returns: 'The randomly generated number.',
            handler: ({unnamedArgs: [rawMin, rawMax, rawPrecision, uniform]}) => {
                const
                    min = Number(rawMin),
                    max = Number(rawMax);

                const precision = rawPrecision
                    ? Number(rawPrecision)
                    : undefined;

                if (Number.isNaN(min) || Number.isNaN(max) || (precision && Number.isNaN(precision))) {
                    return 'NaN';
                }

                if (precision && parseValue(uniform) == true) {
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
