import { handlerListSampling, handlerDropOutSampling } from './sampling-handlers.js';

const { macros } = SillyTavern.getContext();

/**
 * @import {} from '../../../global'
 */

export async function initSampling() {
    /**
     * Returns a random sample of n elements from the list and joins them with the split and last_split.
     */
    macros.register(
        'sampling',
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
                    "name": 'separator',
                    "type": ['string'],
                    "sampleValue": ',, .localVar, $globalVar',
                    "description": 'The string to split the samples with.',
                },
                {
                    "name": 'last_separator',
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
            // "displayOverride": '{{randList::n::separator::last_separator::item1::item2::...}}',
            "handler": handlerListSampling
        }
    );

    macros.register(
        'dropOutSampling',
        {
            "category": 'Nox Utils - Randomization',
            "unnamedArgs": [
                {
                    "name": 'separator',
                    "type": ['string']
                },
                {
                    "name": 'last_separator',
                    "type": ['string']
                },
            ],
            "list": {
                "min": 2
            },
            "description": 'Creates a list of items that each have a dropout probability.',
            "returns": 'The formatted list after dropout is applied.',
            "returnType": 'string',
            // "displayOverride": "{{randDropOut::separator::last_separator::item1::dropout1::...}}",
            // "exampleUsage": [
            //     '{{randDropOut::,{{space}}::, and{{space}}::test item 1::0.5::test item 2::0.25::test item 3::0.75}}',
            // ],
            "handler": handlerDropOutSampling
        }
    );
}
