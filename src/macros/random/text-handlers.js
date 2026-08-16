import Chance from 'chance';

const argH = NoxLib.MacroHandlers.argHandler;

const chance = new Chance(Math.random);




/**
 * @import {} from '../../../global'
 *
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */



/**
 * Semi-pronounceable random word handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The randomized word.
 */
function handlerWord({unnamedArgs: [rawN, byLength, rawCapitalize]}) {
    const
        wordCase = argH.stBoolCoercion(rawCapitalize),
        n = rawN == null
            ? undefined
            : argH.parse(rawN, "int");

    if (n == null) {
        return chance.word({capitalize: wordCase});
    } else {
        return argH.stBoolCoercion(byLength)
            ? chance.word({length: n, capitalize: wordCase})
            : chance.word({syllables: n, capitalize: wordCase});
    }
}

/**
 * Semi-pronounceable random sentence handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The randomized sentence.
 */
function handlerSentence({unnamedArgs: [rawN, rawPunctuation]}) {
    const
        punct = rawPunctuation == null
            ? undefined
            : argH.parse(rawPunctuation),
        n = rawN == null
            ? undefined
            : argH.parse(rawN, "int");

    if (n === null) {
        return chance.sentence({punctuation: punct});
    } else {
        return chance.sentence({words: n, punctuation: punct});
    }
}

/**
 * Semi-pronounceable random paragraph handler.
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String} The randomized paragraph.
 */
function handlerParagraph({unnamedArgs: [rawN]}) {
    const n = rawN == null
        ? undefined
        : argH.parse(rawN, "int");

    if (n == null) {
        return chance.paragraph();
    } else {
        return chance.paragraph({sentences: n});
    }
}

export {
    handlerWord, handlerSentence, handlerParagraph
};
