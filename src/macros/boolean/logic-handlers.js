// @ts-check
const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * AND logic gate macro handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} Stringified logic gate result.
 */
function handlerAND({unnamedArgs: [rawStrictTypes], list: values}) {
    const strict = argH.stBoolCoercion(rawStrictTypes);

    values = argH.nullCheck(values);
    for (const value of values) {
        if (strict) {
            if (!argH.parseVar(value, "bool")) {
                return 'false';
            }
        }

        else {
            if (!argH.stBoolVar(value)) {
                return 'false';
            }
        }
    }

    return 'true';
}

/**
 * OR logic gate macro handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} Stringified logic gate result.
 */
function handlerOR({unnamedArgs: [rawStrictTypes], list: values}) {
    const strict = argH.stBoolCoercion(rawStrictTypes);

    values = argH.nullCheck(values);
    for (const value of values) {
        if (strict) {
            if (argH.parseVar(value, "bool")) {
                return 'true';
            }
        }

        else {
            if (argH.stBoolVar(value)) {
                return 'true';
            }
        }
    }

    return 'false';
}

/**
 * NOT logic gate macro handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} Stringified logic gate result.
 */
function handlerNOT({unnamedArgs: [rawStrictTypes, value]}) {
    const strict = argH.stBoolCoercion(rawStrictTypes);

    if (strict) {
        return String(!argH.parseVar(value, "bool"));
    }

    else {
        return String(!argH.stBoolVar(value));
    }
}

/**
 * NAND logic gate macro handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} Stringified logic gate result.
 */
function handlerNAND({unnamedArgs: [rawStrictTypes], list: values}) {
    const strict = argH.stBoolCoercion(rawStrictTypes);

    values = argH.nullCheck(values);
    for (const value of values) {
        if (strict) {
            if (!argH.parseVar(value, "bool")) {
                return 'true';
            }
        }

        else {
            if (!argH.stBoolVar(value)) {
                return 'true';
            }
        }
    }

    return 'false';
}

/**
 * NOR logic gate macro handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} - Stringified logic gate result.
 */
function handlerNOR({unnamedArgs: [rawStrictTypes], list: values}) {
    const strict = argH.stBoolCoercion(rawStrictTypes);

    values = argH.nullCheck(values);
    for (const value of values) {
        if (strict) {
            if (argH.parseVar(value, "bool")) {
                return 'false';
            }
        }

        else {
            if (argH.stBoolVar(value)) {
                return 'false';
            }
        }
    }

    return 'true';
}

/**
 * XOR logic gate macro handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} Stringifies logic gate result.
 */
function handlerXOR({unnamedArgs: [rawStrictTypes, value1, value2]}) {
    const strict = argH.stBoolCoercion(rawStrictTypes);

    if (strict) {
        if (argH.parseVar(value1, "bool")) {
            return String(argH.parseVar(value2, "bool"));
        }
        else {
            return String(argH.parseVar(value2, "bool"));
        }
    }

    else {
        if (argH.stBoolVar(value1)) {
            return String(argH.stBoolVar(value2));
        }
        else {
            return String(argH.stBoolVar(value2));
        }
    }
}

/**
 * XNOR logic gate macro handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} Stringified logic gate result.
 */
function handlerXNOR({unnamedArgs: [rawStrictTypes], list: values}) {
    values = argH.nullCheck(values);
    let first_val = values.shift();

    first_val = argH.nullCheck(first_val);

    const
        strict = argH.stBoolCoercion(rawStrictTypes),
        firstValBool = strict
            ? argH.parseVar(first_val, "bool")
            : argH.stBoolVar(first_val);

    for (const value of values) {
        if (strict) {
            if (argH.parseVar(value, "bool") !== firstValBool) {
                return 'false';
            }
        }
        else {
            if (argH.stBoolVar(value) !== firstValBool) {
                return 'false';
            }
        }
    }

    return 'true';
}

export {
    handlerAND, handlerOR,
    handlerNOT,
    handlerNAND, handlerNOR,
    handlerXOR, handlerXNOR
};
