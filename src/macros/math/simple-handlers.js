// @ts-check
const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../global'
 *
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * Addition operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerAdd({list: values}) {
    if (values == null) {
        return '0';
    }

    let num = 0;
    values.forEach((val) => {
        num += argH.parseVar(val, "float");
    });

    return String(num);
}

/**
 * Subtraction operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerSub({list: values}) {
    if (values == null) {
        return '0';
    }

    const subtractee = values.shift();

    if (values.length === 0 || subtractee == null) {
        return String(
            argH.parseVar(
                argH.nullCheck(subtractee, '0'), "float"
            )
        );
    }

    let num = argH.parseVar(subtractee, "float");

    values.forEach((val) => {
        num -= argH.parseVar(val, "float");
    });

    return String(num);
}

/**
 * Multiplication operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerMul({list: values}) {
    if (values == null) {
        return '1';
    }

    let num = 1;

    values.forEach((val) => {
        num *= argH.parseVar(val, "float");
    });

    return String(num);
}

/**
 * Division operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.
 */
function handlerDiv({list: values}) {
    if (values == null) {
        return '0';
    }

    const dividend = values.shift();

    if (values.length === 0 || dividend == null) {
        return String(
            argH.parseVar(
                argH.nullCheck(dividend, '0'), "float"
            )
        );
    }

    let num = argH.parseVar(dividend, "float");

    values.forEach((val) => {
        num /= argH.parseVar(val, "float");
    });

    return String(num);
}

/**
 * Modulus operation handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The stringified resulting number.-
 */
function handlerMod({unnamedArgs: [dividend, divisor], resolve}) {
    return String(
        argH.parseVar(dividend, "float") % argH.parseVar(divisor, "float")
    );
}

export {
    handlerAdd, handlerSub,
    handlerMul, handlerDiv,
    handlerMod
};
