const { macros } = SillyTavern.getContext();

const {
    sampleSize,
    round
} = SillyTavern.libs.lodash;

const {
    shorthandStringResolver,
    shorthandLaxBoolResolver,
    shorthandIntResolver, shorthandFloatResolver, shorthandLaxNumResolver
} = NoxLib.MacroCoercionAndShorthand.VarShorthand;

const { floatParse } = NoxLib.MacroCoercionAndShorthand.ValCoercion;

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
            "handler": ({unnamedArgs: [rawMin, rawMax], resolve}) => {
                const
                    min = shorthandIntResolver(rawMin, resolve),
                    max = shorthandIntResolver(rawMax, resolve);

                return String(Math.floor(Math.random() * (max - min + 1)) + min);
            }
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
            "handler": ({unnamedArgs: [rawMin, rawMax, rawPrecision, uniform], resolve}) => {
                const
                    min = shorthandFloatResolver(rawMin, resolve),
                    max = shorthandFloatResolver(rawMax, resolve);

                const precision = shorthandIntResolver(rawPrecision, resolve);

                if (precision && shorthandLaxBoolResolver(uniform, resolve)) {
                    return String((Math.floor(((Math.random() * (max - min + 1)) * Math.pow(10, precision))) / Math.pow(10, precision)) + min);
                } else if (precision) {
                    return String((Math.random() * (max - min) + min).toFixed(precision) + min);
                } else {
                    return String(Math.random() * (max - min) + min);
                }
            }
        }
    );

    /**
     * Returns a random sample of n elements from the list and joins them with the split and last_split.
     */
    macros.register(
        'randList',
        {
            "category": 'Nox Utils - Randomization',
            "unnamedArgs": [
                {
                    "name": 'n',
                    "type": ['integer', 'number'],
                    "sampleValue": '1, 3, .localVar, $globalVar',
                    "description": 'The number of elements to sample from the list.',
                },
                {
                    "name": 'seperator',
                    "type": ['string'],
                    "sampleValue": ',, .localVar, $globalVar',
                    "description": 'The string to split the samples with.',
                },
                {
                    "name": 'last_seperator',
                    "type": ['string'],
                    "sampleValue": ', and, .localVar, $globalVar',
                    "description": 'The string to split the last and second-to-last element with.',
                },
            ],
            "list": {
                "min": 2,
            },
            "description": 'Returns a random sample of n elements from the list and joins them with the split and last_split.',
            "returns": 'The randomly generated list.',
            "returnType": 'string',
            "displayOverride": '{{randList::n::seperator::last_seperator::item1::item2::...}}',
            "handler": ({unnamedArgs: [nRaw, sepRaw, lastSepRaw], list: listRaw, resolve}) => {
                if (listRaw == null) {
                    console.error('[Nox-Utils]|[Macro: randList] The macro has null as it\'s value.')

                    return '';
                }

                let n = shorthandLaxNumResolver(nRaw, resolve);

                if (n < 1.0) {
                    n = round((listRaw.length * n));

                    if (n === 0) n = 1;
                } else if (n > listRaw.length) {
                    n = listRaw.length;
                }

                const
                    sep = shorthandStringResolver(sepRaw, resolve),
                    lastSep = shorthandStringResolver(lastSepRaw, resolve);


                const sampled_list = sampleSize(listRaw, n);

                if (lastSep) {
                    return sampled_list.slice(0, -2).join(sep) + sep + sampled_list.slice(-2).join(lastSep);
                } else {
                    return sampled_list.join(sep);
                }
            }
        }
    );

    macros.register(
        'randDropOut',
        {
            "category": 'Nox Utils - Randomization',
            "unnamedArgs": [
                {
                    "name": 'seperator',
                    "type": ['string']
                },
                {
                    "name": 'last_seperator',
                    "type": ['string']
                },
            ],
            "list": {
                "min": 2
            },
            "description": 'Creates a list of items that each have a dropout probability.',
            "returns": 'The formatted list after dropout is applied.',
            "returnType": 'string',
            "displayOverride": "{{randDropOut::seperator::last_seperator::item1::dropout1::...}}",
            "exampleUsage": [
                '{{randDropOut::,{{space}}::, and{{space}}::test item 1::0.5::test item 2::0.25::test item 3::0.75}}',
            ],
            "handler": ({unnamedArgs: [sepRaw, lastSepRaw], list: listRaw, resolve}) => {
                if (listRaw == null) {
                    console.error('[Nox-Utils]|[Macro: randDropOut] The macro has null as it\'s value.')

                    return '';
                }

                /** @type {[text: String, dropout: Number][]} */
                let list = [];

                for (let i = 0; i < listRaw.length; i += 2) {
                    const
                        text = listRaw[i],
                        num = floatParse(listRaw[i+1]);

                    if (typeof text !== 'string' || typeof num !== 'number') {
                        console.error('[Nox-Utils]|[Macro: randDropOut] The list must be an alternating list of string and numbers.');

                        return '';
                    }

                    list.push([listRaw[i], shorthandFloatResolver(listRaw[i + 1], resolve)]);
                }

                const
                    sep = shorthandStringResolver(sepRaw, resolve),
                    lastSep = shorthandStringResolver(lastSepRaw, resolve);

                const sampled_list = list.map(([text, dropout]) => {
                    if (Math.random() < dropout) {
                        return '';
                    } else {
                        return text;
                    }
                }).filter((text) => text !== '');

                if (lastSep && sampled_list.length > 2) {
                    return sampled_list.slice(0, -2).join(sep) + sep + sampled_list.slice(-2).join(lastSep);
                } else {
                    return sampled_list.join(sep);
                }
            }
        }
    );
}
