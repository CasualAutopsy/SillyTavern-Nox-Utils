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
function handlerEq({unnamedArgs: [rawStrictTypes, rawLeft, rawRight, rawContent], flags, resolve, trimContent}) {
    const
        left = argH.parseVar(rawLeft),
        right = argH.parseVar(rawRight);

    const { thenBranch, elseBranch } = condData.splitOnTopLevelElse(rawContent);

    let chosenBranch;
    const strictTypes = argH.stBoolCoercion(rawStrictTypes);

    if (strictTypes) {
        chosenBranch = left === right ? thenBranch : elseBranch;
    } else {
        chosenBranch = left == right ? thenBranch : elseBranch;
    }

    if (chosenBranch === undefined) {
        return '';
    }

    return flags.preserveWhitespace
        ? resolve(chosenBranch)
        : trimContent(resolve(chosenBranch));
}

/**
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String}
 */
function handlerNeq({unnamedArgs: [rawStrictTypes, rawLeft, rawRight, rawContent], flags, resolve, trimContent}) {
    const
        left = argH.parseVar(rawLeft),
        right = argH.parseVar(rawRight);

    const { thenBranch, elseBranch } = condData.splitOnTopLevelElse(rawContent);

    let chosenBranch;
    const strictTypes = argH.stBoolCoercion(rawStrictTypes);

    if (strictTypes) {
        chosenBranch = left !== right ? thenBranch : elseBranch;
    } else {
        chosenBranch = left != right ? thenBranch : elseBranch;
    }

    if (chosenBranch === undefined) {
        return '';
    }

    return flags.preserveWhitespace
        ? resolve(chosenBranch)
        : trimContent(resolve(chosenBranch));
}

/**
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String}
 */
function handlerGt({unnamedArgs: [rawLeft, rawRight, rawContent], flags, resolve, trimContent}) {
    const
        left = argH.parseVar(rawLeft, "float"),
        right = argH.parseVar(rawRight, "float");

    const { thenBranch, elseBranch } = condData.splitOnTopLevelElse(rawContent);

    const chosenBranch = left > right ? thenBranch : elseBranch;

    if (chosenBranch === undefined) {
        return '';
    }

    return flags.preserveWhitespace
        ? resolve(chosenBranch)
        : trimContent(resolve(chosenBranch));
}

/**
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String}
 */
function handlerGte({unnamedArgs: [rawLeft, rawRight, rawContent], flags, resolve, trimContent}) {
    const
        left = argH.parseVar(rawLeft, "float"),
        right = argH.parseVar(rawRight, "float");

    const { thenBranch, elseBranch } = condData.splitOnTopLevelElse(rawContent);

    const chosenBranch = left >= right ? thenBranch : elseBranch;

    if (chosenBranch === undefined) {
        return '';
    }

    return flags.preserveWhitespace
        ? resolve(chosenBranch)
        : trimContent(resolve(chosenBranch));
}

/**
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String}
 */
function handlerLt({unnamedArgs: [rawLeft, rawRight, rawContent], flags, resolve, trimContent}) {
    const
        left = argH.parseVar(rawLeft, "float"),
        right = argH.parseVar(rawRight, "float");

    const { thenBranch, elseBranch } = condData.splitOnTopLevelElse(rawContent);

    const chosenBranch = left < right ? thenBranch : elseBranch;

    if (chosenBranch === undefined) {
        return '';
    }

    return flags.preserveWhitespace
        ? resolve(chosenBranch)
        : trimContent(resolve(chosenBranch));

}

/**
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String}
 */
function handlerLte({unnamedArgs: [rawLeft, rawRight, rawContent], flags, resolve, trimContent}) {
    const
        left = argH.parseVar(rawLeft, "float"),
        right = argH.parseVar(rawRight, "float");

    const { thenBranch, elseBranch } = condData.splitOnTopLevelElse(rawContent);

    const chosenBranch = left <= right ? thenBranch : elseBranch;

    if (chosenBranch === undefined) {
        return '';
    }

    return flags.preserveWhitespace
        ? resolve(chosenBranch)
        : trimContent(resolve(chosenBranch));
}

/**
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String}
 */
function handlerIn({unnamedArgs: [rawLeft, rawRight, rawContent], flags, resolve, trimContent}) {
    const
        left = argH.resolve(rawLeft),
        right = argH.resolve(rawRight);

    const { thenBranch, elseBranch } = condData.splitOnTopLevelElse(rawContent);

    const chosenBranch = right.includes(left)
        ? thenBranch
        : elseBranch;

    if (chosenBranch === undefined) {
        return '';
    }

    return flags.preserveWhitespace
        ? resolve(chosenBranch)
        : trimContent(resolve(chosenBranch));
}

/**
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String}
 */
function handlerNin({unnamedArgs: [rawLeft, rawRight, rawContent], flags, resolve, trimContent}) {
    const
        left = argH.resolve(rawLeft),
        right = argH.resolve(rawRight);

    const { thenBranch, elseBranch } = condData.splitOnTopLevelElse(rawContent);

    const chosenBranch = !right.includes(left)
        ? thenBranch
        : elseBranch;

    if (chosenBranch === undefined) {
        return '';
    }

    return flags.preserveWhitespace
        ? resolve(chosenBranch)
        : trimContent(resolve(chosenBranch));
}

export {
    handlerEq, handlerNeq,
    handlerGt, handlerGte,
    handlerLt, handlerLte,
    handlerIn, handlerNin
};
