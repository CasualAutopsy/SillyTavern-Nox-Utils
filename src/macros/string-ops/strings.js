import { handlerRepeat } from './strings-handlers.js';

const { macros } = SillyTavern.getContext();

/**
 * @import {} from '../../../global'
 */

export async function initStringOps() {
    macros.register(
        'repeat',
        {
            "category": 'Nox Utils - Repitition',
            "unnamedArgs": [
                {
                    "name": 'resolve-after',
                    "optional": false,
                    "description": 'Whether to resolve nested macros after repeating text content.',
                },
                {
                    "name": 'n',
                    "optional": false,
                    "description": 'Number of times the text content should be repeated.',
                },
                {
                    "name": 'seperator',
                    "optional": false,
                    "description": 'Text to inject between each repeat.'
                },
                {
                    "name": 'content',
                    "optional": false,
                    "description": 'The text content to be repeated.'
                }
            ],
            "description": 'Repeat the given text content N number of times.',
            "returns": 'The repeated text content.',
            "delayArgResolution": true,
            handler: handlerRepeat
        }
    );
}
