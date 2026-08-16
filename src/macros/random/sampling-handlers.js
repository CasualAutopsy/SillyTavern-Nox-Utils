// @ts-check
const { sampleSize } = SillyTavern.libs.lodash;

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
function handlerListSampling({unnamedArgs: [nRaw, sepRaw, lastSepRaw], list: listRaw}) {
    listRaw = argH.nullCheck(listRaw);

    let n = argH.parse(nRaw, "float");

    if (n < 1.0) {
        n = Math.round((listRaw.length * n));

        if (n === 0) n = 1;
    }
    else if (n > listRaw.length) {
        n = listRaw.length;
    }


    const
        sep = argH.resolve(sepRaw),
        lastSep = argH.resolve(lastSepRaw);

    const sampled_list = sampleSize(listRaw, n);


    if (lastSep) {
        return sampled_list.slice(0, -2).join(sep) + sep + sampled_list.slice(-2).join(lastSep);
    }
    else {
        return sampled_list.join(sep);
    }
}

/**
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String}
 */
function handlerDropOutSampling({unnamedArgs: [sepRaw, lastSepRaw], list: listRaw}) {
    argH.nullCheck(listRaw);


    let
        /** @type {String[][]} */   list_groups,
        /** @type {Number[]} */     dropout_list;

    /** @type {[text: String, dropout: Number][]} */
    let list;


    list_groups = argH.splitList(listRaw, 2);
    dropout_list = argH.listParse(list_groups[1], "float");

    list = argH.zipList(list_groups[0], dropout_list);


    const
        sep = argH.resolve(sepRaw),
        lastSep = argH.resolve(lastSepRaw);

    const sampled_list = list.map(([text, dropout]) => {
        if (Math.random() < dropout) {
            return '';
        }
        else {
            return text;
        }
    }).filter((text) => text !== '');


    if (lastSep && sampled_list.length > 2) {
        return sampled_list.slice(0, -2).join(sep) + sep + sampled_list.slice(-2).join(lastSep);
    }
    else {
        return sampled_list.join(sep);
    }
}

export { handlerListSampling, handlerDropOutSampling };
