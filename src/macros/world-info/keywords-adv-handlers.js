// @ts-check
const { escapeRegExp } = SillyTavern.libs.lodash;

const { toRegExp } = NoxLib.StringOps.regexMethods;

const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../global'
 *
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 *
 * @param {MacroExecutionContext} param0
 */
function handlerKWFocuser({unnamedArgs: [scanContent, rawWholeWords, rawPrefix, rawSuffix], list: rawList}) {
    const whole_words = rawWholeWords
        ? argH.stBoolCoercion(rawWholeWords)
        : true;

    const prefix = argH.resolve(rawPrefix),
        suffix = argH.resolve(rawSuffix);

    let list = argH.nullCheck(rawList);

    for (let kw of list) {
        let /** @type {RegExp|undefined} */ re_kw,
            /** @type {Boolean} */ isRegExp = kw.match(/^\/(.+)\/([a-z]*)$/) !== null;

        if (whole_words && !isRegExp) {
            re_kw = new RegExp('\\b' + escapeRegExp(kw) + '\\b');

            isRegExp = true;
        }

        if (isRegExp) {
            if (re_kw instanceof RegExp == false) re_kw = toRegExp(kw);

            if (re_kw.test(scanContent)) {
                const scan_match = scanContent.match(re_kw) ?? [''];

                return prefix + scan_match[0] + suffix;
            }
        } else {
            if (scanContent.indexOf(kw) !== -1 ) {

                return prefix + kw + suffix;
            }
        }
    }

    return '';
}

export { handlerKWFocuser };
