// @ts-check
const condData = NoxLib.MacroHandlers.ConditionalHandlers.GlobalConditionalData;
const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../global'
 *
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String}
 */
function handerOrStacks({unnamedArgs: [rawStrictTypes, separator], list, resolve}) {
    const strict_types = argH.stBoolCoercion(rawStrictTypes);

    separator = resolve(separator);

    let stacked_content;
}
