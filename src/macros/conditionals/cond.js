import {
    handlerEq, handlerNeq,
    handlerGt, handlerGte,
    handlerLt, handlerLte,
    handlerIn, handlerNin
} from './cond-handlers.js';

const { macros } = SillyTavern.getContext();

const condData = NoxLib.MacroHandlers.ConditionalHandlers.GlobalConditionalData;

/**
 * @import {} from '../../../global'
 *
 * @typedef {import('/scripts/extensions/third-party/STLibs-Nox-Library/lib/macro-helpers.js').CondTuple} CondTuple'
 */

/**
 * Initialize the conditional macros
 */
export async function initConds() {
    /** @type {CondTuple} */
    const cond_batch = [];

    /**
     * Return the then branch content if the left and right values are equal.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condEq',
        {
            "category": 'Nox Utils - Conditional Statments',
            "unnamedArgs": [
                {
                    "name": 'strict_types',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'Whether conditional should be strict on data types.',
                },
                {
                    "name": 'left',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '2, 5.74, Hello World!, true, .localVar, $globalVar',
                    "description": 'The first value to compare.',
                },
                {
                    "name": 'right',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '2, 5.74, Hello World!" true, .localVar, $globalVar',
                    "description": 'The second value to compare.',
                },
                {
                    "name": 'content',
                    "type": 'string',
                    "description": 'The content branches to return.',
                },
            ],
            "description": 'Return the then branch content if the left and right values are equal.\nOtherwise, return the else branch.',
            "returns": 'The content branch based on the conditional result.',
            "returnType": 'string',
            "displayOverride": '{{condEq::strict_types::left::right::content}}',
            "exampleUsage": [
                '{{condEq::true::.localVar::3::The number is 3!}}',
                '{{condEq::1::$globalVar::Hello World!}}Hello World!{{/condEq}}',
                '{{condEq::false::{{randInt::0::1}}::true}}Heads!{{else}}Tails!{{/condEq}}',
            ],
            "delayArgResolution": true,
            "handler": handlerEq
        }
    );
    cond_batch.push(['condEq', 3]);

    /**
     * Return the then branch content if the left and right values are not equal.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condNeq',
        {
            "category": 'Nox Utils - Conditional Statments',
            "unnamedArgs": [
                {
                    "name": 'strict_types',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '1, 0, true, false, .localVar, $globalVar',
                    "description": 'Whether conditional should be strict on data types.',
                },
                {
                    "name": 'left',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '2, 5.74, Hello World!, true, .localVar, $globalVar',
                    "description": 'The first value to compare.',
                },
                {
                    "name": 'right',
                    "type": ['string', 'integer', 'number', 'boolean'],
                    "sampleValue": '2, 5.74, Hello World!" true, .localVar, $globalVar',
                    "description": 'The second value to compare.',
                },
                {
                    "name": 'content',
                    "type": 'string',
                    "description": 'The content branches to return.',
                },
            ],
            "description": 'Return the then branch content if the left and right values are not equal.\nOtherwise, return the else branch.',
            "returns": 'The content branch based on the conditional result.',
            "returnType": 'string',
            "displayOverride": '{{condNeq::strict_types::left::right::content}}',
            "exampleUsage": [
                '{{condNeq::true::.localVar::3::The number is not 3!}}',
                '{{condNeq::1::$globalVar::{{noop}}}}The string is not empty!{{/condNeq}}',
                '{{condNeq::false::{{randInt::0::1}}::false}}Pass!{{else}}Fail!{{/condNeq}}',
            ],
            "delayArgResolution": true,
            "handler": handlerNeq
        }
    );
    cond_batch.push(['condNeq', 3]);

    /**
     * Return the then branch content if the left is greater than the right value.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condGt',
        {
            "category": 'Nox Utils - Conditional Statments',
            "unnamedArgs": [
                {
                    "name": 'left',
                    "type": ['integer', 'number', 'string'],
                    "description": 'The first value to compare.',
                },
                {
                    "name": 'right',
                    "type": ['integer', 'number', 'string'],
                    "description": 'The second value to compare.',
                },
                {
                    "name": 'content',
                    "type": 'string',
                    "description": 'The content branches to return.',
                },
            ],
            "description": 'Return the then branch content if the left is greater than the right value.\nOtherwise, return the else branch.',
            "returns": 'The content branch based on the conditional result.',
            "returnType": 'string',
            "displayOverride": '{{condGt::left::right::content}}',
            "exampleUsage": [
                '{{condGt::5::3::The number is greater than 3!}}',
                '{{condGt::{{randInt::0::10}}::5}}Pass!{{else}}Fail!{{/condGt}}',
                '{{condGt::.localVar::0.5}}The number is greater than 0.5!{{/condGt}}',
            ],
            "delayArgResolution": true,
            "handler": handlerGt
        }
    );
    cond_batch.push(['condGt', 2]);

    /**
     * Return the then branch content if the left is greater than or equal to the right value.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condGte',
        {
            "category": 'Nox Utils - Conditional Statments',
            "unnamedArgs": [
                {
                    "name": 'left',
                    "type": ['integer', 'number', 'string'],
                    "description": 'The first value to compare.',
                },
                {
                    "name": 'right',
                    "type": ['integer', 'number', 'string'],
                    "description": 'The second value to compare.',
                },
                {
                    "name": 'content',
                    "type": 'string',
                    "description": 'The content branches to return.',
                },
            ],
            "description": 'Return the then branch content if the left is greater than or equal to the right value.\nOtherwise, return the else branch.',
            "returns": 'The content branch based on the conditional result.',
            "returnType": 'string',
            "displayOverride": '{{condGte::left::right::content}}',
            "exampleUsage": [
                '{{condGte::5::3::The number is greater than or equal to 3!}}',
                '{{condGte::{{randInt::0::10}}::5}}Pass!{{else}}Fail!{{/condGte}}',
                '{{condGte::.localVar::0.5}}The number is greater than or equal to 0.5!{{/condGte}}',
            ],
            "delayArgResolution": true,
            "handler": handlerGte
        }
    );
    cond_batch.push(['condGte', 2]);

    /**
     * Return the then branch content if the left is less than the right value.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condLt',
        {
            "category": 'Nox Utils - Conditional Statments',
            "unnamedArgs": [
                {
                    "name": 'left',
                    "type": ['integer', 'number', 'string'],
                    "description": 'The first value to compare.',
                },
                {
                    "name": 'right',
                    "type": ['integer', 'number', 'string'],
                    "description": 'The second value to compare.',
                },
                {
                    "name": 'content',
                    "type": 'string',
                    "description": 'The content branches to return.',
                },
            ],
            "description": 'Return the then branch content if the left is less than the right value.\nOtherwise, return the else branch.',
            "returns": 'The content branch based on the conditional result.',
            "returnType": 'string',
            "displayOverride": '{{condLt::left::right::content}}',
            "exampleUsage": [
                '{{condLt::3::5::The number is less than 5!}}',
                '{{condLt::{{randInt::0::10}}::5}}Pass!{{else}}Fail!{{/condLt}}',
                '{{condLt::.localVar::0.5}}The number is less than 0.5!{{/condLt}}',
            ],
            "delayArgResolution": true,
            "handler": handlerLt
        }
    );
    cond_batch.push(['condLt', 2]);

    /**
     * Return the then branch content if the left is less than or equal to the right value.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condLte',
        {
            "category": 'Nox Utils - Conditional Statments',
            "unnamedArgs": [
                {
                    "name": 'left',
                    "type": ['integer', 'number', 'string'],
                    "description": 'The first value to compare.',
                },
                {
                    "name": 'right',
                    "type": ['integer', 'number', 'string'],
                    "description": 'The second value to compare.',
                },
                {
                    "name": 'content',
                    "type": 'string',
                    "description": 'The content branches to return.',
                },
            ],
            "description": 'Return the then branch content if the left is less than or equal to the right value.\nOtherwise, return the else branch.',
            "returns": 'The content branch based on the conditional result.',
            "returnType": 'string',
            "displayOverride": '{{condLte::left::right::content}}',
            "exampleUsage": [
                '{{condLte::3::5::The number is less than or equal to 5!}}',
                '{{condLte::{{randInt::0::10}}::5}}Pass!{{else}}Fail!{{/condLte}}',
                '{{condLte::.localVar::0.5}}The number is less than or equal to 0.5!{{/condLte}}',
            ],
            "delayArgResolution": true,
            "handler": handlerLte
        }
    );
    cond_batch.push(['condLte', 2]);

    /**
     * Return the then branch content if the left value is in the right value.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condIn',
        {
            "category": 'Nox Utils - Conditional Statments',
            "unnamedArgs": [
                {
                    "name": 'left',
                    "type": ['string'],
                    "description": 'The first value to compare.',
                },
                {
                    "name": 'right',
                    "type": ['string'],
                    "description": 'The second value to compare.',
                },
                {
                    "name": 'content',
                    "type": 'string',
                    "description": 'The content branches to return.',
                },
            ],
            "description": 'Return the then branch content if the left value is in the right value.\nOtherwise, return the else branch.',
            "returns": 'The content branch based on the conditional result.',
            "returnType": 'string',
            "displayOverride": '{{condIn::left::right::content}}',
            "exampleUsage": [
                '{{condIn::Hello::Hello World!::The string contains "Hello"!}}',
                '{{condIn::{{randInt::0::10}}::55::The number is 5!}}',
                '{{condIn::.localVar::$globalVar}}The global variable contains the local variable as a substring!{{else}}The local var is not in the global var!{{/condIn}}',
            ],
            "delayArgResolution": true,
            "handler": handlerIn
        }
    );
    cond_batch.push(['condIn', 2]);

    /**
     * Return the then branch content if the left value is not in the right value.
     * Otherwise, return the else branch.
     */
    macros.register(
        'condNin',
        {
            "category": 'Nox Utils - Conditional Statments',
            "unnamedArgs": [
                {
                    "name": 'left',
                    "type": ['string'],
                    "description": 'The first value to compare.',
                },
                {
                    "name": 'right',
                    "type": ['string'],
                    "description": 'The second value to compare.',
                },
                {
                    "name": 'content',
                    "type": 'string',
                    "description": 'The content branches to return.',
                },
            ],
            "description": 'Return the then branch content if the left value is not in the right value.\nOtherwise, return the else branch.',
            "returns": 'The content branch based on the conditional result.',
            "returnType": 'string',
            "displayOverride": '{{condNin::left::right::content}}',
            "exampleUsage": [
                '{{condNin::Hello::Hello World!::The string does not contain "Hello"!}}',
                '{{condNin::{{randInt::0::10}}::55::The number is not 5!}}',
                '{{condNin::.localVar::$globalVar}}The global variable does not contain the local variable as a substring!{{else}}The local var is in the global var!{{/condNin}}',
            ],
            "delayArgResolution": true,
            "handler": handlerNin
        }
    );
    cond_batch.push(['condNin', 2]);

    condData.addMacroBatch(cond_batch);
}
