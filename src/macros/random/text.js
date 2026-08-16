import { handlerWord, handlerSentence, handlerParagraph } from './text-handlers.js';

const { macros } = SillyTavern.getContext();

/**
 * @import {} from '../../../global'
 */

/**
 * Initialize the random text macros.
 */
export async function initRandText() {
    /**********************************************
     * === randWord ===                           *
     * Generate a semi-pronounceable random word. *
     **********************************************/
    macros.register(
        'randWord',
        {
            "category": 'Nox Utils - Randomization',
            "unnamedArgs": [
                {
                    "name": 'n',
                    "type": ['integer', 'string'],
                    "sampleValue": '1, 3',
                    "optional": true,
                    "description": 'The number of syllables to generate the word with. (default: 1-3 syllables)',
                },
                {
                    "name": 'byLength',
                    "type": ['boolean', 'integer', 'string'],
                    "sampleValue": 'true, off, 1',
                    "optional": true,
                    "description": 'Whether to generate a word by character length instead of syllables.',
                },
                {
                    "name": 'capitalize',
                    "type": ['boolean', 'integer', 'string'],
                    "sampleValue": 'true, off, 1',
                    "optional": true,
                },
            ],
            "description": 'Generate a semi-pronounceable random word.',
            "returns": 'The randomly generated word.',
            "returnType": 'string',
            "displayOverride": '{{randWord::n::byLength::capitalize}}',
            "exampleUsage": [
                '{{randWord}}',
                '{{randWord::5}}',
                '{{randWord::5::true}}',
                '{{randWord::5::off::on}}',
            ],
            "handler": handlerWord
        }
    );

    /**************************************************
     * === randSentence ===                           *
     * Generate a semi-pronounceable random sentence. *
     **************************************************/
    macros.register(
        'randSentence',
        {
            "category": 'Nox Utils - Randomization',
            "unnamedArgs": [
                {
                    "name": 'n',
                    "type": ['integer', 'string'],
                    "sampleValue": '1, 3',
                    "optional": true,
                    "description": 'The number of words to generate the sentence with. (default: 12-18 words)',
                },
                {
                    "name": 'punctuation',
                    "type": ['string'],
                    "sampleValue": '.',
                    "optional": true,
                    "description": 'The punctuation to end the sentence with. (default: .)',
                },
            ],
            "description": 'Generate a semi-pronounceable random sentence.',
            "returns": 'The randomly generated sentence.',
            "returnType": 'string',
            "displayOverride": '{{randSentence::n::punctuation}}',
            "exampleUsage": [
                '{{randSentence}}',
                '{{randSentence::5}}',
                '{{randSentence::5::?}}',
            ],
            "handler": handlerSentence
        }
    );

    /* *************************************************
     * === randParagraph ===                           *
     * Generate a semi-pronounceable random paragraph. *
     ***************************************************/
    macros.register(
        'randParagraph',
        {
            "category": 'Nox Utils - Randomization',
            "unnamedArgs": [
                {
                    "name": 'n',
                    "type": ['integer', 'string'],
                    "sampleValue": '1, 3',
                    "optional": true,
                    "description": 'The number of sentences to generate the paragraph with. (default: 3-7 sentences)',
                },
            ],
            "description": 'Generate a semi-pronounceable random paragraph.',
            "returns": 'The randomly generated paragraph.',
            "returnType": 'string',
            "displayOverride": '{{randParagraph::n}}',
            "exampleUsage": [
                '{{randParagraph}}',
                '{{randParagraph::5}}',
            ],
            "handler": handlerParagraph
        }
    );
}
