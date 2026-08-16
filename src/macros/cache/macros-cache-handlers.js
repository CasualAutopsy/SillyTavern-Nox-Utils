// @ts-check
const { variables } = SillyTavern.getContext();

const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../global'
 *
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 *
 * @typedef {[stick: Boolean, count_down: Number, content: String]} ResolveCacheStore
 */

/**
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String}
 */
function handlerResolveCache({unnamedArgs: [keyRaw, timerRaw, content], isScoped, flags, resolve, trimContent}) {
    if (keyRaw === '' || timerRaw === '') {
        console.error('[Nox-Utils]|[Macro: resolveCache] The cache key and timer cannot be empty.');

        return '';
    } else if (!isScoped) {
        console.warn('[Nox-Utils]|[Macro: resolveCache] The macro is not scoped. This is unrecommended as it will have worse performance.');
    }

    const
        key = `resolveCache_${trimContent(keyRaw)}`,
        timer = argH.parse(trimContent(resolve(timerRaw)), "int");

    /** @type {ResolveCacheStore|undefined} */
    let cache_store;

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
}

export { handlerResolveCache };
