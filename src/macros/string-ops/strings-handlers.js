// @ts-check
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
function handlerRepeat({unnamedArgs: [resolveAfter, nRepeat, seperator, textContent], flags: {preserveWhitespace}, trimContent, resolve}) {
    const
        doAfter = argH.stBoolCoercion(resolveAfter),
        doN = argH.parse(nRepeat, "int");

    if (doN === 1) {
        return preserveWhitespace
            ? resolve(textContent)
            : trimContent(resolve(textContent));
    }
    else if (doN <= 0) {
        return '';
    }

    let text;
    if (doAfter) {
        text = argH.resolve(textContent);
        text += (seperator + argH.resolve(textContent)).repeat(doN-1);
        text = resolve(text);
    }

    else {
        seperator = resolve(seperator);
        text = resolve(argH.resolve(textContent));
        text += (seperator + text).repeat(doN-1);
    }

    return preserveWhitespace
        ? text
        : trimContent(text);
}

export { handlerRepeat };
