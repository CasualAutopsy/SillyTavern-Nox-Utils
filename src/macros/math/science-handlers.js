// @ts-check
const argH = NoxLib.MacroHandlers.argHandler

/**
 * @import {} from '../../../global'
 *
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */



/**
 * Power operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerPow({unnamedArgs: [base, exponent]}) {
    return String(Math.pow(
        argH.parseVar(base, "float"),
        argH.parseVar(exponent, "float")
    ));
}

/**
 * Square root operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerSqrt({unnamedArgs: [value]}) {
    return String(Math.sqrt(
        argH.parseVar(value, "float")
    ));
}

/**
 * Cube root operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerCbrt({unnamedArgs: [value]}) {
    return String(Math.cbrt(
        argH.parseVar(value, "float")
    ));
}

/**
 * Absolute value operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerAbs({unnamedArgs: [value]}) {
    return String(Math.abs(
        argH.parseVar(value, "float")
    ));
}

/**
 * Logarithm operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerLog({unnamedArgs: [value]}) {
    return String(Math.log(
        argH.parseVar(value, "float")
    ));
}

/**
 * Cosine operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerCos({unnamedArgs: [value]}) {
    return String(Math.cos(
        argH.parseVar(value, "float")
    ));
}

/**
 * Sine operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerSin({unnamedArgs: [value]}) {
    return String(Math.sin(
        argH.parseVar(value, "float")
    ));
}

/**
 * Tangent operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerTan({unnamedArgs: [value]}) {
    return String(Math.tan(
        argH.parseVar(value, "float")
    ));
}

export {
    handlerPow,
    handlerSqrt, handlerCbrt,
    handlerAbs,
    handlerLog,
    handlerCos, handlerSin, handlerTan
};
