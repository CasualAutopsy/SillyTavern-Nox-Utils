import { handlerKWMimic, handlerKWMultiMimic } from './kw-mimicry-handlers.js';

const { macros } = SillyTavern.getContext();

/**
 * @import {} from '../../../global'
 */

export async function initKWMimicry() {
    macros.register(
        'kwMimicry',
        {
            category: 'Nox Utils - Adv. Prompting',
            unnamedArgs: [
                {
                    name: 'scan_content',
                    description: 'The content to scan for keywords to mimic.',
                    sampleValue: 'Hello World!, {{lastMessage}}',
                    optional: false,
                },
                {
                    name: 'whole_words',
                    description: 'Match only if the keyword will match the entirety of a word, instead of part of a word.',
                    sampleValue: 'true, 0, off',
                    defaultValue: 'true',
                    optional: false,
                },
                {
                    name: 'prefix',
                    description: 'Text to prefix the matched keyword with.',
                    sampleValue: '-{{space}}, [match:{{space}}',
                    optional: false,
                },
                {
                    name: 'suffix',
                    description: 'Text to suffix the matched keyword with.',
                    sampleValue: '{{newline}}, ]',
                    optional: false,
                },
            ],
            list: {
                min: 1,
            },
            description: 'Mimic the first keyword match from the provided text for scanning.',
            displayOverride: '{{kwMimicry::scan_content::whole_words::prefix::suffix::kw1::kw2::...}}',
            returns:'The mimicked matched text.',
            handler: handlerKWMimic,
        }
    );

    macros.register(
        'kwMultiMimicry',
        {
            category: 'Nox Utils - Adv. Prompting',
            unnamedArgs: [
                {
                    name: 'scan_content',
                    description: 'The content to scan for keywords to mimic.',
                    sampleValue: 'Hello World!, {{lastMessage}}',
                    optional: false,
                },
                {
                    name: 'whole_words',
                    description: 'Match only if the keyword will match the entirety of a word, instead of part of a word.',
                    sampleValue: 'true, 0, off',
                    defaultValue: 'true',
                    optional: false,
                },
                {
                    name: 'prefix',
                    description: 'Text to prefix the matched keyword with.',
                    sampleValue: '-{{space}}, [match:{{space}}',
                    optional: false,
                },
                {
                    name: 'suffix',
                    description: 'Text to suffix the matched keyword with.',
                    sampleValue: '{{newline}}, ]',
                    optional: false,
                },
                {
                    name: 'separator',
                    description: 'Text to separate the matches with.',
                    sampleValue: '{{newline}}, |, -',
                    optional: false,
                },
            ],
            list: {
                min: 2,
            },
            description: 'Mimic multiple keyword matches from the provided text for scanning.',
            displayOverride: '{{kwMultiMimicry::scan_content::whole_words::prefix::suffix::separator::kw1::kw2::...}}',
            returns: 'The joined list of the mimicked matched text.',
            handler: handlerKWMultiMimic,
        }
    );
}
