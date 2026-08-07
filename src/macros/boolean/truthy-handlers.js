const { shorthandLaxBoolResolver } = NoxLib.MacroCoercionAndShorthand.VarShorthand;

/**
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 *
 * @param {MacroExecutionContext} param0
 * @returns {String}
 */
function handlerIsFalsy({unnamedArgs: [valRaw], resolve}) {
    return String(!shorthandLaxBoolResolver(valRaw, resolve));
}

/**
 *
 * @param {MacroExecutionContext} param0
 * @returns {String}
 */
function handlerIsTruthy({unnamedArgs: [valRaw], resolve}) {
    return String(shorthandLaxBoolResolver(valRaw, resolve));
}

export {handlerIsFalsy, handlerIsTruthy};
