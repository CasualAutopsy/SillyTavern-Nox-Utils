const { macros, variables } = SillyTavern.getContext();

const { intParse } = NoxLib.MacroCoercionAndShorthand.ValCoercion

/**
 * @typedef {[stick: Boolean, count_down: Number, content: String]} ResolveCacheStore
 */

export async function initKVCacheMacros() {
    macros.register(
        'resolveCache',
        {
            "category": 'Nox Utils - KV Cache Helpers',
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
            "handler": ({unnamedArgs: [keyRaw, timerRaw, content], isScoped, flags, resolve, trimContent}) => {
                if (keyRaw === '' || timerRaw === '') {
                    console.error('[Nox-Utils]|[Macro: resolveCache] The cache key and timer cannot be empty.');

                    return '';
                } else if (!isScoped) {
                    console.warn('[Nox-Utils]|[Macro: resolveCache] The macro is not scoped. This is unrecommended as it will have worse performance.');
                }

                const
                    key = `resolveCache_${trimContent(keyRaw)}`,
                    timer = intParse(trimContent(resolve(timerRaw)));

                /** @type {ResolveCacheStore|null|undefined} */
                let cache_store = null;

                /** @type {Boolean} */
                let should_resolve;

                /** @type {String} */
                let resolved_content = '';

                try {
                    cache_store = JSON.parse(variables.local.get(key));
                } catch {
                    // Cache does not exist. Continue with macro processing without the cache.
                }

                if (cache_store == null) {
                    should_resolve = true;
                } else if (timer === 0 && (cache_store[1] !== timer && cache_store[0] !== true)) {
                    should_resolve = true;
                } else {
                    should_resolve = false;
                }

                if (should_resolve && cache_store == null) {
                    resolved_content = flags.preserveWhitespace
                        ? resolve(content)
                        : trimContent(resolve(content));

                    variables.local.set(key, JSON.stringify([false, timer, resolved_content]));
                } else if (should_resolve) {
                    resolved_content = flags.preserveWhitespace
                        ? resolve(content)
                        : trimContent(resolve(content));

                    variables.local.set(key, JSON.stringify([true, timer, resolved_content]));
                } else if (cache_store != null) {
                    resolved_content = cache_store[2];
                    variables.local.set(key, JSON.stringify([false, timer, resolved_content]));
                }

                return resolved_content;
            },
        }
    );
}
