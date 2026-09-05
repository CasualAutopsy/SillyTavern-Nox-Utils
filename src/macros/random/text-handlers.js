import { WordChance } from '../../modules/chance/chance.js';

const argH = NoxLib.MacroHandlers.argHandler;

const chance = new WordChance(Math.random);




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
        return chance.randWord({capitalize: wordCase});
    } else {
        return argH.stBoolCoercion(byLength)
            ? chance.randWord({length: n, capitalize: wordCase})
            : chance.randWord({syllables: n, capitalize: wordCase});
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
        return chance.randSentence({punctuation: punct});
    } else {
        return chance.randSentence({words: n, punctuation: punct});
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
        return chance.randParagraph();
    } else {
        return chance.randParagraph({sentences: n});
    }
}

export {
    handlerWord, handlerSentence, handlerParagraph
};
