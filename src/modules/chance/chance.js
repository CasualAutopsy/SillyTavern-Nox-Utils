/**
 * @import {} from '../../../global'
 */

const MAX_INT = Number.MAX_SAFE_INTEGER;
const MIN_INT = Number.MIN_SAFE_INTEGER;
const NUMBERS = '0123456789';
const CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const CHARS_UPPER = CHARS_LOWER.toUpperCase();
const HEX_POOL = NUMBERS + "abcdef";

export class Chance {
    constructor(rng) {
        if (typeof rng === 'function') {
            this.random = rng
            return this;
        }

        this.random = Math.random;
    }

    initOptions(options, defaults) {
        options = options || {};

        if (defaults) {
            for (let i in defaults) {
                if (typeof options[i] === 'undefined') {
                    options[i] = defaults[i];
                }
            }
        }

        return options;
    }

    testRange(test, errMsg) {
        if (test) {
            toastr.error(errMsg);
            throw new RangeError(errMsg);
        }
    }

    /**
     *
     * @param {Function} fn
     * @param {Number} n
     * @returns
     */
    n(fn, n) {
        testRange(
            typeof fn !== "function",
            "[Nox-Utils]: The first argument must be a function."
        );

        if (typeof n === 'undefined') {
            n = 1;
        }

        let i = n,
            arr = [];

        const params = slice.call(arguments, 2);

        i = Math.max( 0, i );

        for (null; i--; null) {
            arr.push(fn.apply(this, params));
        }

        return arr;
    }



    /**
     * @typedef {Object} IntegerOpt
     * @property {Number} min
     * @property {Number} max
     */

    /**
     *
     * @param {IntegerOpt} opt
     */
    randInteger(opt) {
        opt = this.initOptions(opt, {min: MIN_INT, max: MAX_INT});
        this.testRange(opt.min > opt.max, "[Nox-Utils]: Min cannot be greater than max.");

        return Math.floor(this.random() * (opt.max - opt.min + 1) + opt.min);
    }

    /**
     * @typedef {Object} NaturalOpt
     * @property {Number} min
     * @property {Number} max
     * @property {Number} numerals
     * @property {Number[]} exclude
     */

    /**
     *
     * @param {NaturalOpt} opt
     * @returns
     */
    randNatural(opt) {
        opt = initOptions(opt, {min: 0, max: MAX_INT});

        testRange(opt.min < 0, "[Nox-Utils]: Min cannot be less than zero.");

        if (typeof opt.numerals === 'number'){
          testRange(opt.numerals < 1, "[Nox-Utils]: Numerals cannot be less than one.");

          opt.min = Math.pow(10, opt.numerals - 1);
          opt.max = Math.pow(10, opt.numerals) - 1;
        }

        if (opt.exclude) {
            testRange(!Array.isArray(opt.exclude), "[Nox-Utils]: exclude must be an array.");

            for (let exclusionIndex in opt.exclude) {
                testRange(!Number.isInteger(opt.exclude[exclusionIndex]), "[Nox-Utils]: exclude must be numbers.");
            }

            let random = opt.min + this.randNatural({max: opt.max - opt.min - opt.exclude.length});
            const sortedExclusions = opt.exclude.sort((a, b) => a - b);
            for (var sortedExclusionIndex in sortedExclusions) {
                if (random < sortedExclusions[sortedExclusionIndex]) {
                    break;
                }

                random++;
            }

            return random;
        }

        return this.randInteger(opt);
    }

    /**
     * @typedef {Object} CharOpt
     * @property {"lower"|"upper"} casing
     * @property {string} pool
     * @property {Boolean} alpha
     * @property {Boolean} numeric
     * @property {Boolean} symbols
     */

    /**
     *
     * @param {CharOpt} opt
     * @returns
     */
    randChar(opt) {
        opt = initOptions(opt);

        const symbols = "!@#$%^&*()[]";
        let letters, pool;

        if (opt.casing === 'lower') {
            letters = CHARS_LOWER;
        } else if (opt.casing === 'upper') {
            letters = CHARS_UPPER;
        } else {
            letters = CHARS_LOWER + CHARS_UPPER;
        }

        if (opt.pool) {
            pool = opt.pool;
        } else {
            pool = '';
            if (opt.alpha) {
                pool += letters;
            }
            if (opt.numeric) {
                pool += NUMBERS;
            }
            if (opt.symbols) {
                pool += symbols;
            }
            if (!pool) {
                pool = letters + NUMBERS + symbols;
            }
        }

        return pool.charAt(
            this.randNatural({
                max: (pool.length - 1)
            })
        );
    }
}

export class WordChance extends Chance {
    constructor(rng) {
        super(rng);
    }

    capitalize(word) {
        return word.charAt(0).toUpperCase() + word.substr(1);
    }

    /**
     * @typedef {Object} SyllableOpt
     * @property {Number} length
     * @property {Boolean} capitalize
     */

    /**
     *
     * @param {SyllableOpt} opt
     * @returns
     */
    randSyllable(opt) {
        opt = initOptions(opt);

        const length = opt.length || this.randNatural({min: 2, max: 3}),
            consonants = 'bcdfghjklmnprstvwz', // consonants except hard to speak ones
            vowels = 'aeiou',
            all = consonants + vowels;

        let text = '',
            chr;

        // I'm sure there's a more elegant way to do this, but this works
        // decently well.
        for (var i = 0; i < length; i++) {
            if (i === 0) {
                // First character can be anything
                chr = this.randChar({pool: all});
            } else if (consonants.indexOf(chr) === -1) {
                // Last character was a vowel, now we want a consonant
                chr = this.randChar({pool: consonants});
            } else {
                // Last character was a consonant, now we want a vowel
                chr = this.randChar({pool: vowels});
            }

            text += chr;
        }

        if (opt.capitalize) {
            text = this.capitalize(text);
        }

        return text;
    }

    /**
     * @typedef {Object} WordOpt
     * @property {Number} syllables
     * @property {Number} length
     * @property {Boolean} capitalize
     */

    /**
     *
     * @param {WordOpt} opt
     */
    randWord(opt) {
        opt = initOptions(opt);

        testRange(
            opt.syllables && opt.length,
            "[Nox-Utils]: Cannot specify both syllables AND length."
        );

        const syllables = opt.syllables || this.randNatural({min: 1, max: 3});

        let text = '';
        if (opt.length) {
            do {
                text += this.randSyllable();
            } while (text.length < opt.length);

            text = text.substring(0, opt.length);
        } else {
            for (let i = 0; i < syllables; i++) {
                text += this.randSyllable();
            }
        }

        if (opt.capitalize) {
            text = this.capitalize(text);
        }

        return text;
    }

    /**
     * @typedef {Object} SentenceOpt
     * @property {Number} words
     * @property {string} punctuation
     */

    /**
     *
     * @param {SentenceOpt} opt
     * @returns
     */
    randSentence(opt) {
        opt = initOptions(opt);

        const words = opt.words || this.randNatural({min: 12, max: 18}),
            punctuation = opt.punctuation,
            word_array = this.n(this.word, words);

        let text = '';

        text = word_array.join(' ');

        // Capitalize first letter of sentence
        text = this.capitalize(text);

        // Make sure punctuation has a usable value
        if (punctuation !== false && !/^[.?;!:]$/.test(punctuation)) {
            punctuation = '.';
        }

        // Add punctuation mark
        if (punctuation) {
            text += punctuation;
        }

        return text;
    }

    /**
     * @typedef {Object} ParagraphOpt
     * @property {Number} sentences
     * @property {Boolean} linebreak
     */

    /**
     *
     * @param {ParagraphOpt} opt
     * @returns
     */
    randParagraph(opt) {
        opt = initOptions(opt);

        const sentences = opt.sentences || this.randNatural({min: 3, max: 7}),
            sentence_array = this.n(this.randSentence, sentences),
            separator = opt.linebreak === true ? '\n' : ' ';

        return sentence_array.join(separator);
    }
}
