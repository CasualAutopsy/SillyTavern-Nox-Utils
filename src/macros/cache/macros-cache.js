import { handlerResolveCache } from './macros-cache-handlers.js';

const { macros, variables } = SillyTavern.getContext();

/**
 * @import {} from '../../../global'
 */

export async function initMacrosCache() {
    macros.register(
        'resolveCache',
        {
            "category": 'Nox Utils - Caching',
            "unnamedArgs" : [
                {
                    "name": 'cache_key',
                    "type": ['string'],
                    "description": "The key to store the resolve cache under.",
                    "sampleValue": 'promptCache, rngStore',
                },
                {
                    "name": 'cache_timer',
                    "type": ['integer', 'string'],
                    "description": 'The timer until the cache is reset.',
                    "sampleValue": '{{mod::{{if::{{lastMessageId}}::{{lastMessageId}}{{else}}0}}::5}}',
                },
                {
                    "name": 'content',
                    "type": ['string'],
                },
            ],
            "delayArgResolution": true,
            "description": 'Cache nested macro resolve results and output the cache results instead. Once the cahce timer reaches 0, the cache will be overwritten.',
            "returns": 'The cached result or the resolved result if the cache doesn\t exist or the timer hits 0.',
            "returnType": 'string',
            "handler": handlerResolveCache
        }
    );
}
