// @ts-check
const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../global'
 *
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * Maximum statistical operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerMax({list: values}) {
    if (values == null) {
        return 'NaN';
    }

    return String(Math.max(...argH.listParseVar(values, "float")));
}

/**
 * Minimum statistical operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerMin({list: values}) {
    if (values == null) {
        return 'NaN';
    }

    return String(Math.min(...argH.listParseVar(values, "float")));
}

export {
    handlerMax, handlerMin
};
