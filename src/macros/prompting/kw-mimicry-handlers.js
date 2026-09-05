const { escapeRegExp } = SillyTavern.libs.lodash;

const { toRegExp } = NoxLib.StringOps.regexMethods;

const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../global'
 */

/**
 * @typedef {import('../../../../../../macros/engine/MacroRegistry.js').MacroExecutionContext} MacroExecutionContext
 */

/**
 *
 * @param {MacroExecutionContext} param0
 */
function handlerKWMimic({unnamedArgs: [scanContent, rawWholeWords, rawPrefix, rawSuffix], list: rawList}) {
    const whole_words = rawWholeWords
        ? argH.stBoolCoercion(rawWholeWords)
        : true;

    const prefix = argH.resolve(rawPrefix),
        suffix = argH.resolve(rawSuffix);

    const list = argH.nullCheck(rawList);

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

/**
 *
 * @param {MacroExecutionContext} param0
 */
function handlerKWMultiMimic({unnamedArgs: [scanContent, rawWholeWords, rawPrefix, rawSuffix, rawSeparator], list: rawList}) {
    const whole_words = rawWholeWords
        ? argH.stBoolCoercion(rawWholeWords)
        : true;

    const prefix = argH.resolve(rawPrefix),
        suffix = argH.resolve(rawSuffix);

    const separator = argH.resolve(rawSeparator);

    const list = argH.nullCheck(rawList);

    /** @type {string[]} */
    let mimic_list = [];
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

                mimic_list.push(prefix + scan_match[0] + suffix);
            }
        } else {
            if (scanContent.indexOf(kw) !== -1 ) {

                mimic_list.push(prefix + kw + suffix);
            }
        }
    }

    return mimic_list.join(separator);
}

export { handlerKWMimic, handlerKWMultiMimic };
