const { shorthandLaxBoolResolver, shorthandStrictBoolResolver } = NoxLib.MacroCoercionAndShorthand.VarShorthand;

/**
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 *
 * @param {MacroExecutionContext} param0
 * @returns {String}
 */
function handlerAND({unnamedArgs: [rawStrictTypes], list: values, resolve}) {
    const strict = shorthandLaxBoolResolver(rawStrictTypes, resolve);

    if (values == null) {
        return 'false';
    }

    for (const value of values) {
        if (strict) {
            if (!shorthandStrictBoolResolver(value, resolve)) {
                return 'false';
            }
        }

        else {
            if (!shorthandLaxBoolResolver(value, resolve)) {
                return 'false';
            }
        }
    }

    return 'true';
}

/**
 *
 * @param {MacroExecutionContext} param0
 * @returns {String}
 */
function handlerOR({unnamedArgs: [rawStrictTypes], list: values, resolve}) {
    const strict = shorthandLaxBoolResolver(rawStrictTypes, resolve);

    if (values == null) {
        return 'false';
    }

    for (const value of values) {
        if (strict) {
            if (shorthandStrictBoolResolver(value, resolve)) {
                return 'true';
            }
        }

        else {
            if (shorthandLaxBoolResolver(value, resolve)) {
                return 'true';
            }
        }
    }

    return 'false';
}

/**
 *
 * @param {MacroExecutionContext} param0
 * @returns {String}
 */
function handlerNOT({unnamedArgs: [rawStrictTypes, value], resolve}) {
    const strict = shorthandLaxBoolResolver(rawStrictTypes, resolve);

    if (strict) {
        return String(!shorthandStrictBoolResolver(value, resolve));
    }

    else {
        return String(!shorthandLaxBoolResolver(value, resolve));
    }
}

/**
 *
 * @param {MacroExecutionContext} param0
 * @returns {String}
 */
function handlerNAND({unnamedArgs: [rawStrictTypes], list: values, resolve}) {
    const strict = shorthandLaxBoolResolver(rawStrictTypes, resolve);

    if (values == null) {
        return 'false';
    }

    for (const value of values) {
        if (strict) {
            if (!shorthandStrictBoolResolver(value, resolve)) {
                return 'true';
            }
        }

        else {
            if (!shorthandLaxBoolResolver(value, resolve)) {
                return 'true';
            }
        }
    }

    return 'false';
}

/**
 *
 * @param {MacroExecutionContext} param0
 * @returns {String}
 */
function handlerNOR({unnamedArgs: [rawStrictTypes], list: values, resolve}) {
    const strict = shorthandLaxBoolResolver(rawStrictTypes, resolve);

    if (values == null) {
        return 'false';
    }

    for (const value of values) {
        if (strict) {
            if (shorthandStrictBoolResolver(value, resolve)) {
                return 'false';
            }
        }

        else {
            if (shorthandLaxBoolResolver(value, resolve)) {
                return 'false';
            }
        }
    }

    return 'true';
}

/**
 *
 * @param {MacroExecutionContext} param0
 * @returns {String}
 */
function handlerXOR({unnamedArgs: [rawStrictTypes, value1, value2], resolve}) {
    const strict = shorthandLaxBoolResolver(rawStrictTypes, resolve);

    if (strict) {
        if (shorthandStrictBoolResolver(value1, resolve)) {
            return String(shorthandStrictBoolResolver(value2, resolve));
        }
        else {
            return String(shorthandStrictBoolResolver(value2, resolve));
        }
    }

    else {
        if (shorthandLaxBoolResolver(value1, resolve)) {
            return String(shorthandLaxBoolResolver(value2, resolve));
        }
        else {
            return String(shorthandLaxBoolResolver(value2, resolve));
        }
    }
}

/**
 *
 * @param {MacroExecutionContext} param0
 * @returns {String}
 */
function handlerXNOR({unnamedArgs: [rawStrictTypes], list: values, resolve}) {
    if (values == null) {
        return 'false';
    }

    const firstVal = values.shift();

    if (firstVal == null) {
        return 'false';
    }

    const
        strict = shorthandLaxBoolResolver(rawStrictTypes, resolve),

        firstValBool = strict
            ? shorthandStrictBoolResolver(firstVal, resolve)
            : shorthandLaxBoolResolver(firstVal, resolve);

    for (const value of values) {
        if (strict) {
            if (shorthandStrictBoolResolver(value, resolve) !== firstValBool) {
                return 'false';
            }
        }
        else {
            if (shorthandLaxBoolResolver(value, resolve) !== firstValBool) {
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
}
