// @ts-check
const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../global'
 *
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */


/**
 * Psudo-integer dtype RNG macro handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} Stringified integer RNG result.
 */
function handlerRNGInt({unnamedArgs: [rawMin, rawMax]}) {
    const
        min = argH.parse(rawMin, "int"),
        max = argH.parse(rawMax, "int");

    return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * Float dtype RNG macro handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} Stringified float RNG result.
 */
function handlerRNGFloat({unnamedArgs: [rawMin, rawMax, rawPrecision, uniform]}) {
    const
        min = argH.parse(rawMin, "float"),
        max = argH.parse(rawMax, "float");

    const precision = argH.parse(rawPrecision, "int");

    if (precision && argH.stBoolCoercion(uniform)) {
        return String((Math.floor(((Math.random() * (max - min + 1)) * Math.pow(10, precision))) / Math.pow(10, precision)) + min);
    } else if (precision) {
        return String((Math.random() * (max - min) + min).toFixed(precision) + min);
    } else {
        return String(Math.random() * (max - min) + min);
    }
}

export { handlerRNGInt, handlerRNGFloat };
