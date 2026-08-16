// @ts-check
const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * Falsy check macro handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} Stringified check result.
 */
function handlerIsFalsy({unnamedArgs: [val]}) {
    return String(!argH.stBoolVar(val));
}

/**
 * Truthy check macro handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} Stringified check result.
 */
function handlerIsTruthy({unnamedArgs: [val]}) {
    return String(argH.stBoolVar(val));
}

export {handlerIsFalsy, handlerIsTruthy};
